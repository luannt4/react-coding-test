import "../styles/globals.css";
// 1. import `ChakraProvider` component
import { ColorModeProvider, ChakraProvider } from '@chakra-ui/react';

import theme from "../lib/theme";

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
                <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default MyApp;
