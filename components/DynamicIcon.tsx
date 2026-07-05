// components/DynamicIcon.tsx
'use client';

import { Icon } from '@iconify/react';

interface DynamicIconProps {
    icon?: string | null;
    size?: number;
    color?: string;
    className?: string;
}

export default function DynamicIcon({ icon, size = 20, color, className }: DynamicIconProps) {
    if (!icon) return null;
    return <Icon icon={icon} width={size} height={size} color={color} className={className} />;
}