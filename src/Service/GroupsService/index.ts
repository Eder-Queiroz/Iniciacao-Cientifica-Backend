import prismaClient from "../../prisma";

interface GroupsRequest {
  group1: string;
  group2: string;
  group3?: string;
  group4?: string;
  class_id: string;
}

export default class GroupService {
  async create({ group1, group2, group3, group4, class_id }: GroupsRequest) {
    const group = await prismaClient.groups.create({
      data: {
        group1,
        group2,
        group3,
        group4,
        class_id,
      },
    });

    return group;
  }

  async read() {
    const groups = await prismaClient.groups.findMany({
      include: {
        class: true,
      },
    });

    return groups;
  }

  async update(
    { group1, group2, group3, group4, class_id }: GroupsRequest,
    id: string
  ) {
    const group = await prismaClient.groups.update({
      where: { id },
      data: {
        group1,
        group2,
        group3,
        group4,
        class_id,
      },
    });

    return group;
  }

  async delete(id: string) {
    const group = await prismaClient.groups.delete({
      where: { id },
    });

    return group;
  }
}
