export type Partner = {
    id: number;
    name: string;
    logo: string;
    link: string;
}

export type NewsItemProps = {
    id: number
    title: string
    description: string
    images?: string[]
    content?: string | TrustedHTML
}


export type ReportProps = {
    id: number
    title: string
    description: string
    imageUrl?: string
    downloadLink?: string
}

export type ImageCollectionProps = {
    id: number
    title: string
    description: string
    images: string[]
}

export type Initiative = {
    id: number
    title: string
    description: string
    date: string
    images: string[]
    videos: string[]
    status: string
}