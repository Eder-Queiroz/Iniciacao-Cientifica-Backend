import { Router, Request, Response } from "express";
import CursoController from "./Controller/CursoController/CursoController";
import DisciplinaController from "./Controller/DisciplinaController/DisciplinaController";
import ProfessorController from "./Controller/ProfessorController/ProfessorController";
import RestricaoController from "./Controller/RestricaoController/RestricaoController";
import SalaController from "./Controller/SalaController/SalaController";
import TurmaController from "./Controller/TurmaController/TurmaController";

const router = Router();

// -- ROUTES CURSO --
router.post("/curso", new CursoController().create);
router.get("/curso", new CursoController().read);
router.put("/curso/:id", new CursoController().update);
router.delete("/curso/:id", new CursoController().delete);

// -- ROUTES DISCIPLINA --
router.post("/disciplina", new DisciplinaController().create);
router.get("/disciplina", new DisciplinaController().read);
router.put("/disciplina/:id", new DisciplinaController().update);
router.delete("/disciplina/:id", new DisciplinaController().delete);

// -- ROUTES PROFESSOR --
router.post("/professor", new ProfessorController().create);
router.get("/professor", new ProfessorController().read);
router.put("/professor/:id", new ProfessorController().update);
router.delete("/professor/:id", new ProfessorController().delete);

// -- ROUTES RESTRICAO --
router.post("/restricao", new RestricaoController().create);
router.get("/restricao", new RestricaoController().read);
router.put("/restricao/:id", new RestricaoController().update);
router.delete("/restricao/:id", new RestricaoController().delete);

// -- ROUTES SALA --
router.post("/sala", new SalaController().create);
router.get("/sala", new SalaController().read);
router.put("/sala/:id", new SalaController().update);
router.delete("/sala/:id", new SalaController().delete);

// -- ROUTES TURMA --
router.post("/turma", new TurmaController().create);
router.get("/turma", new TurmaController().read);
router.put("/turma/:id", new TurmaController().update);
router.delete("/turma/:id", new TurmaController().delete);

export { router };
