import prismaClient from "../../prisma";

interface CourseRequest {
  name: string;
  shift: string;
  grouping: number;
}

export default class CourseService {
  async create({ name, shift, grouping }: CourseRequest) {
    const course = await prismaClient.course.create({
      data: {
        name,
        shift,
        grouping,
      },
    });

    return course;
  }

  async read() {
    const courses = await prismaClient.course.findMany();

    return courses;
  }

  async update({ name, shift, grouping }: CourseRequest, id: string) {
    const course = await prismaClient.course.update({
      where: { id },
      data: {
        name,
        shift,
        grouping,
      },
    });

    return course;
  }

  async delete(id: string) {
    const course = await prismaClient.course.delete({
      where: { id },
    });

    return course;
  }
}
