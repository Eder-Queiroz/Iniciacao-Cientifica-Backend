import { Request, Response } from "express";
import CourseService from "../../Service/CourseService";

export default class CourseController {
  async create(request: Request, response: Response) {
    const { name, shift, grouping } = request.body;

    const courseService = new CourseService();

    try {
      const course = await courseService.create({ name, shift, grouping });

      return response.json(course);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const courseService = new CourseService();

    try {
      const courses = await courseService.read();

      return response.json(courses);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { name, shift, grouping } = request.body;
    const id = request.params.id as string;

    const courseService = new CourseService();

    try {
      const course = await courseService.update({ name, shift, grouping }, id);

      return response.json(course);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const courseService = new CourseService();

    try {
      const course = await courseService.delete(id);

      return response.json(course);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
