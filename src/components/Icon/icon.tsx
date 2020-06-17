import React, {useState, createContext} from 'react';
import ClassNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
    // icon-primary
    const {className, theme, ...restProps} = props;
    const classes = ClassNames('reedon-icon', className, {
        [`icon-${theme}`]: theme,
    })

    return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon;