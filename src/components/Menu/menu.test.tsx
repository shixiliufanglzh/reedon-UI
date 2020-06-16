import React from 'react';
import { render, fireEvent, RenderResult, cleanup, wait } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';


const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const verProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
    // onSelect: jest.fn(),
    // className: 'test',
}

const genMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
          <MenuItem>link 1</MenuItem>
          <MenuItem disabled>link 2</MenuItem>
          <MenuItem>link 3</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>drop 1</MenuItem>
            <MenuItem>drop 2</MenuItem>
          </SubMenu>
        </Menu>
    )
}
const createStyleFile = () => {
    const cssFile: string = `
        .reedon-submenu {
            display: none;
        }
        .reedon-submenu.menu-opened {
            display: block;
        }
    `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style;
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test menu and menuItem', () => {
    beforeEach(() => {
        wrapper = render(genMenu(testProps));
        wrapper.container.append(createStyleFile());
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('link 1');
        disabledElement = wrapper.getByText('link 2');
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('reedon-menu test');
        // expect(menuElement.getElementsByTagName('li').length).toEqual(6);
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('link 3');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith('2');
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
    })

    it('should render vertical mode when mode is set as vertical', () => {
        cleanup()
        wrapper = render(genMenu(verProps));
        menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    })

    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop 1')).not.toBeVisible();
        const dropdownElement = wrapper.getByText('dropdown');
        fireEvent.mouseEnter(dropdownElement);
        await wait(() => {
            expect(wrapper.queryByText('drop 1')).toBeVisible();
        })
        fireEvent.click(wrapper.getByText('drop 1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        fireEvent.mouseLeave(dropdownElement);
        await wait(() => {
            expect(wrapper.queryByText('drop 1')).not.toBeVisible();
        })
    })

    it('should show dropdown items when click on vertical subMenu', () => {
        cleanup()
        wrapper = render(genMenu(verProps));
        const dropdownElement = wrapper.getByText('dropdown');
        fireEvent.click(dropdownElement);
        expect(wrapper.queryByText('drop 1')).toBeVisible();
        fireEvent.click(wrapper.getByText('drop 1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        // fireEvent.click(dropdownElement);
        // expect(wrapper.queryByText('drop 1')).not.toBeVisible();
    })
})