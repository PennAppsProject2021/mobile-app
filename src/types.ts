export type Answer = {
    type: "numeric"
} | {
    type: "multiradio"|"multiselect",
    options: string[]
} | {
    type: "multistring"
} | {
    type: "string"
}

export type Question = {
    prompt: string,
    answer: Answer,
    id: string
}