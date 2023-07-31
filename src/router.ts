import { Router, Request, Response } from "express";
import TeacherController from "./Controller/TeacherController";

const router = Router();

// -- ROUTES PROFESSOR --
router.post("/teacher", new TeacherController().create);
router.get("/teacher", new TeacherController().read);
router.put("/teacher/:id", new TeacherController().update);
router.delete("/teacher/:id", new TeacherController().delete);

export { router };
