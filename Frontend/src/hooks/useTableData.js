// Frontend/src/hooks/useTableData.js

import { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { fetchTableData } from '../api/dataService';

export const useTableData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    
    // Define Columns based on JSONPlaceholder data structure
    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'ID', size: 50, },
        { accessorKey: 'email', header: 'Email', },
        { accessorKey: 'name', header: 'Name', },
        { accessorKey: 'body', header: 'Comment Body', },
    ], []);

    // Fetch Data on Mount
    useEffect(() => {
        fetchTableData()
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Initialize the TanStack Table instance
    const table = useReactTable({
        data, columns,
        state: { sorting, globalFilter, },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), 
        getSortedRowModel: getSortedRowModel(),         
        getFilteredRowModel: getFilteredRowModel(),     
        initialState: { pagination: { pageSize: 10 } }
    });

    return { 
        table, 
        loading, 
        globalFilter, 
        setGlobalFilter 
    };
};