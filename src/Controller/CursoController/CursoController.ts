import { Request, Response } from "express";
import CursoService from "../../Service/CursoService/CursoService";

export default class CursoController {
  async create(request: Request, response: Response) {
    const { nome, turno, agrupamento } = request.body;

    const cursoService = new CursoService();

    try {
      const curso = await cursoService.create({ nome, turno, agrupamento });

      return response.json(curso);
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  async read(request: Request, response: Response) {
    const cursoService = new CursoService();

    try {
      const curso = await cursoService.read();

      return response.json(curso);
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  async update(request: Request, response: Response) {
    const { nome, turno, agrupamento } = request.body;
    const id = request.params.id as string;

    const cursoService = new CursoService();

    try {
      const curso = await cursoService.update({ nome, turno, agrupamento }, id);

      return response.json(curso);
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const cursoService = new CursoService();

    try {
      const curso = await cursoService.delete(id);

      return response.json(curso);
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }
}
