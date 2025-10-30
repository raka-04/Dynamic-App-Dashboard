// Frontend/src/App.jsx

import React from 'react';
import DataTable from './components/DataTable';
import DynamicForm from './components/DynamicForm';
import './index.css'; 

const App = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
                Dynamic App Dashboard
            </h1>

            {/* Dynamic Form Builder Section */}
            <div className="mb-12">
                <DynamicForm />
            </div>

            <hr className="my-10 border-gray-300 max-w-5xl mx-auto" />

            {/* Data Grid Section */}
            <div className="max-w-7xl mx-auto">
                <DataTable />
            </div>
        </div>
    );
};

export default App;