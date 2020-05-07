import React, { useState, useEffect } from "react";

const MouseTracker: React.FC = () => {
    // console.log(`add event (${position.X},${position.Y})`);
    const [position, setPosition] = useState({ X: 0, Y: 0 });
    useEffect(() => {
        console.log(`add effect (${position.X},${position.Y})`);
        const updateMouse = (e: MouseEvent) => {
            console.log("inner");
            setPosition({
                X: e.clientX,
                Y: e.clientY,
            });
        };
        document.addEventListener("click", updateMouse);
        return () => {
            console.log(`remove effect (${position.X},${position.Y})`);
            document.removeEventListener("click", updateMouse);
        }
    }, []);
    console.log(`before render (${position.X},${position.Y})`);
    return (
        <p>
            X:{position.X}, Y:{position.Y}
        </p>
    );
};

export default MouseTracker;
