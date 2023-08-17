import prismaClient from "../../prisma";

interface RestrictionsRequest {
  period: string;
  day: number;
  teacher_id: string;
}

export default class RestrictionsService {
  async create({ period, day, teacher_id }: RestrictionsRequest) {
    const restrictions = await prismaClient.restriction.create({
      data: {
        period,
        day,
        teacher_id,
      },
    });

    return restrictions;
  }

  async read() {
    const restrictions = await prismaClient.restriction.findMany({
      include: {
        teacher: true,
      },
    });

    return restrictions;
  }

  async update({ period, day, teacher_id }: RestrictionsRequest, id: string) {
    const restrictions = await prismaClient.restriction.update({
      where: { id },
      data: {
        period,
        day,
        teacher_id,
      },
    });

    return restrictions;
  }

  async delete(id: string) {
    const restrictions = await prismaClient.restriction.delete({
      where: { id },
    });

    return restrictions;
  }
}
