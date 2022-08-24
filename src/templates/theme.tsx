import React from "react";

import { ThemeProvider } from "styled-components";

import theme from '../styles';

type Props = {
    children: React.ReactNode;
    //children?: JSX.Element | JSX.Element[];
}

export function Theme({ children }: Props) {
    return <ThemeProvider theme={theme.dark}> {children} </ThemeProvider>
}