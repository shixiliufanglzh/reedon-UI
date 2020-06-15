import React, { useContext, useState } from 'react';
import ClassNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
    index?: string,
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, className, children}) => {
    
    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpend);
    const classes = ClassNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        e.preventDefault();
        clearTimeout(timer);
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300)
    }

    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)},
    } : {}

    const renderChildren = () => {
        const subMenuClasses = ClassNames('reedon-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            } else {
                console.error('warning: SubMenu has a child which is not a MenuItem component.')
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName =  'SubMenu';

export default SubMenu;