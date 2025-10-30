// Backend/src/controllers/formController.js

const formModel = require('../models/formModel');

/**
 * API handler to fetch the dynamic form schema.
 */
exports.fetchFormSchema = async (req, res) => {
    // Hardcoded schema ID for demonstration. Must match the Document ID in Firestore.
    const schemaId = 'mainForm'; 

    try {
        const schema = await formModel.getFormSchema(schemaId);
        
        if (!schema) {
            return res.status(404).json({ message: 'Form schema not found.' });
        }

        res.status(200).json(schema);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', detail: error.message });
    }
};