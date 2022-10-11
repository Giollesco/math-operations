// MUI
import { createTheme } from '@mui/material'

export default function useCustomTheme(){

  const THEME = createTheme({
    palette: {
      primary: {
        light: '#3369ff',
        main: '#0044ff',
        dark: '#002fb2',
        contrastText: '#fff',
      },
      secondary:{
        main: '#DF6D73',
        light: '#FCEFF0' ,
      },
      success: {
        main: '#44b700',
        contrastText: '#fff'
      }
    },
    typography: {
      fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      body1: { fontSize: 16 },
      button:{ textTransform: 'none' }
    }
  })

  return THEME
};