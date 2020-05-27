export interface Page {
    title: string
}

export interface PageReference {
    type: 'page-reference'
}

export interface ParagraphBlock {
    type: 'paragraph'
    content: string
}

export interface HeadingBlock {
    type: 'heading'
    level: number
    content: string
}

export type Block = ParagraphBlock | HeadingBlock

export interface BlockReference {
    type: 'block-reference'
}
