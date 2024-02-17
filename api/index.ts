import express, { Request, Response } from "express"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())
const port = 8000;

app.get("/",(req: Request, res: Response) => {
    res.status(200).send("Express in docker is working...And now with logs")
})

app.get("/todo",(req: Request, res: Response) => {
    const todo = ["take out garbage", "do dishes", "go shopping for a new iphone"]
    res.status(200).json(todo)
})

app.listen(port,()=> {
    console.log("Started on localhost:",port)
})