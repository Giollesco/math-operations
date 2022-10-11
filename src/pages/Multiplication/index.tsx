// Components
import { Stack, Typography } from '@mui/material'
import Lesson from '../../components/Lesson'
import PageTitle from '../../components/PageTitle'
import { useIsMobile } from '../../hooks/useDevice'
import { Operations } from '../../models'

type IProps = {}

const Multiplication = (props: IProps) => {

    // Hooks
    const isMobile = useIsMobile()

    return (
        <Stack spacing={2}>
            {/* Page title */}
            <PageTitle title="Množenja" />

            {/* Description */}
            <Typography variant="body2" sx={{ lineHeight: 2, maxWidth: 900, opacity: .75, fontSize: isMobile ? 12 : 14 }}>
                Množenje cijelih brojeva je aritmetička operacija višestrukog zbrajanja broja sa samim sobom. 
                { !isMobile && "Na primjer, četiri pomnoženo s tri je dvanaest, jer kad tri puta zbrojimo 4 sa samim sobom dobijemo dvanaest " }
            </Typography>

            {/* Spacing */}
            <div style={{ height: 2 }} />

            {/* Lesson component */}
            <Lesson 
                operation={Operations.Multiplication} 
            />
        </Stack>
    )
}

export default Multiplication