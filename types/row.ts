export interface AudioRecord {
    id: string
}

export interface TextComment {
    id: string
}

export interface AudioComment {
    id: string
}

export interface Row {
    id: string
    caption?: string
    captionHeight?: number
    textComments?: TextComment[]
    audioComments?: AudioComment[]
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
