// app/[[...unmatched]]/page.tsx
'use client';

import { useEffect, useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';

export default function NotFound() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Hide loader immediately when 404 page loads
        dispatch(hidePageLoader());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
            <a href="/home" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >
                Go Back Home
            </a>
        </div>
    );
}