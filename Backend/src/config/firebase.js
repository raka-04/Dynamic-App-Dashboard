// Backend/src/config/firebase.js

const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// IMPORTANT: This path must correctly locate your downloaded key
const serviceAccountPath = path.resolve(__dirname, '../../', process.env.SERVICE_ACCOUNT_KEY_PATH);
const serviceAccount = require(serviceAccountPath); 

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL // Used for initialization
});

// Create and export the Firestore database instance
const db = admin.firestore();

// 🟢 NEW CONSOLE LOG HERE 🟢
console.log('✅ Firebase Admin SDK Initialized. Firestore instance available.'); 

module.exports = db;