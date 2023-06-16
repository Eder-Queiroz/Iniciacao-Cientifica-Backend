/*
  Warnings:

  - You are about to drop the column `curso` on the `disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `professor` on the `disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `professor` on the `restricao` table. All the data in the column will be lost.
  - You are about to drop the column `curso` on the `turma` table. All the data in the column will be lost.
  - Added the required column `curso_id` to the `disciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professor_id` to the `disciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professor_id` to the `restricao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curso_id` to the `turma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "disciplina" DROP COLUMN "curso",
DROP COLUMN "professor",
ADD COLUMN     "curso_id" TEXT NOT NULL,
ADD COLUMN     "professor_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "restricao" DROP COLUMN "professor",
ADD COLUMN     "professor_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "turma" DROP COLUMN "curso",
ADD COLUMN     "curso_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "disciplina" ADD CONSTRAINT "disciplina_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplina" ADD CONSTRAINT "disciplina_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restricao" ADD CONSTRAINT "restricao_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turma" ADD CONSTRAINT "turma_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
