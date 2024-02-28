const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const adminController = require('../Controllers/adminControllers');
const retailerController = require('../Controllers/retailerController');



router.post("/api/customers", userController.registerUser);

router.delete("/api/customers/:customerId", userController.deleteUser);

router.put("/api/customers/:customerId", userController.updateUser);

router.get("/api/customers", userController.getAllUsers);

router.get("/api/customers/:customerId", userController.getUserById);

//////////////////Admin///////////////////////

router.post("/api/admins", adminController.registerAdmin);

router.put("/api/admins/:adminId", adminController.updateAdmin);

router.get("/api/admins", adminController.getAllAdmins);

router.get("/api/admins/:adminId", adminController.getAdminById);

/////////////////////Retailer/////////////////

router.post("/api/retailers", retailerController.registerRetailer);

router.put("/api/retailers/:retailerId", retailerController.updateRetailer);

router.get("/api/retailers", retailerController.getAllRetailers);

router.get("/api/retailers/:retailerId", retailerController.getRetailerById);

router.delete("/api/retailers/:retailerId", retailerController.deleteRetailer);


module.exports = router;
