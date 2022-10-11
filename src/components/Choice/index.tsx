import { Stack, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useIsMobile } from '../../hooks/useDevice'

interface IChoice{
  selected: boolean
  choice: number, 
  sign?: string, 
  hideSign?: boolean,
  onClick: (choice: number) => void
}

export default function Choice({ selected, choice, sign, hideSign = false, onClick}: IChoice){

  // Hooks
  const isMobile = useIsMobile()

  return(
    <Stack 
      direction="row" 
      alignItems="center" 
      spacing={2} 
      onClick={() => onClick(choice)}
    >
      {
        !hideSign &&
          <Typography 
            sx={{ fontSize: 20, fontWeight: 500, opacity: .5 }}
          >
            { `${sign}) ` }
          </Typography>
      }

      <motion.div
        whileHover={{ backgroundColor: selected ? blue[200] : grey[300] }}
        whileTap={{ backgroundColor: selected ? blue[300] : grey[400], scale: .95 }}
        animate={{ backgroundColor: selected ? blue[100] : grey[200],  }}
        style={{ 
          cursor: isMobile ? 'none' : 'pointer',
          borderRadius: 24, width: isMobile ? 60 : 100, height: isMobile ? 60 : 84, 
          fontSize: isMobile ? 18 : 20, fontWeight: 500, 
          display: 'grid', placeItems: 'center'
        }}
      >
        { choice }
      </motion.div>
    </Stack>
  )
}