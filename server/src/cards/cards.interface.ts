export interface Card {
    id: string;
    name: string;
    expiryDate: Date;
    cardNumber: number;
    cvc: number;
    type?: string;
}

export type CardRequest = Omit<Card, 'id'>;
