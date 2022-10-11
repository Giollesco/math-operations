import { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { Color, Difficulties, Difficulty, Operation } from '../../models'
import { motion } from 'framer-motion'
import { green, orange, red } from '@mui/material/colors'
import { useIsMobile } from '../../hooks/useDevice'

type IProps = {
  disabled?: boolean
  difficulty?: Difficulty,
  operation?: Operation,
  setDifficulty?: React.Dispatch<React.SetStateAction<Difficulty>>
  setCustomTestDifficulty?: (operation: Operation, difficulty: Difficulty) => void
}

// Constants
let CHIP_WIDTH = 100;
const COLOR: Color = {
  Easy: green[100],
  Medium: orange[100],
  Hard: red[100]
}

const DIFFICULTY_NAME: Color = {
  Easy: "Lako",
  Medium: "Srednje",
  Hard: "Teško"
}

const DifficultyPicker = ({ disabled = false, difficulty = Difficulties.Easy, operation, setDifficulty, setCustomTestDifficulty }: IProps) => {

  // Hooks
  const isMobile = useIsMobile()

  // Variables
  const DIFFICULTIES: Difficulty[] = [Difficulties.Easy, Difficulties.Medium, Difficulties.Hard]
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulty)
  let key = selectedDifficulty as keyof typeof COLOR;

  // Methods
  function handleOnChange(value: Difficulty){
    setSelectedDifficulty(value)
    setDifficulty && setDifficulty(value)
    // Handle custom test change
    if(operation && setCustomTestDifficulty){
      setCustomTestDifficulty(operation, value)
    }
  }

  useEffect(() => {
    if(disabled){
      setSelectedDifficulty(difficulty)
    }
  }, [difficulty])
  

  return (
    <Stack direction="row" style={{ width: 'max-content', height: 'max-content', position: 'relative' }}>

      {/* Disabled overlay */}
      {
        disabled &&
          <div
            style={{
              position: "absolute", top: 0, left: 0,
              backgroundColor: "transparent",
              padding: "4px 20px", borderRadius: 40,
              width: '100%', zIndex: 8,
              cursor: 'default'
            }}
          >
            <Typography variant={isMobile ? "caption" : "body1"} sx={{ visibility: "hidden" }}>{ difficulty }</Typography>
          </div>
      }

      {/* Indicator */}
      <motion.div
        initial={difficulty}
        animate={selectedDifficulty}
        variants={variants}
        transition={{ ease: 'anticipate', duration: .5 }}
        style={{
          position: "absolute", top: 0, left: 0,
          backgroundColor: `${COLOR[key]}80`,
          padding: "4px 20px", borderRadius: 40,
          width: CHIP_WIDTH, zIndex: 2
        }}
      >
        <Typography variant={isMobile ? "caption" : "body1"} sx={{ visibility: "hidden" }}>{ difficulty }</Typography>
      </motion.div>

      {/* Chips */}
      { DIFFICULTIES.map((difficulty, index) => (
        <div
          key={index}
          onClick={() => handleOnChange(difficulty)}
          style={{ 
            cursor: "pointer", zIndex: 4,
            padding: "4px 20px", borderRadius: 40,
            width: CHIP_WIDTH, textAlign: "center"
          }}
        >
          {/* Text */}
          <Typography variant={isMobile ? "caption" : "body1"} sx={{ userSelect: 'none' }}>
            { DIFFICULTY_NAME[difficulty] }
          </Typography>
        </div>
    )) }
    </Stack>
  )
}

type Variants = {
  [difficulty in Difficulty]: any
}

const variants: Variants = {
  Easy: {
    left: 0 * CHIP_WIDTH
  },
  Medium: {
    left: 1 * CHIP_WIDTH
  },
  Hard: {
    left: 2 * CHIP_WIDTH
  }
}

export default DifficultyPicker