// app/RouteProgressHandler.tsx
'use client';

import { useEffect } from 'react';
import { useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { hidePageLoader, showPageLoader } from './GlobalRedux/app/appSlice';

export function RouteProgressHandler() {
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("isPending", isPending)
        if (isPending) {
            dispatch(showPageLoader());
        } else {
            console.log("isPending is false, now hidePageLoader")
            dispatch(hidePageLoader());
        }
    }, [isPending, dispatch]);

    return null;
}