const { User, Buyer, Agent, Admin } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

 const registerUser = async (req, res) => {
    let { username, email, password, role } = req.body;
    role = role.charAt(0).toLowerCase() + role.slice(1);

    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username },{ email }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        if (role === 'buyer') {
        await Buyer.create({ userId: newUser.id });
        } else if (role === 'agent') {
        await Agent.create({ userId: newUser.id });
        } else if (role === 'admin') {
        await Admin.create({ userId: newUser.id });
        }

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { id: user.id, email: user.email, username: user.username, role: user.role };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const refreshAccessToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'Refresh token missing' });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role
    }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.json({ token: newAccessToken });
  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/'
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Failed to log out' });
  }
};




module.exports = {
    registerUser,
    login,
    refreshAccessToken,
    logout
}