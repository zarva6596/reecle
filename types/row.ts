export interface AudioRecord {
    id: string
}

export interface TextComment {
    id: string
    value: string
}

export interface AudioComment {
    id: string
}

export interface Row {
    id: string
    caption?: string
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
