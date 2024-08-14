import http from 'http'
import express from 'express'
import type { Request, Response, NextFunction } from 'express'

interface ResponseError extends Error {
  status?: number;
}

const app = express();
const PORT = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world")
});


app.use("/products")
app.use("/orders")
app.use("/users")

// Catch all undefined route
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: ResponseError = new Error("Path doesn't exist");
  error.status = 404;
  next(error);
});


app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});



const server = http.createServer(app);



server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})
