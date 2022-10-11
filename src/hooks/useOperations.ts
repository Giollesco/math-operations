import { useCallback } from 'react'
import { OPERATION_CONFIGURATION } from '../constants'
import { generateOffset, randomOperand } from '../helpers'
import { Difficulty, IQuestion, Operations } from '../models'

interface IUseQuestion{
    difficulty: Difficulty,
}

const useAddition = ({ difficulty }: IUseQuestion): () => IQuestion => {

    // Methods
    const addition = useCallback((): IQuestion => {

        // Values
        let range = OPERATION_CONFIGURATION[Operations.Addition].Range[difficulty]
        let offset = OPERATION_CONFIGURATION[Operations.Addition].Offset[difficulty]
        let first_operand = randomOperand(range)
        let second_operand = randomOperand(range)
        let result = first_operand + second_operand;

        let [first_offset_value, second_offset_value] = generateOffset([(0 - offset), offset])

        let first_choice = result + first_offset_value;
        let second_choice = result + second_offset_value;
        
        // Returning question
        return {
            first_operand,
            second_operand,
            result,
            first_choice,
            second_choice,
            difficulty,
            operation: Operations.Addition
        }
    }, [difficulty])

    return addition
}

const useMultiplication = ({ difficulty }: IUseQuestion): () => IQuestion => {

    // Methods
    const multiplication = useCallback((): IQuestion => {

        // Values
        let range = OPERATION_CONFIGURATION[Operations.Multiplication].Range[difficulty]
        let offset = OPERATION_CONFIGURATION[Operations.Multiplication].Offset[difficulty]
        let first_operand = randomOperand(range)
        let second_operand = randomOperand(range)
        let result = first_operand * second_operand;

        let [first_offset_value, second_offset_value] = generateOffset([(0 - offset), offset])

        let first_choice = result + first_offset_value;
        let second_choice = result + second_offset_value;
        
        // Returning question
        return {
            first_operand,
            second_operand,
            result,
            first_choice,
            second_choice,
            difficulty,
            operation: Operations.Multiplication
        }
    }, [difficulty])

    return multiplication
}

const useSubtraction = ({ difficulty }: IUseQuestion): () => IQuestion => {

    // Methods
    const subtraction = useCallback((): IQuestion => {

        // Values
        let range = OPERATION_CONFIGURATION[Operations.Subtraction].Range[difficulty]
        let offset = OPERATION_CONFIGURATION[Operations.Subtraction].Offset[difficulty]
        let first_operand = randomOperand(range)
        let second_operand = randomOperand(range)
        // Swapping operands if first operand has lesser value than second
        // Preventing negative results
        if(first_operand < second_operand){
            [first_operand, second_operand] = [second_operand, first_operand]
        }
        let result = first_operand - second_operand
        let [first_offset_value, second_offset_value] = generateOffset([(0 - offset), offset])

        let first_choice = result + first_offset_value;
        let second_choice = result + second_offset_value;
        
        // Returning question
        return {
            first_operand,
            second_operand,
            result,
            first_choice,
            second_choice,
            difficulty,
            operation: Operations.Subtraction
        }
    }, [difficulty])

    return subtraction
}

const useDivision = ({ difficulty }: IUseQuestion): () => IQuestion => {

    // Methods
    const division = useCallback((): IQuestion => {

        // Values
        let range = OPERATION_CONFIGURATION[Operations.Division].Range[difficulty]
        let offset = OPERATION_CONFIGURATION[Operations.Division].Offset[difficulty]
        let _first_operand = randomOperand(range)
        let _second_operand = randomOperand(range)
        let _result = _first_operand * _second_operand;

        let result = _second_operand
        let first_operand = _result;
        let second_operand = _first_operand

        let [first_offset_value, second_offset_value] = generateOffset([(0 - offset), offset])

        let first_choice = result + first_offset_value;
        let second_choice = result + second_offset_value;
        
        // Returning question
        return {
            first_operand,
            second_operand,
            result,
            first_choice,
            second_choice,
            difficulty,
            operation: Operations.Division
        }
    }, [difficulty])

    return division
}

export { 
    useAddition,
    useMultiplication,
    useSubtraction,
    useDivision
}