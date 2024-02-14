import express, { Request, Response } from "express"
import * as cardsDB from "./cards.database"
import { StatusCodes } from "../utils"
import fs from "fs";

export const cardsRouter = express.Router();

cardsRouter.get('/cards', async (req: Request, res: Response) => {
    try {
        const cards = await cardsDB.findAll();

        if (!cards) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'No cards found!' });
        }

        return res.status(StatusCodes.OK).json({ total: cards.length, cards });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
})

cardsRouter.put("/cards/:id", async (req: Request, res: Response) => {
    try {
        const { name, cardNumber, cvc, expiryDate, type } = req.body;

        if (!name || !cardNumber || !cvc || !expiryDate) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
        }
    
    const cards = await cardsDB.findAll(); 

    const i = cards.findIndex(x => x.id === req.params.id)

    console.log("vleze", type)

    cards[i] = {
        id: req.params.id,
        name,
        cardNumber,
        cvc,
        expiryDate,
        type: type ? type : 'mastercard'
    } 

    try {
        fs.writeFileSync("./cards.json", JSON.stringify({ cards }), "utf-8");
        console.log("Cards saved successfully!");
    } catch (error) {
        console.log("Error", error);
    }

        return res.status(StatusCodes.OK).json({ cards });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
})

cardsRouter.post("/cards", async (req: Request, res: Response) => {
    try {
        const { name, cardNumber, cvc, expiryDate, type } = req.body;

        if (!name || !cardNumber || !cvc || !expiryDate) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all the required parameters..' });
        }

        const card = await cardsDB.create({
            name,
            cardNumber,
            cvc,
            expiryDate,
            type: type ? type : 'mastercard'
         });
         
        return res.status(StatusCodes.OK).json({ card });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
})
