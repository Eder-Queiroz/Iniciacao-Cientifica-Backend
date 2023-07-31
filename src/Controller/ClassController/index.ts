import { Request, Response } from "express";
import ClassService from "../../Service/ClassService";

export default class ClassController {
  async create(request: Request, response: Response) {
    const { name, period, num_students, course_id } = request.body;

    const classService = new ClassService();

    try {
      const classes = await classService.create({
        name,
        period,
        num_students,
        course_id,
      });

      return response.json(classes);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const classService = new ClassService();

    try {
      const classes = await classService.read();

      return response.json(classes);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { name, period, num_students, course_id } = request.body;
    const id = request.params.id as string;

    const classService = new ClassService();

    try {
      const classes = await classService.update(
        { name, period, num_students, course_id },
        id
      );

      return response.json(classes);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const classService = new ClassService();

    try {
      const classes = await classService.delete(id);

      return response.json(classes);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
