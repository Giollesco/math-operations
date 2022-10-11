import { useEffect, useMemo, useState } from 'react'
import { Button, Chip, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import DifficultyPicker from '../../components/DifficultyPicker'
import OperationCard from '../../components/OperationCard'
import Slider from '../../components/Slider'
import { CustomTest, Difficulties, Difficulty, IQuestion, Operation, Operations, Statistic } from '../../models'
import Game from './Game'
import { getOperationName, shuffle } from '../../helpers'
import useQuestions from '../../hooks/useQuestions'
import { useLayoutCtx } from '@mui-treasury/layout'
import ResultProgress from '../../components/ResultProgress'
import { initialCustomTest, initialStatistic, OPERATIONS } from '../../constants'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { IconRotateClockwise2 } from '@tabler/icons'
import { useIsMobile } from '../../hooks/useDevice'

type IProps = {}

export type TestState = "configuring" | "active" | "finished"

const CustomTestComponent = (props: IProps) => {

    // Hooks
    const isMobile = useIsMobile()
    
    // Variables
    const [customTestConfiguration, setCustomTestConfiguration] = useState<CustomTest>(initialCustomTest)
    const [statistic, setStatistic] = useState<Statistic>(initialStatistic)
    const [testState, setTestState] = useState<TestState>("configuring")
    const { setOpen } = useLayoutCtx()

    // Questions
    const additions = useQuestions({ 
        operation: Operations.Addition,
        count: customTestConfiguration[Operations.Addition].count,
        difficulty: customTestConfiguration[Operations.Addition].difficulty,
    }).questions
    
    const subtractions = useQuestions({ 
        operation: Operations.Subtraction,
        count: customTestConfiguration[Operations.Subtraction].count,
        difficulty: customTestConfiguration[Operations.Subtraction].difficulty,
    }).questions

    const multiplications = useQuestions({ 
        operation: Operations.Multiplication,
        count: customTestConfiguration[Operations.Multiplication].count,
        difficulty: customTestConfiguration[Operations.Multiplication].difficulty,
    }).questions

    const divisions = useQuestions({ 
        operation: Operations.Division,
        count: customTestConfiguration[Operations.Division].count,
        difficulty: customTestConfiguration[Operations.Division].difficulty,
    }).questions

    let questions: IQuestion[] = [
        ...multiplications, 
        ...subtractions, 
        ...divisions,
        ...additions, 
    ]

    const isButtonDisabled = Object.values(customTestConfiguration).every(item => !item.count)
    
    // Methods
    function handleTestConfigurationCount(operation: Operation, count: number){
        let configuration = { ...customTestConfiguration }
        configuration = {
            ...customTestConfiguration,
            [operation]: {
                ...customTestConfiguration[operation],
                count
            }
        }
        setCustomTestConfiguration(configuration)
    }

    function handleTestConfigurationDifficulty(operation: Operation, difficulty: Difficulty){
        let configuration = { ...customTestConfiguration }
        configuration = {
            ...customTestConfiguration,
            [operation]: {
                ...customTestConfiguration[operation],
                difficulty
            }
        }
        setCustomTestConfiguration(configuration)
    }

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
                customTest
                count={questions.length}
                questions={questions}
                statistic={statistic}
                setTestState={setTestState}
                setStatistic={setStatistic}
            />  
        )
    }, [statistic, testState, setStatistic])

    return (
        <AnimatePresence mode="wait">
            {
                testState === "active" ?
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        key={`${testState}`}
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
                        style={{ display: 'flex', alignItems: "center", flexDirection: "column", maxWidth: '100vw', overflowX: 'hidden' }}
                    >
                        <Typography variant="h5" sx={{ opacity: .85, fontWeight: 500, mb: .5 }}>Prilagođeni test</Typography>
                        <Typography 
                            variant="subtitle2" 
                            sx={{ textAlign: "center", opacity: .5, mb: 4, fontWeight: isMobile ? 400 : 500, fontSize: isMobile ? 12 : 14 }}
                        >
                            Kreirajte prilagođeni test u kojemu možete ručno izabrati broj pitanja i težinu za svaku od ponuđenih operacija
                        </Typography>
                        <Grid container spacing={10}>
                            { OPERATIONS.map((operation, index) => (
                                <Grid md={12} lg={6} key={index}>
                                    <Stack sx={{ width: "100%", px: 4, position: "relative" }} alignItems="center" direction="column" spacing={2.5}>
                                        {/* Card */}
                                        <OperationCard operation={operation.toLowerCase() as Operation} height={140} />
                                        {/* Name */}
                                        <Chip 
                                            label={getOperationName(operation)} 
                                            sx={{ 
                                                position: "absolute", zIndex: 10, 
                                                backgroundColor: "#ffffff80", backdropFilter: "blur(4px)", 
                                                top: 30, px: 6, py: 2.5, fontWeight: 600
                                            }}
                                        />
                                        {/* Difficulty */}
                                        <DifficultyPicker 
                                            operation={operation}
                                            difficulty={customTestConfiguration[operation].difficulty} 
                                            setCustomTestDifficulty={handleTestConfigurationDifficulty} 
                                        />
                                        {/* Count */}
                                        <Slider 
                                            onChange={(_, value) => handleTestConfigurationCount(operation, value as number)}
                                            defaultValue={0}
                                            marks step={1}
                                            min={0} max={10}
                                            valueLabelDisplay="on"
                                        />
                                    </Stack>
                                </Grid>
                            )) }
                        </Grid>
                        {/* Spacing */}
                        <div style={{ height: 40 }} />
                        {/* CTA */}
                        <Button 
                            onClick={() => setTestState("active")}
                            variant="contained"
                            disabled={isButtonDisabled}
                            disableElevation
                            sx={{ py: 3, px: 10, borderRadius: 4, mt: 4 }}
                        >
                            Pokreni test
                        </Button>
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

export default CustomTestComponent