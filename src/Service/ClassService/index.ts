import prismaClient from "../../prisma";

interface ClassRequest {
  name: string;
  period: number;
  num_students: number;
  course_id: string;
}

export default class ClassService {
  async create({ name, period, num_students, course_id }: ClassRequest) {
    const classes = await prismaClient.class.create({
      data: {
        name,
        period,
        num_students,
        course_id,
      },
    });

    return classes;
  }

  async read() {
    const classes = await prismaClient.class.findMany({
      include: {
        course: true,
      },
    });

    return classes;
  }

  async update(
    { name, period, num_students, course_id }: ClassRequest,
    id: string
  ) {
    const classes = await prismaClient.class.update({
      where: { id },
      data: {
        name,
        period,
        num_students,
        course_id,
      },
    });

    return classes;
  }

  async delete(id: string) {
    const classes = await prismaClient.class.delete({
      where: { id },
    });

    return classes;
  }
}
