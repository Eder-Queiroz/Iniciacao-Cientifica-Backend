import { Request, Response } from "express";
import ClassroomService from "../../Service/ClassroomService";

export default class ClassroomController {
  async create(request: Request, response: Response) {
    const {
      amount,
      duration,
      teacher_id,
      discipline_id,
      room_id,
      course_id,
      class_id,
    } = request.body;

    const classroomService = new ClassroomService();

    try {
      const classroom = await classroomService.create({
        amount,
        duration,
        teacher_id,
        discipline_id,
        room_id,
        course_id,
        class_id,
      });

      return response.json(classroom);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const classroomService = new ClassroomService();

    try {
      const classrooms = await classroomService.read();

      return response.json(classrooms);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const {
      amount,
      duration,
      teacher_id,
      discipline_id,
      room_id,
      course_id,
      class_id,
    } = request.body;
    const id = request.params.id as string;

    const classroomService = new ClassroomService();

    try {
      const classroom = await classroomService.update(
        {
          amount,
          duration,
          teacher_id,
          discipline_id,
          room_id,
          course_id,
          class_id,
        },
        id
      );

      return response.json(classroom);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const classroomService = new ClassroomService();

    try {
      const classroom = await classroomService.delete(id);

      return response.json(classroom);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
