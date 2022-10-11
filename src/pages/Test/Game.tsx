import { Box, Button, Chip, Divider, MobileStepper, Stack, Typography } from '@mui/material'
import DifficultyPicker from '../../components/DifficultyPicker'
import { getOperationName, getOperationSymbol, handleCustomTestFinalStatistic, handleFinalStatistic, shuffle } from '../../helpers'
import { Color, Difficulty, IQuestion, Operation, Statistic } from '../../models'
import { motion } from 'framer-motion'
import Number from '../../components/Number'
import { green, grey, orange, red } from '@mui/material/colors'
import Choice from '../../components/Choice'
import { KeyboardArrowRight, Check } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import { TestState } from '.'
import { useIsMobile } from '../../hooks/useDevice'

type IProps = {
    customTest?: boolean,
    questions: IQuestion[]
    count: number,
    statistic: Statistic,
    setTestState: React.Dispatch<React.SetStateAction<TestState>>,
    setStatistic: React.Dispatch<React.SetStateAction<Statistic>>
}

const Game = ({ customTest = false, count, questions, statistic, setTestState, setStatistic }: IProps) => {

    // Hooks
    const isMobile = useIsMobile()
    
    //Variables
    const [activeStep, setActiveStep] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(questions[activeStep])
    const [result, setResult] = useState<number | undefined>(undefined)
    const [animate, setAnimate] = useState<boolean>(false)

    let last_question: boolean = (activeStep + 1) === count
    let color = currentQuestion.difficulty as keyof typeof COLOR;
    let choices: number[] = useMemo(
        () => shuffle([currentQuestion.first_choice, currentQuestion.second_choice, currentQuestion.result]), 
        [currentQuestion.difficulty, currentQuestion]
    )
    
    const COLOR: Color = {
        Easy: green[400],
        Medium: orange[400],
        Hard: red[400]
    }

    // Methods
    function onChoiceClick(choice: number){
        setResult(choice)
    }

    function updateStatistic(){
        let _statistic: Statistic = {...statistic}
        _statistic = {
            ..._statistic,
            correct: result === currentQuestion.result ? _statistic.correct + 1 : _statistic.correct,
            [currentQuestion.difficulty as Difficulty]: {
                ..._statistic[currentQuestion.difficulty as Difficulty],
                correct: 
                    result === currentQuestion.result ? 
                        _statistic[currentQuestion.difficulty as Difficulty].correct + 1 :
                        _statistic[currentQuestion.difficulty as Difficulty].correct
            },
            [currentQuestion.operation as Operation]: {
                ..._statistic[currentQuestion.operation as Operation],
                correct: 
                    result === currentQuestion.result ? 
                        _statistic[currentQuestion.operation as Operation].correct + 1 :
                        _statistic[currentQuestion.operation as Operation].correct
            }
        }
        setStatistic(_statistic)
    }

    function handleNext(){
        if(!last_question){
            updateStatistic()
            setAnimate(true)
            setTimeout(() => {
                setAnimate(false)
                setCurrentQuestion(questions[activeStep + 1])
                setResult(undefined)
                setActiveStep(previousActiveStep => previousActiveStep + 1);
            }, 500);
        }
        else{
            if(customTest) {
                handleCustomTestFinalStatistic({ 
                    count, 
                    result, 
                    statistic, 
                    questions, 
                    currentQuestion, 
                    setStatistic 
                })
            }
            else{
                handleFinalStatistic({ 
                    count, 
                    result, 
                    statistic, 
                    questions, 
                    currentQuestion, 
                    setStatistic 
                })
            }
            setTestState("finished")
        }
    };

    return (
        <Stack spacing={2} alignItems="center" sx={{ w: "100%" }}>
            {/* Page title */}
            <Stack spacing={1} direction={isMobile ? "row" : "column"} alignItems={isMobile ? "center" : "flex-start"}>
                <Box 
                    sx={{ 
                        width: 40, height: 40, 
                        display: 'grid', placeItems: "center", 
                        borderRadius: 40, border: "1px solid #ddd" 
                    }}
                >
                    🔔
                </Box>
                <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600, opacity: .85, textAlign: "center" }}>
                    Brzi { !isMobile && <br/> } ispit znanja
                </Typography>
            </Stack>

            
            <Chip label={getOperationName(currentQuestion.operation)} />

            {/* Description */}
            <Typography variant="body2" sx={{ lineHeight: 2, maxWidth: 900, opacity: .75, fontSize: 14, textAlign: "center" }}>
                Trenutno odgovarate pitanje: { activeStep + 1 } od ukupno: { count } pitanja.
            </Typography>

            <DifficultyPicker difficulty={currentQuestion.difficulty} disabled />

            {/* Spacing */}
            <div style={{ height: 20 }} />

            {/* Questions */}
            <motion.div
                initial={animate ? { y: 0, opacity: 1 } : { y: -8, opacity: 0 }}
                animate={animate ? {y: 8, opacity: 0 } : { y: 0, opacity: 1 }}
                exit={animate ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }}
                transition={{ duration: .35 }}
            >
                <Stack direction="row" spacing={isMobile ? 0 : 2} alignItems="center" justifyContent="center" sx={{ mb: isMobile ? 4 : 6, height: 60  }}>

                {/* First operand */}
                <Number number={currentQuestion.first_operand} color={COLOR[color]} />

                {/* Operation symbol */}
                <Stack 
                    sx={{ 
                        borderRadius: 6, px: isMobile ? 2 : 4, 
                        width: 'max-content', 
                        fontSize: isMobile ? 18 : 24, fontWeight: 500
                    }}
                >
                    { getOperationSymbol(currentQuestion.operation) }
                </Stack>

                {/* Second operand */}
                <Number number={currentQuestion.second_operand} color={COLOR[color]} />

                {/* Equals symbol */}
                <Stack 
                    direction="column" 
                    sx={{
                        borderRadius: 6, px: isMobile ? 2 : 4, 
                        width: 'max-content', fontSize: isMobile ? 18 : 24     
                    }}
                >
                    =
                </Stack>

                {/* Result */}
                {
                    result === undefined ?
                        <Stack 
                            direction="column" 
                            sx={{ 
                                border: isMobile ? `2px dashed ${grey[400]}` : `4px dashed ${grey[200]}`, 
                                borderRadius: 6, 
                                display: 'grid', placeItems: 'center', 
                                fontSize: isMobile ? 18 : 24, fontWeight: 500, 
                                width: isMobile ? 60 : 100, height: isMobile ? 60 : 84
                            }}
                        >
                            ?
                        </Stack> 
                        :
                        <Stack 
                            direction="column" 
                            sx={{ 
                                bgcolor: COLOR[color], color: "white", 
                                borderRadius: 6,
                                fontSize: isMobile ? 18 : 24, fontWeight: 500, 
                                width: isMobile ? 60 : 100, height: isMobile ? 60 : 84,
                                display: "grid", placeItems: "center" 
                            }}
                        >
                            { result }
                        </Stack>
                }
                </Stack>

                {/* Options */}
                { isMobile && <Divider sx={{ width: '100vw' }} /> }
                <Stack 
                    py={isMobile ? 2 : 4} 
                    direction="row"
                    alignItems={isMobile ? "center" : "flex-start"} 
                    spacing={3}
                    justifyContent="center"
                >
                    <Choice selected={result === choices[0]} choice={choices[0]} onClick={onChoiceClick} hideSign />
                    <Choice selected={result === choices[1]} choice={choices[1]} onClick={onChoiceClick} hideSign />
                    <Choice selected={result === choices[2]} choice={choices[2]} onClick={onChoiceClick} hideSign />
                </Stack>
                { isMobile && <Divider /> }

                {/* Stepper */}
                <MobileStepper
                    variant="dots"
                    steps={count}
                    position="static"
                    activeStep={activeStep}
                    style={{ marginTop: 20 }}
                    backButton={null}
                    nextButton={
                        <Button
                            disableElevation
                            variant="contained"
                            size="medium"
                            onClick={handleNext}
                            disabled={result === undefined}
                            style={{ borderRadius: 12, padding: "8px 16px" }}
                        >
                            { last_question ? "Završi test" : "Dalje" }
                            { last_question ? <Check /> : <KeyboardArrowRight /> }
                        </Button>
                    }
                />
            </motion.div>
        </Stack>
    )
}

export default Game