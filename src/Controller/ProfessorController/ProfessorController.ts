import { Request, Response } from "express";
import ProfessorService from "../../Service/ProfessorService/ProfessorService";

export default class ProfessorController {
  async create(request: Request, response: Response) {
    const { nome, email } = request.body;

    const professorService = new ProfessorService();

    try {
      const professor = await professorService.create({ nome, email });

      return response.json(professor);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const professorService = new ProfessorService();

    try {
      const professores = await professorService.read();

      return response.json(professores);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { nome, email } = request.body;
    const id = request.params.id as string;

    const professorService = new ProfessorService();

    try {
      const professor = await professorService.update({ nome, email }, id);

      return response.json(professor);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const professorService = new ProfessorService();

    try {
      const professor = await professorService.delete(id);

      return response.json(professor);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
