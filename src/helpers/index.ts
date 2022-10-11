import { Difficulties, Difficulty, IQuestion, Operation, Operations, OperationSymbols, Statistic } from "../models";

type RandomOperand = [number, number]
type OffsetArray = [number, number]

type HandleFinalStatistic = {
    statistic: Statistic,
    count: number,
    result: number | undefined,
    currentQuestion: IQuestion,
    questions: IQuestion[]
    setStatistic: (value: React.SetStateAction<Statistic>) => void
}

export function randomOperand([min, max]: RandomOperand): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array: any[]): any[] {
    let currentIndex: number = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export function generateOffset([start, end]: OffsetArray): OffsetArray{
    /*
        1. Generating array in range(start, end)
            eg. start = -3, end = 3
                => arr = [-3, -2, -1, 0, 1, 2, 3]
        2. Removing 0 - preventing from having same choice value as result
            eg.
                => arr = [-3, -2, -1, 1, 2, 3]
        3. Shuffling array - makes sure two offset values are different - runs only once per generating question
            eg.
                => [-2, 1, 3, -3, -1, 2]
        4. Returning first two elements - two offset values
            eg.
                => [-2, 1]
    */
    let arr = 
        Array(Math.ceil((end - start) / 1))
            .fill(start)
            .map((x, y) => x + y * 1)
            .filter(number => number !== 0)

    let shuffled = shuffle(arr)

    return [shuffled[0], shuffled[1]]
    
}

export function getOperationSymbol(operation: Operation): string {

    const Symbols: OperationSymbols = {
        Addition: "+",
        Subtraction: "-",
        Multiplication: "*",
        Division: "÷"
    }

    let key = operation as keyof typeof Symbols

    return Symbols[key]
}

export function getOperationName(operation: Operation): string {

    const Symbols: OperationSymbols = {
        Addition: "Zbrajanje",
        Subtraction: "Oduzimanje",
        Multiplication: "Množenje",
        Division: "Dijeljenje"
    }

    let key = operation as keyof typeof Symbols

    return Symbols[key]
}

export const capitalize = (s: any) => (s && s[0].toUpperCase() + s.slice(1)) || ""

export const handleFinalStatistic = ({ count, result, statistic, questions, currentQuestion, setStatistic }: HandleFinalStatistic) => {
    let _statistic: Statistic = { ...statistic }
    _statistic = {
        ..._statistic,
        total: count,
        correct: 
            result === currentQuestion.result ? 
                _statistic.correct + 1 : 
                _statistic.correct,
        // Update operations
        [currentQuestion.operation as Operation]: {
            ..._statistic[currentQuestion.operation as Operation],
            total: questions.filter(item => item.operation === currentQuestion.operation).length,
            correct: 
                result === currentQuestion.result ? 
                    _statistic[currentQuestion.operation as Operation].correct + 1 : 
                    _statistic[currentQuestion.operation as Operation].correct
        },
        // Update difficulties
        [currentQuestion.difficulty as Difficulty]: {
            ..._statistic[currentQuestion.difficulty as Difficulty],
            total: questions.filter(item => item.difficulty === currentQuestion.difficulty).length,
            correct: 
                result === currentQuestion.result ? 
                    _statistic[currentQuestion.difficulty as Difficulty].correct + 1 : 
                    _statistic[currentQuestion.difficulty as Difficulty].correct
        },
    }
    setStatistic(_statistic)
}

export const handleCustomTestFinalStatistic = ({ count, result, statistic, questions, currentQuestion, setStatistic }: HandleFinalStatistic) => {
    
    let _statistic: Statistic = { ...statistic }
    let isCorrect = result === currentQuestion.result

    _statistic = {
        ..._statistic,
        total: count,
        correct: 
            isCorrect ? 
                _statistic.correct + 1 : 
                _statistic.correct,
        Addition: {
            correct: currentQuestion.operation === Operations.Addition && isCorrect ? _statistic.Addition.correct + 1 : _statistic.Addition.correct,
            total: questions.filter(item => item.operation === Operations.Addition).length
        },
        Subtraction: {
            correct: currentQuestion.operation === Operations.Subtraction && isCorrect ? _statistic.Subtraction.correct + 1 : _statistic.Subtraction.correct,
            total: questions.filter(item => item.operation === Operations.Subtraction).length
        },
        Multiplication: {
            correct: currentQuestion.operation === Operations.Multiplication && isCorrect ? _statistic.Multiplication.correct + 1 : _statistic.Multiplication.correct,
            total: questions.filter(item => item.operation === Operations.Multiplication).length
        },
        Division: {
            correct: currentQuestion.operation === Operations.Division && isCorrect ? _statistic.Division.correct + 1 : _statistic.Division.correct,
            total: questions.filter(item => item.operation === Operations.Division).length
        },
        Easy: {
            correct: currentQuestion.difficulty === Difficulties.Easy && isCorrect ? _statistic.Easy.correct + 1 : _statistic.Easy.correct,
            total: questions.filter(item => item.difficulty === Difficulties.Easy).length
        },
        Medium: {
            correct: currentQuestion.difficulty === Difficulties.Medium && isCorrect ? _statistic.Medium.correct + 1 : _statistic.Medium.correct,
            total: questions.filter(item => item.difficulty === Difficulties.Medium).length
        },
        Hard: {
            correct: currentQuestion.difficulty === Difficulties.Hard && isCorrect ? _statistic.Hard.correct + 1 : _statistic.Hard.correct,
            total: questions.filter(item => item.difficulty === Difficulties.Hard).length
        }
    }
    setStatistic(_statistic)
}