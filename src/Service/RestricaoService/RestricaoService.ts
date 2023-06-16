import prismaClient from "../../prisma";

interface RestricaoRequest {
  professor_id: string;
  dia: string;
  periodo: number;
}

export default class RestricaoService {
  async create({ professor_id, dia, periodo }: RestricaoRequest) {
    const restricao = await prismaClient.restricao.create({
      data: {
        professor_id,
        dia,
        periodo,
      },
    });

    return restricao;
  }

  async read() {
    const restricoes = await prismaClient.restricao.findMany({
      include: {
        professor: true,
      },
    });

    return restricoes;
  }

  async update({ professor_id, dia, periodo }: RestricaoRequest, id: string) {
    const restricao = await prismaClient.restricao.update({
      where: {
        id,
      },
      data: {
        professor_id,
        dia,
        periodo,
      },
    });

    return restricao;
  }

  async delete(id: string) {
    const restricao = await prismaClient.restricao.delete({
      where: {
        id,
      },
    });

    return restricao;
  }
}
