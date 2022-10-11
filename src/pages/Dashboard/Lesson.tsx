import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Operation } from '../../models'
import { getOperationName } from '../../helpers'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { useIsMobile, useIsTablet } from '../../hooks/useDevice'

type IProps = {
    operation: Operation
}

const Lesson = ({ operation }: IProps) => {

    // Hooks
    const isTablet = useIsTablet()
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    // Methods
    function handleNavigate(){
        navigate(`/${operation.toLowerCase()}`)
    }

    return (
        <motion.div 
            whileHover={{ scale: .98 }}
            whileTap={{ scale: .965 }}
            onClick={handleNavigate}
            style={{ 
                position: "relative", 
                width: isMobile ? "90vw" : isTablet ? "50vw" : "25%", 
                minWidth: isMobile ? "90vw" : isTablet ? "50vw" : "max-content",
                display: "flex", 
                flexDirection: "column", 
                cursor: "pointer",
                scrollSnapAlign: "start"
            }}
        >
            <img 
                src={require(`../../assets/images/${operation.toLowerCase()}.webp`)} 
                style={{ width: '100%', height: isTablet ? 200 : 160, borderRadius: 12, objectFit: 'cover', marginBottom: 4 }} 
            />
           <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight="500" sx={{ opacity: .85 }}>{ getOperationName(operation) }</Typography>
            <Typography variant="caption" color="primary" fontWeight="500">Više</Typography>
           </Stack>
        </motion.div>
    )
}

export default Lesson