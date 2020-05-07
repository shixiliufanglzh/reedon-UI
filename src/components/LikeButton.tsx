import React, { useState, useEffect } from "react";

const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0);
    useEffect(() => {
        document.title = `点击了${like}次`;
    });

    function handleAlertClick() {
        setTimeout(() => {
            alert(`clicked on ${like}!`);
        }, 3000);
    }
    return (
        <>
            <button
                onClick={() => {
                    setLike(like + 1);
                }}
            >
                {like}like
            </button>
            <button onClick={handleAlertClick}>alert</button>
        </>
    );
};

export default LikeButton;
