const Retailer = require ('../models/Retailer.js')

const retailerController = {
    registerRetailer: async (req, res) => {
        try {
            const {
                companyName,
                companyLogo,
                contactInformation,
                storeLocations,
                contractType,
                paymentInformation,
                cleaningInformation,
                damagePolicy
            } = req.body;
            const newRetailer = new Retailer({
                companyName,
                companyLogo,
                contactInformation,
                storeLocations,
                contractType,
                paymentInformation,
                cleaningInformation,
                damagePolicy
            });
            const savedRetailer = await newRetailer.save();
            res.status(201).json(savedRetailer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    deleteRetailer: async (req, res) => {
        try {
            const { retailerId } = req.params;
            await Retailer.findByIdAndDelete(retailerId);
            res.status(200).json({ message: "Retailer deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });   
        }
    },

    updateRetailer: async (req, res) => {
        try {
            const { retailerId } = req.params;
            const updatedRetailer = await Retailer.findByIdAndUpdate(retailerId, req.body, { new: true });
            res.status(200).json(updatedRetailer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    getAllRetailers: async (req, res) => {
        try {
            const retailers = await Retailer.find();
            res.status(200).json(retailers);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    getRetailerById: async (req, res) => {
        try {
            const { retailerId } = req.params;
            const retailer = await Retailer.findById(retailerId);
            res.status(200).json(retailer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = retailerController;
