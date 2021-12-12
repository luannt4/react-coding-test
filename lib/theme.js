import { extendTheme, ChakraProvider } from '@chakra-ui/react';

const fonts = { mono: `'Menlo', monospace` }
const breakpoints = ['40em', '52em', '64em']
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}


const theme =  extendTheme({
  colors,
  fonts,
  breakpoints
});

export default theme
