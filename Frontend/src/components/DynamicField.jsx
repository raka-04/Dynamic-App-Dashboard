// Frontend/src/components/DynamicField.jsx

import React from 'react';

const DynamicField = ({ field, register, errors }) => {
    const commonProps = {
        // Use react-hook-form register for validation and state tracking
        ...register(field.id, { required: field.required && `${field.label} is required` }), 
        id: field.id,
        className: 'mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500',
        placeholder: field.placeholder,
    };

    const isError = errors[field.id];

    let inputElement;

    switch (field.type) {
        case 'text':
        case 'number':
        case 'date':
            inputElement = <input type={field.type} {...commonProps} />;
            break;
        case 'textarea':
            inputElement = <textarea rows="3" {...commonProps}></textarea>;
            break;
        case 'dropdown':
            inputElement = (
                <select {...commonProps}>
                    <option value="">-- Select {field.label} --</option>
                    {field.options && field.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input type="text" {...commonProps} />;
    }

    return (
        <div className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {inputElement}
            {isError && (
                <p className="mt-1 text-xs text-red-600">{errors[field.id]?.message}</p>
            )}
        </div>
    );
};

export default DynamicField;