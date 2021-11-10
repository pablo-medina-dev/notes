export interface Note {
    title: string,
    content: string
}

export interface NoteRecord extends Note {
    id: number
}
