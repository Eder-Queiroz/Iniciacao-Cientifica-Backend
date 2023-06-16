import { Request, Response } from "express";
import TurmaService from "../../Service/TurmaService/TurmaService";

export default class TurmaController {
  async create(request: Request, response: Response) {
    const { periodo, qtalunos, curso_id } = request.body;

    const turmaService = new TurmaService();

    try {
      const turma = await turmaService.create({
        periodo,
        qtalunos,
        curso_id,
      });

      return response.json(turma);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const turmaService = new TurmaService();

    try {
      const turmas = await turmaService.read();

      return response.json(turmas);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { periodo, qtalunos, curso_id } = request.body;
    const id = request.params.id as string;

    const turmaService = new TurmaService();

    try {
      const turma = await turmaService.update(
        { periodo, qtalunos, curso_id },
        id
      );

      return response.json(turma);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const turmaService = new TurmaService();

    try {
      const turma = await turmaService.delete(id);

      return response.json(turma);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
