const { User, Appointment, Agent, Property, Review } = require ('../models')

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  //update user by id
  exports.updateUser = async (req, res) => {
    try{
        const [updated] = await User.update(req.body, {
            where : {id: req.params.id}
        });
        if (!updated) return res.status(404).json({message: "user not found"});
        res.json({message: "User updated successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
    };

  //delete user by id
  exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };

  //Get user by id methodd 
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if(!user) return res.status(404).json({message: "User not found"});
      res.json(user);
    } catch (err){
      res.status(500).json({error: err.message});
    }
  };





