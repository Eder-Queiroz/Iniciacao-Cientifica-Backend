export interface ProfessorType {
  id: string;
  nome: string;
  email: string;
}

export interface CursoType {
  id: string;
  nome: string;
  turno: string;
  agrupamento: number;
}

export interface DisciplinaType {
  id: string;
  nome: string;
  periodo: number;
  qtaulas: number;
  professor_id: string;
  curso_id: string;
  professor: ProfessorType;
  curso: CursoType;
}

export interface TurmaType {
  id: string;
  periodo: number;
  qtalunos: number;
  curso_id: string;
  curso: CursoType;
}

export interface SalaType {
  id: string;
  nome: string;
  capacidade: number;
  qtdpcs: number;
}

export interface RestricaoType {
  id: string;
  professor_id: string;
  dia: number;
  periodo: string;
  professor: ProfessorType;
}
