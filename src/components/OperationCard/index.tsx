import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { Operation } from '../../models'

type IProps = {
    operation: Operation,
    customTestCard?: boolean,
    height: number
}

const OperationCard = ({ operation, customTestCard = false, height }: IProps) => {

    // Variables
    const [selected, setSelected] = useState<boolean>(false)

    return (
        <Stack sx={{ width: '100%', height: '100%' }}>
            <img 
                src={require(`../../assets/images/${operation}.webp`)} 
                style={{ width: '100%', height, borderRadius: 20, objectFit: 'cover' }}  
            />
        </Stack>
    )
}

export default OperationCard