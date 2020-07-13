import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import Button from "./button";
// import '../../styles/index.scss';

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
)
storiesOf('Button Component', module)
    .add('default button', defaultButton)