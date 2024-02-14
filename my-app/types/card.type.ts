export type CardCreatePayload = {
    name: string,
    cardNumber: number,
    expiryDate: Date,
    cvc: number,
    type?: string
  };