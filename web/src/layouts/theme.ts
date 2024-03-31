import { createTheme } from '@mui/material/styles';

export const globalTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export const globalStyles = {
  linkText: `underline text-blue-500`,
} as const;
