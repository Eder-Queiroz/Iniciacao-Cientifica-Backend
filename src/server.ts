import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./router";
import AlgoritmoGenetico from "./Core/AlgoritmoGenetico";

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // Se for um instancia do tipo error
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "internal serve error",
  });
});

app.get("/ag", (req, res) => {
  const ag = new AlgoritmoGenetico();
  const result = ag.ngOnInit();
  return res.json(result);
})

app.listen(PORT, () =>
  console.log(
    `Server online!\nServidor rodando na porta ${PORT} => http://localhost:${PORT}`
  )
);

