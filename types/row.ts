import { ROW_COMMENTS_TYPE } from '~/constants/row';

export interface AudioRecord {
    id: string
}

export interface TextComment {
    id: string
    value: string
    type: typeof ROW_COMMENTS_TYPE.TEXT
}

export interface AudioComment {
    id: string
    type: typeof ROW_COMMENTS_TYPE.AUDIO
}

export interface Row {
    id: string
    caption?: string
    comments: (TextComment | AudioComment)[]
    audioRecords?: AudioRecord[]
}

export interface MobileRowActionMethod {
    (): void
}

export interface MobileRowAction {
    icon: string
    title: string
    action: MobileRowActionMethod
}
