import prismaClient from "../../prisma";

interface TurmaRequest {
  periodo: number;
  qtalunos: number;
  curso_id: string;
}

export default class TurmaService {
  async create({ periodo, qtalunos, curso_id }: TurmaRequest) {
    const turma = await prismaClient.turma.create({
      data: {
        periodo,
        qtalunos,
        curso_id,
      },
    });

    return turma;
  }

  async read() {
    const turmas = await prismaClient.turma.findMany({
      include: {
        curso: true,
      },
    });

    return turmas;
  }

  async update({ periodo, qtalunos, curso_id }: TurmaRequest, id: string) {
    const turma = await prismaClient.turma.update({
      where: {
        id,
      },
      data: {
        periodo,
        qtalunos,
        curso_id,
      },
    });

    return turma;
  }

  async delete(id: string) {
    const turma = await prismaClient.turma.delete({
      where: {
        id,
      },
    });

    return turma;
  }
}
