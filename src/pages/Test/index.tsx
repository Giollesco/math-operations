import { useEffect, useMemo, useState } from 'react'
import { Button, Chip, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate, useParams } from 'react-router'
import DifficultyPicker from '../../components/DifficultyPicker'
import OperationCard from '../../components/OperationCard'
import Slider from '../../components/Slider'
import { Difficulties, Difficulty, Operation, Operations, Statistic } from '../../models'
import Game from './Game'
import { capitalize, getOperationName } from '../../helpers'
import useQuestions from '../../hooks/useQuestions'
import { useLayoutCtx } from '@mui-treasury/layout'
import ResultProgress from '../../components/ResultProgress'
import { initialStatistic, OPERATIONS } from '../../constants'
import { IconRotateClockwise, IconRotateClockwise2 } from '@tabler/icons'
import { useIsMobile } from '../../hooks/useDevice'

type IProps = {}

export type TestState = "configuring" | "active" | "finished"

const Test = (props: IProps) => {

    // Restrict to only routes with operation name = existing operations
    useEffect(() => {
        if(!OPERATIONS.includes(capitalize(test_type) as Operation)){
            navigate('/dashboard')
        }
    }, [])

    // Hooks
    const isMobile = useIsMobile()
    const navigate = useNavigate()
    const location = useLocation()
    const { test_type } = useParams()
    
    // Variables
    const [statistic, setStatistic] = useState<Statistic>(initialStatistic)
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulties.Easy)
    const [testState, setTestState] = useState<TestState>("configuring")
    const [count, setCount] = useState<number>(1)
    const { setOpen } = useLayoutCtx()

    // Questions
    const { questions } = useQuestions({ 
        difficulty, 
        count,
        operation: 
            OPERATIONS.includes(capitalize(test_type) as Operation) ? 
                capitalize(test_type) as Operation : 
                Operations.Addition, // Fallback
    })
    
    // Methods
    useEffect(() => {
        // Route changed => reset test
        setDifficulty(Difficulties.Easy)
        setTestState("configuring")
        setStatistic(initialStatistic)
        setCount(1)
    }, [test_type])

    useEffect(() => {
        if(testState === "active")
            setOpen("leftEdgeSidebar", false)
        else {
            setOpen("leftEdgeSidebar", true)
            if(testState === "configuring"){
                setStatistic(initialStatistic)
            }
        }
    }, [testState])


    const GAME = useMemo(() => {
        return (
            <Game 
                count={count}
                questions={questions}
                statistic={statistic}
                setTestState={setTestState}
                setStatistic={setStatistic}
            />  
        )
    }, [count, difficulty, statistic, testState, setStatistic])

    return (
        <AnimatePresence mode="wait">
            {
                testState === "active" ?
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        key={`${testState}`}
                        style={{ width: "100%" }}
                    >
                        { GAME }   
                    </motion.div>
                    :
                testState === "configuring" ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        key={`${testState}`}
                    >
                        <Stack sx={{ width: "100%" }} alignItems="center" direction="column" spacing={isMobile ? 2 : 4}>
                            {
                                OPERATIONS.includes(capitalize(test_type) as Operation) &&
                                    <OperationCard operation={test_type as Operation} height={isMobile ? 220 :320} />
                            }
                            <Typography variant={isMobile ? "h6" : "h4"} sx={{ fontWeight: 600, opacity: .75, textAlign: 'center' }}>
                                { getOperationName(capitalize(test_type) as Operation) }  - Podesite test
                            </Typography>
                            <DifficultyPicker difficulty={difficulty} setDifficulty={setDifficulty} />
                            <Stack sx={{ width: isMobile ? "90%" : "100%" }}>
                                <Slider 
                                    onChange={(_, value) => setCount(value as number)}
                                    defaultValue={1}
                                    marks step={1}
                                    min={1} max={10}
                                    valueLabelDisplay="on"
                                />
                            </Stack>
                            <div style={{ height: isMobile ? 16 : 0 }} />
                            <Button 
                                onClick={() => setTestState("active")}
                                variant="contained"
                                disableElevation
                                sx={{ py: 3, px: 10, borderRadius: 4, mt: 4 }}
                            >
                                Pokreni test
                            </Button>
                        </Stack>
                    </motion.div>
                    :
                    <Stack alignItems="center" spacing={isMobile ? 3 : 6} sx={{ mt: isMobile ? 1 : 4 }}>
                        {/* Percentage */}
                        <ResultProgress custom_size={isMobile ? "6rem" : "10rem"} progress={(statistic.correct / statistic.total) * 100} />
                        {/* Info */}
                        <Stack alignItems="center" spacing={2}>
                            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600, opacity: .75, textAlign: 'center' }}>
                                {`${statistic.correct} / ${statistic.total}`}
                            </Typography>
                            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ opacity: .5, textAlign: "center" }}>
                                Točno ste odgovorili na { statistic.correct } pitanja od ukupno { statistic.total }
                            </Typography>
                        </Stack>
                        {/* Statistic */}
                        <Stack direction="column" spacing={3}>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={isMobile ? 0 : 3} flexWrap={isMobile ? "wrap" : "nowrap"}>
                                <Chip 
                                    variant="filled"
                                    color="default"
                                    label={`Zbrajanje: ${statistic?.Addition.correct}/${statistic?.Addition.total}`}
                                    sx={{ fontWeight: 500, mx: isMobile ? 2 : 0, mb: isMobile ? 2 : 0 }}
                                />
                                <Chip 
                                    variant="filled"
                                    color="default"
                                    label={`Oduzimanje: ${statistic?.Subtraction.correct}/${statistic?.Subtraction.total}`}
                                    sx={{ fontWeight: 500, mx: isMobile ? 2 : 0, mb: isMobile ? 2 : 0 }} 
                                />
                                <Chip 
                                    variant="filled"
                                    color="default"
                                    label={`Dijeljenje: ${statistic?.Division.correct}/${statistic?.Division.total}`}
                                    sx={{ fontWeight: 500, mx: isMobile ? 2 : 0 }}
                                />
                                <Chip 
                                    variant="filled"
                                    color="default"
                                    label={`Množenje: ${statistic?.Multiplication.correct}/${statistic?.Multiplication.total}`}
                                    sx={{ fontWeight: 500, mx: isMobile ? 2 : 0 }} 
                                />
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
                                <Chip 
                                    variant="outlined"
                                    color="success"
                                    label={`Lako: ${statistic?.Easy.correct}/${statistic?.Easy.total}`}
                                    sx={{ fontWeight: 500 }} 
                                />
                                <Chip 
                                    variant="outlined"
                                    color="warning"
                                    label={`Srednje: ${statistic?.Medium.correct}/${statistic?.Medium.total}`}
                                    sx={{ fontWeight: 500 }} 
                                />
                                <Chip 
                                    variant="outlined"
                                    color="error"
                                    label={`Teško: ${statistic?.Hard.correct}/${statistic?.Hard.total}`}
                                    sx={{ fontWeight: 500 }}
                                />
                            </Stack>
                        </Stack>
                        <div />
                        {/* Call to action - new test */}
                        <Button 
                            onClick={() => (setTestState("configuring"), setStatistic(initialStatistic))}
                            variant="contained"
                            disableElevation
                            sx={{ py: 3, px: 10, borderRadius: 4 }}
                        >
                            Pokreni novi test
                            <IconRotateClockwise2 style={{ marginLeft: 8 }} />
                        </Button>
                    </Stack>
            }
        </AnimatePresence>
    )
}

export default Test