import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom';

// export interface TransitionProps extends CSSTransitionProps {
//     // trigger: boolean;
//     // timeout: number;
//     // className: string;
//     animation?: AnimationName
// }

type TransitionProps = {
    animation?: AnimationName,
    wrapper?: boolean
} & CSSTransitionProps

const Transition: React.FC<TransitionProps> = (props) => {
    const { className, children, animation, wrapper, ...restProps } = props;

    return (
        <CSSTransition
            classNames={className ? className : animation}
            {...restProps}
        >
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    );
};

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}

export default Transition
