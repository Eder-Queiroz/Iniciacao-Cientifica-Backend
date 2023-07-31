import prismaClient from "../../prisma";

interface DisciplineRequest {
  name: string;
  period: number;
}

export default class DisciplineService {
  async create({ name, period }: DisciplineRequest) {
    const discipline = await prismaClient.discipline.create({
      data: {
        name,
        period,
      },
    });

    return discipline;
  }

  async read() {
    const disciplines = await prismaClient.discipline.findMany();

    return disciplines;
  }

  async update({ name, period }: DisciplineRequest, id: string) {
    const discipline = await prismaClient.discipline.update({
      where: { id },
      data: {
        name,
        period,
      },
    });

    return discipline;
  }

  async delete(id: string) {
    const discipline = await prismaClient.discipline.delete({
      where: { id },
    });

    return discipline;
  }
}
