import React from 'react'
import { ArrowLeft, Menu } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useIsTablet } from '../../hooks/useDevice'
import moment from 'moment'
import 'moment/locale/hr'

type IProps = {
  drawerOpen: boolean,
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ drawerOpen, setDrawerOpen }: IProps) => {

  // Hooks
  const isTablet = useIsTablet();

  return (
    <Stack 
      direction="row" alignItems="center" 
      justifyContent={isTablet ? "space-between" : "flex-start"}
      sx={{ 
        // borderBottom: "1px solid #0000001f", 
        backgroundColor: isTablet ? "#ffffff88" : "white",
        backdropFilter: isTablet ? "blur(5px)" : "unset",
        w: "100%",
        py: 2, px: 4 
      }}
    >
      {/* Toggle drawer button - visible only on tablet or phone */}
      {
        isTablet &&
          <IconButton 
            onClick={() => setDrawerOpen(previousState => !previousState)}
            sx={{ mr: 2, ml: -2 }}
          >
          {
            drawerOpen ? 
              <ArrowLeft /> : 
              <Menu />
          }
        </IconButton>
      }
      
      {/* Page name */}
      <Typography 
        variant={isTablet ? "body2" : "subtitle1"}
        sx={{ width: "100%", textAlign: isTablet ? "right" : "left" }}
      >
        Osnove matematičkih operacija 📚
      </Typography>

      {/* Spacing */}
      <Box flex={1} />

      { !isTablet && <Typography variant="body2" sx={{ width: "100%", textAlign: "right" }}>⏰ { moment().format('LL') }</Typography> }
    </Stack>
  )
}

export default Header