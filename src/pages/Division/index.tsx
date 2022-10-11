// Components
import { Stack, Typography } from '@mui/material'
import Lesson from '../../components/Lesson'
import PageTitle from '../../components/PageTitle'
import { useIsMobile } from '../../hooks/useDevice'
import { Operations } from '../../models'

type IProps = {}

const Division = (props: IProps) => {

    // Hooks
    const isMobile = useIsMobile()

    return (
        <Stack spacing={2}>
            {/* Page title */}
            <PageTitle title="Dijeljenja" />

            {/* Description */}
            <Typography variant="body2" sx={{ lineHeight: 2, maxWidth: 920, opacity: .75, fontSize: isMobile ? 12 : 14 }}>
                U matematici, posebice osnovnoj aritmetici, dijeljenje(÷) je aritmetska operacija.
                Dijeljenje cijelih brojeva nije zatvoreno. 
                { !isMobile && `Razlika brojeva neće biti cijeli broj ako 
                djeljenik nije višekratnik djelitelja; na primjer 26 se ne može podijeliti s 10 i dati cijeli broj kao količnik.` }
            </Typography>

            {/* Spacing */}
            <div style={{ height: 2 }} />

            {/* Lesson component */}
            <Lesson 
                operation={Operations.Division} 
            />
        </Stack>
    )
}

export default Division