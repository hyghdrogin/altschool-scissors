export interface IURL {
    _id?: string;
    username: string;
    shortCode: string;
    longURL: string;
    shortURL: string;
    QRCode: string;
    clicks: {
        timestamp: Date;
        ipAddress: string;
        userAgent: string;
    }[];
    clickCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface CustomUrlInterface {
    shortCode: string,
    longURL: string
}