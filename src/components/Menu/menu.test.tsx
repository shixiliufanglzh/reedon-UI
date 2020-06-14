import React from 'react';
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';


const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const verProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
    // onSelect: jest.fn(),
    // className: 'test',
}

const genMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
          <MenuItem index={0}>link 1</MenuItem>
          <MenuItem index={1} disabled>link 2</MenuItem>
          <MenuItem index={2}>link 3</MenuItem>
        </Menu>
    )
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test menu and menuItem', () => {
    beforeEach(() => {
        wrapper = render(genMenu(testProps));
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('link 1');
        disabledElement = wrapper.getByText('link 2');
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('reedon-menu test');
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('link 3');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith(2);
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenNthCalledWith(1);
    })

    it('should render vertical mode when mode is set as vertical', () => {
        cleanup()
        wrapper = render(genMenu(verProps));
        menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    })
})