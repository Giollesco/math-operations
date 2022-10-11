import { Alert, Button, Chip, Divider, MobileStepper, Snackbar, Stack, Typography } from '@mui/material'
import { green, grey, orange, red } from '@mui/material/colors'
import { getOperationSymbol, shuffle } from '../../helpers'
import { Color, Difficulties, Difficulty, IQuestion, Operation } from '../../models'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { KeyboardArrowRight } from '@mui/icons-material'

// Components
import useQuestions from '../../hooks/useQuestions'
import DifficultyPicker from '../DifficultyPicker'
import Number from '../Number'
import Choice from '../Choice'
import { useIsMobile } from '../../hooks/useDevice'

type IProps = {
  operation: Operation,
}

type Feedback = "success" | "error" | undefined

const Lesson = ({ operation }: IProps) => {

  // Hooks
  const isMobile = useIsMobile()
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulties.Easy)
  const { question } = useQuestions({ operation, difficulty })

  // Variables
  const [questionsCount, setQuestionsCount] = useState<number>(0)
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(question)
  const [result, setResult] = useState<number | undefined>(undefined)
  const [animate, setAnimate] = useState<boolean>(false)
  const [feedbackVisible, setFeedbackVisible] = useState<Feedback>(undefined)
  const [feedbackMessage, setFeedbackMessage] = useState<string>("")
  const [activeStep, setActiveStep] = useState(0);

  let color = difficulty as keyof typeof COLOR;
  let choices: number[] = useMemo(
    () => shuffle([currentQuestion.first_choice, currentQuestion.second_choice, currentQuestion.result]), 
    [difficulty, currentQuestion]
  )
  
  const COLOR: Color = {
    Easy: green[400],
    Medium: orange[400],
    Hard: red[400]
  }

  // Methods
  useEffect(() => {
    setResult(undefined)
    setCurrentQuestion(question)
  }, [difficulty])

  function onChoiceClick(choice: number){
    setResult(choice)
  }

  function handleNext(){
    // Handling feedback on correct answer
    if(result === currentQuestion.result){
      setFeedbackVisible("success")
      setFeedbackMessage("Točan odgovor! 🎉")
    }
    // Handling feedback on incorrect answer
    else{
      setFeedbackVisible("error")
      setFeedbackMessage(`Netočan odgovor! Točan odgovor je: ${currentQuestion.result} 😔`)
    }
    setTimeout(() => {
      setAnimate(true)
      setTimeout(() => {
        setAnimate(false)
        setResult(undefined)
        setCurrentQuestion(question)
        setQuestionsCount(previousCount => ++previousCount)
        setActiveStep(previousActiveStep => previousActiveStep + 1);
      }, 500);
    }, 1000);
  };


  return (
    <Stack spacing={2} direction="column">

      {/* Header */}
      <Stack 
        direction={isMobile ? "column" : "row"} 
        spacing={2} 
        sx={{ mb: isMobile ? 2 : 4, mt: isMobile ? -1 : 0 }} 
        alignItems={isMobile ? "flex-start" : "center"}
      >
        <Chip label={`Riješeno pitanja: ${activeStep}`} />
        <DifficultyPicker difficulty={difficulty} setDifficulty={setDifficulty} />
      </Stack>

      {/* Numbers */}
      <motion.div
        initial={animate ? { y: 0, opacity: 1 } : { y: -8, opacity: 0 }}
        animate={animate ? {y: 8, opacity: 0 } : { y: 0, opacity: 1 }}
        exit={animate ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }}
        transition={{ duration: .35 }}
      >
        <Stack direction="row" spacing={isMobile ? 0 : 2} alignItems="center" sx={{ mb: isMobile ? 4 : 6, height: 60  }}>

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
                  width: isMobile ? 60 : 100, height: isMobile ? 60 : 84,
                  fontSize: isMobile ? 18 : 24, fontWeight: 500, 
                  display: "grid", placeItems: "center" 
                }}
              >
                { result }
              </Stack>
          }
          </Stack>

          {/* Options */}
          { isMobile && <Divider /> }
          <Stack py={isMobile ? 2 : 0} direction={isMobile ? "row" : "column"} alignItems={isMobile ? "center" : "flex-start"} spacing={3}>
            <Choice selected={result === choices[0]} choice={choices[0]} onClick={onChoiceClick} sign="a" hideSign={isMobile} />
            <Choice selected={result === choices[1]} choice={choices[1]} onClick={onChoiceClick} sign="b" hideSign={isMobile} />
            <Choice selected={result === choices[2]} choice={choices[2]} onClick={onChoiceClick} sign="c" hideSign={isMobile} />
          </Stack>
          { isMobile && <Divider /> }

          {/* Stepper */}
          <MobileStepper
            variant="dots"
            steps={questionsCount + 1}
            position="static"
            activeStep={activeStep}
            style={{ marginTop: 20, width: "100%" }}
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
                Dalje
                <KeyboardArrowRight />
              </Button>
            }
          />
      </motion.div>

      {/* Feedback */}
      <Snackbar 
        open={!!feedbackVisible} 
        autoHideDuration={2000} 
        onClose={() => setFeedbackVisible(undefined)}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert 
          onClose={() => setFeedbackVisible(undefined)}
          severity={feedbackVisible}
          sx={{ width: '100%' }}
        >
          { feedbackMessage }
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Lesson