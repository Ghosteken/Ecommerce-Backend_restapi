const Customer = require('../models/Customer');


const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password, photo, phone, address, cart, wishlist } = req.body;
            const newCustomer = new Customer({ name, email, password, photo, phone, address, cart, wishlist });
            const savedCustomer = await newCustomer.save();
            res.status(201).json(savedCustomer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            const { customerId } = req.params;
            await Customer.findByIdAndDelete(customerId);
            res.status(200).json({ message: "Customer deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });   
        }
    },

    updateUser: async (req, res) => {
        try {
            const { customerId } = req.params;
            const updatedCustomer = await Customer.findByIdAndUpdate(customerId, req.body, { new: true });
            res.status(200).json(updatedCustomer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    getAllUsers: async (req, res) => {
        try {
            const customers = await Customer.find();
            res.status(200).json(customers);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    getUserById: async (req, res) => {
        try {
            const { customerId } = req.params;
            const customer = await Customer.findById(customerId);
            res.status(200).json(customer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = userController;