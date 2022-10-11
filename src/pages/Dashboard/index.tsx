import React from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Banner from './Banner'
import { OPERATIONS } from '../../constants'
import Lesson from './Lesson'
import Material from './Material'
import { useIsMobile, useIsTablet } from '../../hooks/useDevice'

type IProps = {}

const Dashboard = (props: IProps) => {

    // Hooks
    const isMobile = useIsMobile()

    return (
        <Stack>
            <Grid container spacing={{ xs: 3, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid xs={12} sx={{  mb: isMobile ? 3 : 0 }}>
                    <Banner />
                </Grid>
                <Grid xs={12} sx={{ width: '100vw', mb: isMobile ? 3 : 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, opacity: .85, mb: 1 }}>Lekcije</Typography>
                    <div
                        id="dashboard-scroll"
                        style={{ 
                            maxWidth: "100%", 
                            width: "100%", 
                            overflowX: "auto",
                            scrollSnapType: "x mandatory",
                        }}
                    >
                        <Stack 
                            direction="row" 
                            alignItems="flex-start" 
                            justifyContent="space-between" 
                            spacing={4} 
                        >
                            { OPERATIONS.map((operation, index) => (
                                <Lesson key={index} operation={operation} />
                            ))}
                        </Stack>
                    </div>
                </Grid>
                <Grid xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, opacity: .85, mb: 2 }}>Dodatni materijali</Typography>
                    <Stack direction="row" flexWrap="wrap">
                        { OPERATIONS.map((operation, index) => (
                            <Material key={index} operation={operation} />
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Dashboard