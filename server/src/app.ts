import express from "express"
import cors from "cors"
import helmet from "helmet"
import { cardsRouter } from "./cards/cards.routes"

const PORT = 7000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use('/', cardsRouter)

app.listen(PORT, () => {
    
    console.log(`Server is listening on port ${PORT}`)
});
