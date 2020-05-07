import { useState, useEffect } from "react";

const useMousePosition = () => {
    // console.log(`add event (${position.X},${position.Y})`);
    const [position, setPosition] = useState({ X: 0, Y: 0 });
    useEffect(() => {
        console.log(`add effect (${position.X},${position.Y})`);
        const updateMouse = (e: MouseEvent) => {
            setPosition({
                X: e.clientX,
                Y: e.clientY,
            });
        };
        document.addEventListener("mousemove", updateMouse);
        return () => {
            console.log(`remove effect (${position.X},${position.Y})`);
            document.removeEventListener("mousemove", updateMouse);
        }
    }, []);
    // console.log(`before render (${position.X},${position.Y})`);
    return position;
};

export default useMousePosition;
