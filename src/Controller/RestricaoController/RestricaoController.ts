import { Request, Response } from "express";
import RestricaoService from "../../Service/RestricaoService/RestricaoService";

export default class RestricaoController {
  async create(request: Request, response: Response) {
    const { professor_id, dia, periodo } = request.body;

    const restricaoService = new RestricaoService();

    try {
      const restricao = await restricaoService.create({
        professor_id,
        dia,
        periodo,
      });

      return response.json(restricao);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const restricaoService = new RestricaoService();

    try {
      const restricoes = await restricaoService.read();

      return response.json(restricoes);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { professor_id, dia, periodo } = request.body;
    const id = request.params.id as string;

    const restricaoService = new RestricaoService();

    try {
      const restricao = await restricaoService.update(
        { professor_id, dia, periodo },
        id
      );

      return response.json(restricao);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const restricaoService = new RestricaoService();

    try {
      const restricao = await restricaoService.delete(id);

      return response.json(restricao);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
