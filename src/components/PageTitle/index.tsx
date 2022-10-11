import { Box, Stack, Typography } from '@mui/material'
import { IconPlus } from '@tabler/icons'
import React from 'react'
import { useIsMobile } from '../../hooks/useDevice'

type IProps = {
    title: string
}

const PageTitle = ({ title = "" }: IProps) => {

    // Hooks
    const isMobile = useIsMobile()
    
    return (
        <Stack spacing={1} direction={isMobile ? "row" : "column"} alignItems={isMobile ? "center" : "flex-start"}>
            <Box 
                sx={{ 
                    width: 40, height: 40, 
                    display: 'grid', placeItems: "center", 
                    borderRadius: 40, border: "1px solid #ddd" 
                }}
            >
                📙
            </Box>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600, opacity: .85 }}>
                Lekcija { !isMobile && <br/> }{ title } 
            </Typography>
        </Stack>
    )
}

export default PageTitle