'use client';

import { useEffect } from 'react';
import { componentRegistry, type ComponentBlock } from './registry';
import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';
import { useDispatch } from 'react-redux';

export default function PageRenderer({ data }: { data: { sections: ComponentBlock[] } }) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(hidePageLoader());
    }, []);

    return (
        <>
            {data.sections.map((block, index) => {
                const Component = componentRegistry[block.type];
                if (!Component) {
                    console.warn(`Component "${block.type}" not found in registry`);
                    return null;
                }

                // Type-safe spread: TypeScript now narrows the props correctly
                return <Component key={index} {...(block.props as any)} is_theme={false} raw_data={block.props} />;
            })}
        </>
    );
}