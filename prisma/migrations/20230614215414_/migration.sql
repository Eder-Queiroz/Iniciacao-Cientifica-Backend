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
    "curso" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,
    "qtaulas" INTEGER NOT NULL,
    "professor" TEXT NOT NULL,

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
    "professor" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,

    CONSTRAINT "restricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turma" (
    "id" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,
    "qtalunos" INTEGER NOT NULL,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);
