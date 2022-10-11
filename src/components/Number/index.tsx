import { Stack } from '@mui/material'
import { green } from '@mui/material/colors'
import { useIsMobile } from '../../hooks/useDevice'

export default function Number({number, color}: { number: number, color: string }){

  // Hooks
  const isMobile = useIsMobile()

  return(
    <Stack 
      direction="column" 
      sx={{ 
        bgcolor: color, color: "white", 
        borderRadius: 6, 
        fontSize: isMobile ? 18 : 24, fontWeight: 500, 
        width: isMobile ? 60 : 100, height: isMobile ? 60 : 84,
        display: 'grid', placeItems: 'center'
      }}
    >
      { number }
    </Stack>
  )
}