import React from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import { useIsMobile } from '../../hooks/useDevice'

type IProps = {}

const Banner = (props: IProps) => {

    // Variables
    const isMobile = useIsMobile()

    return (
        <Stack sx={{ postiion: 'relative'}}>
            <div 
                style={{ 
                    width: '100%', height: '240px',
                        position: 'relative', overflow: 'hidden', 
                        borderRadius: 16, backgroundColor: "#5465f5"
                }}
            >
                <img 
                    src={require('../../assets/images/banner.png')} 
                    style={{ 
                        width: '60%', height: '240px', 
                        objectFit: 'cover', right: isMobile ? -100 : 0,
                        borderRadius: 16, position: 'absolute',
                        userSelect: 'none'
                    }} 
                />
                <Stack 
                    spacing={2}
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="flex-end"
                    sx={{ 
                        position: "absolute", 
                        width: "max-content", height: "240px", 
                        overflow: "hidden", p: isMobile ? 2 : 4,
                        bottom: 0, left: 0
                    }}
                >
                    {/* Title */}
                    <Typography variant={isMobile ? "h6": "h5"} color="white" fontWeight="600" sx={{ lineHeight: isMobile ? 1.25 : 1.5, }}>
                        📝<br/>Osnove <br/> matematičkih operacija
                    </Typography>
                    {/* Chips */}
                    <Stack direction="row" spacing={2}>
                        <Chip 
                            label="4 operacije"
                            sx={{ 
                                backgroundColor: "#ffffff80", backdropFilter: "blur(4px)", 
                                px: 3, py: 1.5, fontWeight: 600
                            }}
                        />
                        <Chip 
                            label="3 razine"
                            sx={{ 
                                backgroundColor: "#ffffff80", backdropFilter: "blur(4px)", 
                                px: 3, py: 1.5, fontWeight: 600
                            }}
                        />
                    </Stack>
                </Stack>
            </div>
        </Stack>
    )
}

export default Banner