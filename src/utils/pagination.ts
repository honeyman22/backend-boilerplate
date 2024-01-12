import { number } from "zod";
import HttpException from "./HttpException";

export const pagination = (data: any) => {
  const limit = parseInt(data?.limit ?? "10");
  const page = parseInt(data?.page ?? "1");

  if (!limit) throw new HttpException("Invalid limit sent.", 400);
  if (!page) throw new HttpException("Invalid page sent.", 400);

  const skip = limit * (page - 1);

  return { limit, skip, page };
};

interface pageDocsInterface {
  limit: number;
  count: number;
  page: number;
}

export const pagedocs = (data: pageDocsInterface) => {
  const totalPage = Math.ceil(data.count / data.limit);

  return {
    total: {
      page: totalPage,
      limit: data.count,
    },
    next: {
      page: data?.page + 1 > totalPage ? null : data.page + 1,
      limit: data?.limit,
    },
    prev: {
      page: data?.page - 1 <= 0 ? null : data.page - 1,
      limit: data.limit,
    },
  };
};
