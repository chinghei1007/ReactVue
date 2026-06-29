import React, { useState } from "react";
import "./tooltip.css";

type TooltipProps = {
    label: string;
    children: React.ReactNode;
    tooltipUp?: boolean;
    tooltipLeft?: boolean;
    tooltipRight?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Tooltip({
    label,
    children,
    tooltipUp,
    tooltipLeft,
    tooltipRight,
}: TooltipProps) {
    const [visible, setVisible] = useState(false);

    // Decide position class
    let positionClass = "tooltip-bottom"; // default
    if (tooltipUp) positionClass = "tooltip-top";
    if (tooltipLeft) positionClass = "tooltip-left";
    if (tooltipRight) positionClass = "tooltip-right";

    return (
        <div
            className="tooltip-wrapper"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <span className="tooltip-label">{label}</span>
            {visible && (
                <div className={`tooltip-box ${positionClass}`}>
                    {children}
                </div>
            )}
        </div>
    );
}
