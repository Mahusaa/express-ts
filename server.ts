import express from 'express'
import type { Request, Response } from 'express'


const app = express();
const PORT = 3001;



app.use("/", (req: Request, res: Response) => {
  res.send("hello world")
})




app.listen(PORT, () => {
  console.log("listening at port: 3001")
})
