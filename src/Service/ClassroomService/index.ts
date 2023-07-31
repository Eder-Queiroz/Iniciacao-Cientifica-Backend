import prismaClient from "../../prisma";

interface ClassroomRequest {
  amount: number;
  duration: number;
  teacher_id: string;
  discipline_id: string;
  room_id: string;
  course_id: string;
  class_id: string;
}

export default class classroomService {
  async create({
    amount,
    duration,
    teacher_id,
    discipline_id,
    room_id,
    course_id,
    class_id,
  }: ClassroomRequest) {
    const classroom = await prismaClient.classroom.create({
      data: {
        amount,
        duration,
        teacher_id,
        discipline_id,
        room_id,
        course_id,
        class_id,
      },
    });

    return classroom;
  }

  async read() {
    const classrooms = await prismaClient.classroom.findMany();

    return classrooms;
  }

  async update(
    {
      amount,
      duration,
      teacher_id,
      discipline_id,
      room_id,
      course_id,
      class_id,
    }: ClassroomRequest,
    id: string
  ) {
    const classroom = await prismaClient.classroom.update({
      where: { id },
      data: {
        amount,
        duration,
        teacher_id,
        discipline_id,
        room_id,
        course_id,
        class_id,
      },
    });

    return classroom;
  }

  async delete(id: string) {
    const classroom = await prismaClient.classroom.delete({
      where: { id },
    });

    return classroom;
  }
}
