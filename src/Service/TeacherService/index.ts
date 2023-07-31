import prismaClient from "../../prisma";

interface ProfessorRequest {
  name: string;
  email: string;
}

export default class TeacherService {
  async create({ name, email }: ProfessorRequest) {
    const professor = await prismaClient.teacher.create({
      data: {
        name,
        email,
      },
    });

    return professor;
  }

  async read() {
    const professores = await prismaClient.teacher.findMany();

    return professores;
  }

  async update({ name, email }: ProfessorRequest, id: string) {
    const professor = await prismaClient.teacher.update({
      where: { id },
      data: {
        name,
        email,
      },
    });

    return professor;
  }

  async delete(id: string) {
    const professor = await prismaClient.teacher.delete({
      where: { id },
    });

    return professor;
  }
}
