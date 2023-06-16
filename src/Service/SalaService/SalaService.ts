import prismaClient from "../../prisma";

interface SalaRequest {
  nome: string;
  capacidade: number;
  qtdpcs: number;
}

export default class SalaService {
  async create({ nome, capacidade, qtdpcs }: SalaRequest) {
    const sala = await prismaClient.sala.create({
      data: {
        nome,
        capacidade,
        qtdpcs,
      },
    });

    return sala;
  }

  async read() {
    const salas = await prismaClient.sala.findMany();

    return salas;
  }

  async update({ nome, capacidade, qtdpcs }: SalaRequest, id: string) {
    const sala = await prismaClient.sala.update({
      where: {
        id,
      },
      data: {
        nome,
        capacidade,
        qtdpcs,
      },
    });

    return sala;
  }

  async delete(id: string) {
    const sala = await prismaClient.sala.delete({
      where: {
        id,
      },
    });

    return sala;
  }
}
