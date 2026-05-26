'use client';

import { componentRegistry, type ComponentBlock } from './registry';

export default function PageRenderer({ data }: { data: { sections: ComponentBlock[] } }) {

    // If no sections, render NoComponents
    if (!data.sections || data.sections.length === 0) {
        const NoComponents = componentRegistry['NoComponents'];

        if (NoComponents) {
            return <NoComponents is_theme={true} raw_data={{}} />;
        }

        // Fallback if NoComponents is not registered
        return <div>No content available</div>;
    }

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