import { createTheme } from '@mui/material/styles';

export const COLOR_PRIMARY = '#052848';
export const COLOR_PRIMARY_DARK = '#01003A';

export const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
      dark: COLOR_PRIMARY_DARK,
    },
  },
});
