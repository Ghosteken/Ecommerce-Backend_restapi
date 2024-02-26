const Admin = require('../models/Admin');

const adminController = {
    registerAdmin: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const newAdmin = new Admin({ name, email, password });
            const savedAdmin = await newAdmin.save();
            res.status(201).json(savedAdmin);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateAdmin: async (req, res) => {
        try {
            const { adminId } = req.params;
            const updatedAdmin = await Admin.findByIdAndUpdate(adminId, req.body, { new: true });
            res.status(200).json(updatedAdmin);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllAdmins: async (req, res) => {
        try {
            const admins = await Admin.find();
            res.status(200).json(admins);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAdminById: async (req, res) => {
        try {
            const { adminId } = req.params;
            const admin = await Admin.findById(adminId);
            res.status(200).json(admin);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = adminController;
