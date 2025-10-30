// Backend/src/routes/formRoutes.js

const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Define the API route for getting the form schema
// Endpoint: GET /api/form-schema
router.get('/form-schema', formController.fetchFormSchema);

module.exports = router;