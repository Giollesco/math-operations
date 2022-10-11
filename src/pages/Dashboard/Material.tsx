import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Operation } from '../../models'
import { getOperationName } from '../../helpers'
import { motion } from 'framer-motion'
import { blue } from '@mui/material/colors'
import { useIsTablet } from '../../hooks/useDevice'

type IProps = {
    operation: Operation
}

type Links = {
    [operation in Operation]: string
}

const LINKS: Links = {
    Addition: "https://hr.wikipedia.org/wiki/Zbrajanje",
    Subtraction: "https://hr.wikipedia.org/wiki/Oduzimanje",
    Multiplication: "https://hr.wikipedia.org/wiki/Mno%C5%BEenje",
    Division: "https://hr.wikipedia.org/wiki/Dijeljenje"
}

const Material = ({ operation }: IProps) => {

    // Hooks
    const isTablet = useIsTablet()

    return (
        <motion.div 
            whileTap={{ scale: .98 }}
            style={{ position: "relative", width: isTablet ? "100%" : "50%", marginBottom: 28, display: "flex", flexDirection: "row" }}
        >
            <img 
                src={require(`../../assets/images/${operation.toLowerCase()}.webp`)} 
                style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover', marginRight: 12 }} 
            />
           <Stack direction="column">
            <Typography variant="subtitle1" fontWeight="500" sx={{ opacity: .85, mb: -.5, mt: -.5 }}>{ getOperationName(operation) }</Typography>
            <Typography variant="caption" fontWeight="400" fontSize={12}>
                <a href={LINKS[operation]} target="_blank" style={{ cursor: "pointer", color: blue[400] }}>{ LINKS[operation] }</a>
            </Typography>
           </Stack>
        </motion.div>
    )
}

export default Material