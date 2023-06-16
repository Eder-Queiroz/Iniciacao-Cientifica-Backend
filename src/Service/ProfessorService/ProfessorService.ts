import prismaClient from "../../prisma";

interface ProfessorRequest {
  nome: string;
  email: string;
}

export default class ProfessorService {
  async create({ nome, email }: ProfessorRequest) {
    const professor = await prismaClient.professor.create({
      data: {
        nome,
        email,
      },
    });

    return professor;
  }

  async read() {
    const professores = await prismaClient.professor.findMany();

    return professores;
  }

  async update({ nome, email }: ProfessorRequest, id: string) {
    const professor = await prismaClient.professor.update({
      where: { id },
      data: {
        nome,
        email,
      },
    });

    return professor;
  }

  async delete(id: string) {
    const professor = await prismaClient.professor.delete({
      where: { id },
    });

    return professor;
  }
}
