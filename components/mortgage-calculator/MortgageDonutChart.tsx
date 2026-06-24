// components/MortgageDonutChart.tsx
"use client"

import React, { useEffect, useRef } from "react";

interface Props {
    principal: number;
    totalInterest: number;
    monthlyPayment: string;
    primaryColor?: string;
}

const SEGMENTS = [
    { key: "principal", label: "Principal", color: "#1e3a5f" },
    { key: "interest", label: "Interest", color: "#3b82f6" },
];

export default function MortgageDonutChart({
    principal,
    totalInterest,
    monthlyPayment,
    primaryColor = "#1e3a5f",
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const total = principal + totalInterest;

    const segments = [
        { ...SEGMENTS[0], value: principal, pct: principal / total },
        { ...SEGMENTS[1], value: totalInterest, pct: totalInterest / total },
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || total <= 0) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const size = 350;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.scale(dpr, dpr);

        const cx = size / 2;
        const cy = size / 2;
        const outerR = size * 0.43;
        const innerR = size * 0.28;
        const gap = 0.018; // radians gap between segments

        ctx.clearRect(0, 0, size, size);

        let startAngle = -Math.PI / 2;

        for (const seg of segments) {
            const sweep = seg.pct * 2 * Math.PI - gap;
            ctx.beginPath();
            ctx.moveTo(
                cx + innerR * Math.cos(startAngle + gap / 2),
                cy + innerR * Math.sin(startAngle + gap / 2)
            );
            ctx.arc(cx, cy, outerR, startAngle + gap / 2, startAngle + sweep + gap / 2);
            ctx.arc(cx, cy, innerR, startAngle + sweep + gap / 2, startAngle + gap / 2, true);
            ctx.closePath();
            ctx.fillStyle = seg.color;
            ctx.fill();
            startAngle += seg.pct * 2 * Math.PI;
        }
    }, [principal, totalInterest]);

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: 350, height: 350 }}>
                <canvas ref={canvasRef} />

                {/* center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Monthly</span>
                    <span className="text-xl font-bold text-gray-800 leading-tight mt-0.5">
                        {monthlyPayment}
                    </span>
                    {/* <span className="text-xs text-gray-400">/ month</span> */}
                </div>
            </div>

            {/* legend */}
            <div className="flex gap-5 mt-3">
                {segments.map((seg) => (
                    <div key={seg.key} className="flex items-center gap-1.5">
                        <span
                            className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
                            style={{ background: seg.color }}
                        />
                        <span className="text-xs text-gray-500">{seg.label}</span>
                        <span className="text-xs font-semibold text-gray-700">
                            {(seg.pct * 100).toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}