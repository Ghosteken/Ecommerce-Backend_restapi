const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const adminController = require('../Controllers/adminControllers');



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


module.exports = router;
