const Admin = require('../models/Admin');

const handleControllerError = (res, error) => {
    console.error(error);
    res.status(400).json({ message: error.message });
};

const adminController = {
    registerAdmin: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const newAdmin = new Admin({ name, email, password });
            const savedAdmin = await newAdmin.save();
            res.status(201).json(savedAdmin);
        } catch (error) {
            handleControllerError(res, error);
        }
    },

    updateAdmin: async (req, res) => {
        try {
            const { adminId } = req.params;
            const updatedAdmin = await Admin.findByIdAndUpdate(adminId, req.body, { new: true });
            res.status(200).json(updatedAdmin);
        } catch (error) {
            handleControllerError(res, error);
        }
    },

    getAllAdmins: async (req, res) => {
        try {
            const admins = await Admin.find();
            res.status(200).json(admins);
        } catch (error) {
            handleControllerError(res, error);
        }
    },

    getAdminById: async (req, res) => {
        try {
            const { adminId } = req.params;
            const admin = await Admin.findById(adminId);
            res.status(200).json(admin);
        } catch (error) {
            handleControllerError(res, error);
        }
    }
};

module.exports = adminController;
