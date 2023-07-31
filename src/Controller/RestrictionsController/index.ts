import { Request, Response } from "express";
import RestrictionsService from "../../Service/RestrictionsService";

export default class RestrictionsController {
  async create(request: Request, response: Response) {
    const { period, day, teacher_id } = request.body;

    const restrictionsService = new RestrictionsService();

    try {
      const restrictions = await restrictionsService.create({
        period,
        day,
        teacher_id,
      });

      return response.json(restrictions);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const restrictionsService = new RestrictionsService();

    try {
      const restrictions = await restrictionsService.read();

      return response.json(restrictions);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { period, day, teacher_id } = request.body;
    const id = request.params.id as string;

    const restrictionsService = new RestrictionsService();

    try {
      const restrictions = await restrictionsService.update(
        { period, day, teacher_id },
        id
      );

      return response.json(restrictions);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const restrictionsService = new RestrictionsService();

    try {
      const restrictions = await restrictionsService.delete(id);

      return response.json(restrictions);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
