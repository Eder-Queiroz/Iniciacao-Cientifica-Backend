import prismaClient from "../../prisma";

interface RoomRequest {
  name: string;
  fixed: boolean;
  building: string;
  capacity: number;
  class_id?: string;
}

export default class RoomService {
  async create({ name, fixed, building, capacity, class_id }: RoomRequest) {
    const room = await prismaClient.room.create({
      data: {
        name,
        fixed,
        building,
        capacity,
        class_id,
      },
    });

    return room;
  }

  async read() {
    const rooms = await prismaClient.room.findMany({
      include: {
        class: true,
      },
    });

    return rooms;
  }

  async update(
    { name, fixed, building, capacity, class_id }: RoomRequest,
    id: string
  ) {
    const room = await prismaClient.room.update({
      where: { id },
      data: {
        name,
        fixed,
        building,
        capacity,
        class_id,
      },
    });

    return room;
  }

  async delete(id: string) {
    const room = await prismaClient.room.delete({
      where: { id },
    });

    return room;
  }
}
