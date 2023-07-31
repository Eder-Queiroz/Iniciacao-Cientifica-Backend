import { Request, Response } from "express";
import GroupService from "../../Service/GroupsService";

export default class GroupController {
  async create(request: Request, response: Response) {
    const { group1, group2, group3, group4, class_id } = request.body;

    const groupService = new GroupService();

    try {
      const group = await groupService.create({
        group1,
        group2,
        group3,
        group4,
        class_id,
      });

      return response.json(group);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async read(request: Request, response: Response) {
    const groupService = new GroupService();

    try {
      const groups = await groupService.read();

      return response.json(groups);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async update(request: Request, response: Response) {
    const { group1, group2, group3, group4, class_id } = request.body;
    const id = request.params.id as string;

    const groupService = new GroupService();

    try {
      const group = await groupService.update(
        { group1, group2, group3, group4, class_id },
        id
      );

      return response.json(group);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id as string;

    const groupService = new GroupService();

    try {
      const group = await groupService.delete(id);

      return response.json(group);
    } catch (err) {
      return response.status(400).json({ message: err });
    }
  }
}
