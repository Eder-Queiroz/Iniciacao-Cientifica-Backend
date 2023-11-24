-- CreateTable
CREATE TABLE "curso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "agrupamento" INTEGER NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,
    "qtaulas" INTEGER NOT NULL,
    "professor_id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,

    CONSTRAINT "disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restricao" (
    "id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "dia" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,

    CONSTRAINT "restricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turma" (
    "id" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,
    "qtalunos" INTEGER NOT NULL,
    "curso_id" TEXT NOT NULL,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sala" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "qtdpcs" INTEGER NOT NULL,

    CONSTRAINT "sala_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disciplina" ADD CONSTRAINT "disciplina_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplina" ADD CONSTRAINT "disciplina_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restricao" ADD CONSTRAINT "restricao_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turma" ADD CONSTRAINT "turma_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
