// Components
import { Stack, Typography } from '@mui/material'
import Lesson from '../../components/Lesson'
import PageTitle from '../../components/PageTitle'
import { useIsMobile } from '../../hooks/useDevice'
import { Operations } from '../../models'

type IProps = {}

const Subtraction = (props: IProps) => {

    // Hooks
    const isMobile = useIsMobile()

    return (
        <Stack spacing={2}>
            {/* Page title */}
            <PageTitle title="Oduzimanja" />

            {/* Description */}
            <Typography variant="body2" sx={{ lineHeight: 2, maxWidth: 900, opacity: .75, fontSize: isMobile ? 12 : 14 }}>
                { !isMobile && "Oduzimanje je jedna od četiri osnovnih aritmetičkih operacija." } Oduzimanje je suprotno od zbrajanja, 
                što znači ako broju, recimo x, dodamo y i od dobivenog broja oduzmemo y ponovno ćemo dobiti x. 
            </Typography>

            {/* Spacing */}
            <div style={{ height: 2 }} />

            {/* Lesson component */}
            <Lesson 
                operation={Operations.Subtraction} 
            />
        </Stack>
    )
}

export default Subtraction