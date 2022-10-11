import { Difficulty, IOperationHandler, IQuestion, Operation } from '../models'
import { useAddition, useDivision, useMultiplication, useSubtraction } from './useOperations'

interface IUseOperation{
    count?: number,
    difficulty: Difficulty,
    operation: Operation
}

interface IUseQuestions {
    questions: IQuestion[], 
    question: IQuestion
}

const useQuestions = ({ count = 1, difficulty, operation }: IUseOperation): IUseQuestions => {

    // Hooks
    const addition = useAddition({ difficulty })
    const multiplication = useMultiplication({ difficulty })
    const subtraction = useSubtraction({ difficulty })
    const division = useDivision({ difficulty })

    // Variables
    let questions: IQuestion[] = [], question: IQuestion | undefined;
    let operation_key = operation as keyof typeof OperationHandler;

    // Handlers
    const OperationHandler: IOperationHandler = {
        Addition: addition,
        Multiplication: multiplication,
        Subtraction: subtraction,
        Division: division,
    }

    // Methods
    for(let i = 0; i < count; i++){
        questions.push(OperationHandler[operation_key]())
    }

    // Returning single question
    question = OperationHandler[operation_key]()

    return { questions, question }
}

export default useQuestions