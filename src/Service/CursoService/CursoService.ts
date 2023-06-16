import prismaClient from "../../prisma";

interface CursoRequest {
  nome: string;
  turno: string;
  agrupamento: number;
}

export default class CursoService {
  async create({ nome, turno, agrupamento }: CursoRequest) {
    const curso = await prismaClient.curso.create({
      data: {
        nome,
        turno,
        agrupamento,
      },
    });

    return curso;
  }

  async read() {
    const curso = await prismaClient.curso.findMany();

    return curso;
  }

  async update({ nome, turno, agrupamento }: CursoRequest, id: string) {
    const curso = await prismaClient.curso.update({
      where: {
        id,
      },
      data: {
        nome,
        turno,
        agrupamento,
      },
    });

    return curso;
  }

  async delete(id: string) {
    const curso = await prismaClient.curso.delete({
      where: {
        id,
      },
    });

    return curso;
  }
}
