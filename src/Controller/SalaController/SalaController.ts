import { Request, Response } from "express";
import SalaService from "../../Service/SalaService/SalaService";

export default class SalaController {
  async create(request: Request, response: Response) {
    const { nome, capacidade, qtdpcs } = request.body;

    const salaService = new SalaService();

    try {
      const sala = await salaService.create({
        nome,
        capacidade,
        qtdpcs,
      });

      return response.json(sala);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const salaService = new SalaService();

    try {
      const salas = await salaService.read();

      return response.json(salas);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { nome, capacidade, qtdpcs } = request.body;
    const id = request.params.id as string;

    const salaService = new SalaService();

    try {
      const sala = await salaService.update({ nome, capacidade, qtdpcs }, id);

      return response.json(sala);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const salaService = new SalaService();

    try {
      const sala = await salaService.delete(id);

      return response.json(sala);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
