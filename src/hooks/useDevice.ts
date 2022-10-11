import { useTheme, useMediaQuery, Breakpoint } from '@mui/material';

export function useDevice(breakpoint: Breakpoint): boolean {

  // Variables
  const theme = useTheme();
  const device = useMediaQuery(theme.breakpoints.down(breakpoint));

  return device;
}

export function useIsMobile(): boolean {

  // Variables
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile;
}

export function useIsTablet(): boolean {

  // Variables
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return isTablet;

}

export function useIsLaptop(): boolean {

  // Variables
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  return isLaptop;

}