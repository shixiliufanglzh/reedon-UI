import React from "react";
import useMousePosition from "../hooks/useMousePosition";

interface IHelloMsg {
    message?: string;
}

const Hello: React.FC<IHelloMsg> = (props) => {
    const position = useMousePosition();
    return (
        <h2>
            {props.message} - {position.X}, {position.Y}
        </h2>
    );
};

Hello.defaultProps = {
    message: "hello who ?",
};

export default Hello;
