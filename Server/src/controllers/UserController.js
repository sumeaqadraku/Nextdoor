const{ User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };

  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if(!user) return res.status(404).json({message: "User not found"});
      res.json(user);
    } catch (err){
      res.status(500).json({error: err.message});
    }
  };

  exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'role', 'avatarUrl', 'phoneNumber'],
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  exports.editProfile = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const { username, email, phoneNumber} = req.body;
      avatar = req.file ? req.file.path : user.avatar;

      if (!username && !email && !avatar) {
        return res.status(400).json({ message: "No fields to update" });
      }

      user.username = username || user.username;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.avatarUrl = avatar || user.avatarUrl;

      await user.save();

      res.json({ message: "Profile updated successfully", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  







