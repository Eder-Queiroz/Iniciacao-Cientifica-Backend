import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./router";
import AlgoritmoGenetico from "./Core/AlgoritmoGenetico";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

app.get("/ag", async (req, res) => {
  const ag = new AlgoritmoGenetico();
  const result = await ag.ngOnInit();

  const pdfDoc = pdfMake.createPdf(result as unknown as TDocumentDefinitions);

  //baixar o pdf criado em pdfDoc

  pdfDoc.getBase64((data) => {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment;filename="GradeHoraria.pdf"',
    });

    const download = Buffer.from(data.toString(), "base64");
    res.end(download);
  });
});

app.listen(PORT, () =>
  console.log(
    `Server online!\nServidor rodando na porta ${PORT} => http://localhost:${PORT}`
  )
);
