const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Создать пользователя
exports.createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (req.body.password) {
            user.password = req.body.password;
            await user.save();
            res.json({ message: 'Password changed successfully' });
        } else {
            res.status(400).json({ message: 'Unknown password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin', 'premium user'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { role: role },
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User Not Found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};