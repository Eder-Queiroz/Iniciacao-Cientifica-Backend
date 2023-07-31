import { Request, Response } from "express";
import TeacherService from "../../Service/TeacherService";

export default class TeacherController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const professorService = new TeacherService();

    try {
      const professor = await professorService.create({ name, email });

      return response.json(professor);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const professorService = new TeacherService();

    try {
      const professores = await professorService.read();

      return response.json(professores);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { name, email } = request.body;
    const id = request.params.id as string;

    const professorService = new TeacherService();

    try {
      const professor = await professorService.update({ name, email }, id);

      return response.json(professor);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const professorService = new TeacherService();

    try {
      const professor = await professorService.delete(id);

      return response.json(professor);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
