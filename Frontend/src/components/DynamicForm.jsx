// Frontend/src/components/DynamicForm.jsx

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchFormSchema } from '../api/dataService';
import DynamicField from './DynamicField';

const DynamicForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm();
    const [schema, setSchema] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submittedData, setSubmittedData] = useState(null);

    // Fetch Form Schema from Backend (Bonus Feature)
    useEffect(() => {
        fetchFormSchema()
            .then(data => {
                setSchema(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Handle Form Submission
    const onSubmit = (data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Form Submitted Data:', data);
                setSubmittedData(data);
                resolve(); 
            }, 1000);
        });
    };

    if (loading) return <div className="text-center p-8">Loading form schema from backend...</div>;
    if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;
    if (!schema || schema.length === 0) return <div className="text-center p-8 text-gray-500">No form fields defined in the backend.</div>;

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Dynamic Form Builder</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Render Fields Dynamically */}
                {schema.map(field => (
                    <DynamicField
                        key={field.id}
                        field={field}
                        register={register}
                        errors={errors}
                    />
                ))}
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Dynamic Form'}
                </button>
            </form>
            
            {/* Display submitted data */}
            {isSubmitSuccessful && submittedData && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="font-semibold text-green-700">Submission Successful!</p>
                    <pre className="text-xs mt-2 bg-white p-2 rounded overflow-auto">
                        {JSON.stringify(submittedData, null, 2)}
                    </pre>
                    <button 
                        onClick={() => reset()} 
                        className="mt-2 text-blue-600 text-sm hover:underline"
                    >
                        Reset Form
                    </button>
                </div>
            )}
        </div>
    );
};

export default DynamicForm;