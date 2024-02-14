import { Card, CardRequest } from "./cards.interface";
import { v4 as random } from "uuid";
import fs from "fs";

const loadCards = (): Card[] => {
    try {
        const data = fs.readFileSync("./cards.json", "utf-8");
        return JSON.parse(data).cards;
    } catch (error) {
        console.log(`Error ${error}`);
        return [];
    }
}

const saveCards = () => {
    try {
        fs.writeFileSync("./cards.json", JSON.stringify({ cards }), "utf-8");
        console.log("Cards saved successfully!");
    } catch (error) {
        console.log("Error", error);
    }
}

export const findAll = async (): Promise<Card[]> => cards;

export const findOne = async (id: string): Promise<Card | undefined> => cards.find(card => card.id === id);

export const create = async (card: CardRequest): Promise<null | Card> => {
    const newCard = {
        id: random(),
        ...card
    };

    cards.push(newCard);

    saveCards();

    return newCard;
}

let cards: Card[] = loadCards();
