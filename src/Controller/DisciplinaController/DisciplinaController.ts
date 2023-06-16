import { Request, Response } from "express";
import DisciplinaService from "../../Service/DisciplinaService/DisciplinaService";

export default class DisciplinaController {
  async create(request: Request, response: Response) {
    const { nome, periodo, qtaulas, professor_id, curso_id } = request.body;

    const disciplinaService = new DisciplinaService();

    try {
      const disciplina = await disciplinaService.create({
        nome,
        periodo,
        qtaulas,
        professor_id,
        curso_id,
      });

      return response.json(disciplina);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const disciplinaService = new DisciplinaService();

    try {
      const disciplinas = await disciplinaService.read();

      return response.json(disciplinas);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { nome, periodo, qtaulas, professor_id, curso_id } = request.body;
    const id = request.params.id as string;

    const disciplinaService = new DisciplinaService();

    try {
      const disciplina = await disciplinaService.update(
        { nome, periodo, qtaulas, professor_id, curso_id },
        id
      );

      return response.json(disciplina);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const disciplinaService = new DisciplinaService();

    try {
      const disciplina = await disciplinaService.delete(id);

      return response.json(disciplina);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
