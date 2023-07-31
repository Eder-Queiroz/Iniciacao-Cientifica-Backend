import { Request, Response } from "express";
import RoomService from "../../Service/RoomService";

export default class RoomController {
  async create(request: Request, response: Response) {
    const { name, fixed, building, capacity, class_id } = request.body;

    const roomService = new RoomService();

    try {
      const room = await roomService.create({
        name,
        fixed,
        building,
        capacity,
        class_id,
      });

      return response.json(room);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const roomService = new RoomService();

    try {
      const rooms = await roomService.read();

      return response.json(rooms);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { name, fixed, building, capacity, class_id } = request.body;
    const id = request.params.id as string;

    const roomService = new RoomService();

    try {
      const room = await roomService.update(
        { name, fixed, building, capacity, class_id },
        id
      );

      return response.json(room);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const roomService = new RoomService();

    try {
      const room = await roomService.delete(id);

      return response.json(room);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
