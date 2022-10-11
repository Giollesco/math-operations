export type IRoutes = 
    React.ReactElement<any, string | React.JSXElementConstructor<any>> | null

export interface IRoute {
    path: string,
    element: JSX.Element,
    showOnSidebar?: boolean,
    name?: string,
    icon: any,
    children?: Array<IRoute>,
}

export enum Difficulties {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard"
}

export type Difficulty =
    Difficulties.Easy | 
    Difficulties.Medium |
    Difficulties.Hard

export enum Operations {
    Addition = "Addition",
    Subtraction = "Subtraction",
    Division = "Division",
    Multiplication = "Multiplication"
}

export type Operation = 
    Operations.Addition | 
    Operations.Subtraction | 
    Operations.Division | 
    Operations.Multiplication

export type OperationSymbols = {
    [operation in Operations]: string
}

export interface IQuestion {
    first_operand: number,
    second_operand: number,
    result: number,
    first_choice: number,
    second_choice: number
    operation: Operation,
    difficulty: Difficulty
}

export type IOperationHandler = 
    {[operation in Operation]: () => IQuestion}


type OperationConfigurationRange = {
    [difficulty in Difficulty]: [number, number]
}

type OperationConfigurationOffset = {
    [difficulty in Difficulty]: number
}

export type OperationConfiguration = {
    [operation in Operations]: {
        Range: OperationConfigurationRange,
        Offset: OperationConfigurationOffset
    }
}

export type Color = {
    [color in Difficulties]: string
}

type StatisticItem = {
    total: number,
    correct: number
}

export type Statistic = 
    { [operation in Operation]: StatisticItem } &
    { [difficulty in Difficulty]: StatisticItem } &
    { total: number, correct: number }


export type CustomTest = {
    [operation in Operation]: CustomTestOperation
}

type CustomTestOperation = {
    count: number,
    difficulty: Difficulty
}