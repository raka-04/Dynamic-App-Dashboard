// Frontend/src/api/dataService.js

import axios from 'axios';

// Must match your Node.js backend port
const API_BASE_URL = 'http://localhost:5000/api'; 
const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/comments';

/**
 * Fetches the dynamic form schema from your Node.js backend.
 */
export const fetchFormSchema = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/form-schema`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dynamic form schema:', error);
        throw new Error('Could not load form definition from backend.');
    }
};

/**
 * Fetches the large dataset for the Data Grid.
 */
export const fetchTableData = async () => {
    try {
        const response = await axios.get(JSONPLACEHOLDER_URL); 
        return response.data;
    } catch (error) {
        console.error('Error fetching table data:', error);
        throw new Error('Could not load data grid records.');
    }
};