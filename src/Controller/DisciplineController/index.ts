import { Request, Response } from "express";
import DisciplineService from "../../Service/DisciplineService";

export default class DisciplineController {
  async create(request: Request, response: Response) {
    const { name, period } = request.body;

    const disciplineService = new DisciplineService();

    try {
      const discipline = await disciplineService.create({ name, period });

      return response.json(discipline);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const disciplineService = new DisciplineService();

    try {
      const disciplines = await disciplineService.read();

      return response.json(disciplines);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { name, period } = request.body;
    const id = request.params.id as string;

    const disciplineService = new DisciplineService();

    try {
      const discipline = await disciplineService.update({ name, period }, id);

      return response.json(discipline);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const disciplineService = new DisciplineService();

    try {
      const discipline = await disciplineService.delete(id);

      return response.json(discipline);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
