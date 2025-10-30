// Backend/src/models/formModel.js

const db = require('../config/firebase');

/**
 * Retrieves the dynamic form schema from a specific Firestore document.
 */
exports.getFormSchema = async (schemaId) => {
    try {
        const docRef = db.collection('formSchemas').doc(schemaId);
        const doc = await docRef.get();

        if (!doc.exists) {
            console.log(`No form schema found for ID: ${schemaId}`);
            return null;
        }

        console.log(`Successfully fetched form schema: ${schemaId}`);
        return doc.data().schema; // Returns the 'schema' map field
    } catch (error) {
        console.error('Error fetching form schema:', error);
        throw new Error('Database error when fetching schema.');
    }
};