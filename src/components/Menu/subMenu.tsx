import React, { useContext } from 'react';
import ClassNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
    index?: number,
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, className, children}) => {

    const context = useContext(MenuContext);
    const classes = ClassNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                return childElement;
            } else {
                console.error('warning: SubMenu has a child which is not a MenuItem component.')
            }
        })
        return (
            <ul className="reedon-submenu">
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li key={index} className={classes}>
            <div className="submenu-title">
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName =  'SubMenu';

export default SubMenu;