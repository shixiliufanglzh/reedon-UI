import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonType, ButtonSize } from './button';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('est Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Hello</Button>);
        // const el = wrapper.queryByText('Hello');
        const el = wrapper.getByText('Hello') as HTMLButtonElement;
        expect(el).toBeInTheDocument();
        expect(el.tagName).toEqual('BUTTON');
        expect(el).toHaveClass('btn btn-default');
        expect(el.disabled).toBeFalsy();
        fireEvent.click(el);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Hello</Button>);
        const el = wrapper.getByText('Hello');
        expect(el).toBeInTheDocument();
        expect(el).toHaveClass('btn-lg btn-primary klass');
    })

    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://reedli.com">link</Button>);
        const el = wrapper.getByText('link');
        expect(el).toBeInTheDocument();
        expect(el.tagName).toEqual('A');
        expect(el).toHaveClass('btn btn-link');
    })

    it('should render disabled button when prop disabled is set to true', () => {
        const wrapper = render(<Button {...disabledProps}>disabled</Button>);
        const el = wrapper.getByText('disabled') as HTMLButtonElement;
        expect(el).toBeInTheDocument();
        expect(el.disabled).toBeTruthy();
        fireEvent.click(el);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})