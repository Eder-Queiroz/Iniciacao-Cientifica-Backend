import prismaClient from "../../prisma";

interface DisciplinaRequest {
  nome: string;
  periodo: number;
  qtaulas: number;
  professor_id: string;
  curso_id: string;
}

export default class DisciplinaService {
  async create({
    nome,
    periodo,
    qtaulas,
    professor_id,
    curso_id,
  }: DisciplinaRequest) {
    const disciplina = await prismaClient.disciplina.create({
      data: {
        nome,
        periodo,
        qtaulas,
        professor_id,
        curso_id,
      },
    });

    return disciplina;
  }

  async read() {
    const disciplinas = await prismaClient.disciplina.findMany({
      include: {
        professor: true,
        curso: true,
      },
    });

    return disciplinas;
  }

  async update(
    { nome, periodo, qtaulas, professor_id, curso_id }: DisciplinaRequest,
    id: string
  ) {
    const disciplina = await prismaClient.disciplina.update({
      where: { id },
      data: {
        nome,
        periodo,
        qtaulas,
        professor_id,
        curso_id,
      },
    });

    return disciplina;
  }

  async delete(id: string) {
    const disciplina = await prismaClient.disciplina.delete({
      where: { id },
    });

    return disciplina;
  }
}
