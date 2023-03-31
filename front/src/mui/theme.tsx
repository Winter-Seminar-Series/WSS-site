import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#052848',
      dark: '#01003A',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
