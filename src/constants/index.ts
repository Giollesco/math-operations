import { CustomTest, Difficulties, OperationConfiguration, Operations, Statistic } from "../models";

// Operations configuration
export const OPERATION_CONFIGURATION: OperationConfiguration = {
    Addition: {
        Range: {
            Easy: [1, 10],
            Medium: [10, 25],
            Hard: [25, 100],
        },
        Offset: {
            Easy: 2,
            Medium: 4,
            Hard: 8
        }
    },
    Subtraction: {
        Range: {
            Easy: [1, 10],
            Medium: [10, 25],
            Hard: [25, 100]
        },
        Offset: {
            Easy: 2,
            Medium: 4,
            Hard: 8
        }
    },
    Multiplication: {
        Range: {
            Easy: [2, 8],
            Medium: [8, 18],
            Hard: [18, 30]
        },
        Offset: {
            Easy: 2,
            Medium: 4,
            Hard: 8
        }
    },
    Division: {
        Range: {
            Easy: [2, 6],
            Medium: [3, 12],
            Hard: [4, 20]
        },
        Offset: {
            Easy: 2,
            Medium: 4,
            Hard: 8
        }
    }
}


export const initialStatistic: Readonly<Statistic> = {
    total: 0, correct: 0,
    Addition: { total: 0, correct: 0 },
    Subtraction: { total: 0, correct: 0 },
    Division: { total: 0, correct: 0 },
    Multiplication: { total: 0, correct: 0 },
    Easy: { total: 0, correct: 0 },
    Medium: { total: 0, correct: 0 },
    Hard: { total: 0, correct: 0 },
}

export const initialCustomTest: Readonly<CustomTest> = {
    Addition: { count: 0, difficulty: Difficulties.Easy },
    Subtraction: { count: 0, difficulty: Difficulties.Easy },
    Multiplication: { count: 0, difficulty: Difficulties.Easy },
    Division: { count: 0, difficulty: Difficulties.Easy }
}

export const OPERATIONS: ReadonlyArray<Operations> = [
    Operations.Addition,
    Operations.Subtraction,
    Operations.Multiplication,
    Operations.Division
] 