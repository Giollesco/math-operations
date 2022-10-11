// Components
import { Stack, Typography } from '@mui/material'
import Lesson from '../../components/Lesson'
import PageTitle from '../../components/PageTitle'
import { useIsMobile, useIsTablet } from '../../hooks/useDevice'
import { useAddition } from '../../hooks/useOperations'
import { Difficulties, Operations } from '../../models'

type IProps = {}

const Addition = (props: IProps) => {

    // Hooks
    const isMobile = useIsMobile()

    return (
        <Stack spacing={2}>
            {/* Page title */}
            <PageTitle title="Zbrajanja" />

            {/* Description */}
            <Typography variant="body2" sx={{ lineHeight: 2, maxWidth: 900, opacity: .75, fontSize: isMobile ? 12 : 14 }}>
                Zbrajanje je osnovna računska operacija, kojom se, kad dvije ili više veličina (brojeva) skupe zajedno, 
                dobiva informacija koliko ih sveukupno ima. 
                { !isMobile &&
                    "Zbrajati se mogu jabuke, kruške, ovčice u snu ili ljudi na plaži (prirodni brojevi)."
                }
            </Typography>

            {/* Spacing */}
            <div style={{ height: 2 }} />

            {/* Lesson component */}
            <Lesson 
                operation={Operations.Addition} 
            />
        </Stack>
    )
}

export default Addition