import { Router, Request, Response } from "express";
import TeacherController from "./Controller/TeacherController";
import RestrictionsController from "./Controller/RestrictionsController";
import DisciplineController from "./Controller/DisciplineController";
import ClassController from "./Controller/ClassController";
import GroupController from "./Controller/GroupsController";
import CourseController from "./Controller/CourseController";
import RoomController from "./Controller/RoomController";
import ClassroomController from "./Controller/ClassroomController";

const router = Router();

// -- ROUTES PROFESSOR --
router.post("/teacher", new TeacherController().create);
router.get("/teacher", new TeacherController().read);
router.put("/teacher/:id", new TeacherController().update);
router.delete("/teacher/:id", new TeacherController().delete);

// -- ROUTES RESTRICTIONS --
router.post("/restriction", new RestrictionsController().create);
router.get("/restriction", new RestrictionsController().read);
router.put("/restriction/:id", new RestrictionsController().update);
router.delete("/restriction/:id", new RestrictionsController().delete);

// -- ROUTES DISCIPLINE --
router.post("/discipline", new DisciplineController().create);
router.get("/discipline", new DisciplineController().read);
router.put("/discipline/:id", new DisciplineController().update);
router.delete("/discipline/:id", new DisciplineController().delete);

// -- ROUTES CLASS --
router.post("/class", new ClassController().create);
router.get("/class", new ClassController().read);
router.put("/class/:id", new ClassController().update);
router.delete("/class/:id", new ClassController().delete);

// -- ROUTES GROUP --
router.post("/group", new GroupController().create);
router.get("/group", new GroupController().read);
router.put("/group/:id", new GroupController().update);
router.delete("/group/:id", new GroupController().delete);

// -- ROUTES COURSE --
router.post("/course", new CourseController().create);
router.get("/course", new CourseController().read);
router.put("/course/:id", new CourseController().update);
router.delete("/course/:id", new CourseController().delete);

// -- ROUTES ROOM --
router.post("/room", new RoomController().create);
router.get("/room", new RoomController().read);
router.put("/room/:id", new RoomController().update);
router.delete("/room/:id", new RoomController().delete);

// -- ROUTES CLASSROOM --
router.post("/classroom", new ClassroomController().create);
router.get("/classroom", new ClassroomController().read);
router.put("/classroom/:id", new ClassroomController().update);
router.delete("/classroom/:id", new ClassroomController().delete);

export { router };
