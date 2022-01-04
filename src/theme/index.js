import { extendTheme } from '@chakra-ui/react';

const Divider = {
  // Styles for the base style
  baseStyle: {
    m: 'auto',
    width: '90%',
    bgColor: '#D2D3D7',
    borderBottomWidth: '0',
    border: 'none',
  },
  // Styles for the size variations
  sizes: {
    md: {
      width: '90%',
      height: '2px',
    },
  },
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {
    size: 'md',
  },
};

const theme = extendTheme({
  colors: {
    brand: {
      50: '#ffe3e3',
      100: '#ffb4b4',
      200: '#fb8484',
      300: '#f85353',
      400: '#f72523',
      500: '#dd100a',
      600: '#ac0907',
      700: '#7b0404',
      800: '#4b0000',
      900: '#1f0000',
    },
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Quicksand',
  },
  components: {
    Divider,
  },
});

export default theme;
