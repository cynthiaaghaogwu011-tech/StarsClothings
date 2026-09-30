const express = require("express");
const router = express.Router(); //Creates router object specifically for contact-related routes.
const protectAdmin = require('../middleware/authMiddleware.js');
const { contactValidationRules, handleValidationErrors } = require("../middleware/validateContact.js");
const {
    submitContact,
    getContacts,
    deleteContact,
    updateContact,
    sendReply
} = require("../controllers/contactController.js");

router.post("/", contactValidationRules, handleValidationErrors, submitContact);  //When a post req comes to /( a path inside this router), hand it over to submitContact.
router.post("/reply", protectAdmin, sendReply);
router.get("/", protectAdmin, getContacts);  
router.put("/:id", protectAdmin, updateContact);
router.delete("/:id", protectAdmin, deleteContact);

module.exports = router; 