// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { Context } from 'koa';

const prisma = new PrismaClient();

export const prismaHelper = (ctx: Context) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, args, query, model }) {
          const operationsGetWithWhere = [
            'findUnique',
            'findFirst',
            'findMany',
          ];

          if (operationsGetWithWhere.includes(operation)) {
            args.where = {
              ...args.where,
              seller_id: ctx.auth.seller_id,
            };
          }

          if (operation === 'create' || operation === 'createMany') {
            if (args.data) {
              args.data = Array.isArray(args.data)
                ? args.data.map((item) => ({
                    ...item,
                    seller_id: ctx.auth.seller_id,
                  }))
                : {
                    ...args.data,
                    seller_id: ctx.auth.seller_id,
                  };
            }
          }

          if (operation === 'findMany') {
            let { page, pageSize, createdAt, updatedAt, ...dynamicFilters } =
              ctx.query || {};

            page = Array.isArray(page) ? page[0] : page;
            pageSize = Array.isArray(pageSize) ? pageSize[0] : pageSize;
            createdAt = Array.isArray(createdAt) ? createdAt[0] : createdAt;
            updatedAt = Array.isArray(updatedAt) ? updatedAt[0] : updatedAt;

            if (createdAt || updatedAt) {
              args.where = {
                ...args.where,
                AND: [
                  createdAt
                    ? { created_at: { gt: new Date(createdAt) } }
                    : undefined,
                  updatedAt
                    ? { updated_at: { gt: new Date(updatedAt) } }
                    : undefined,
                ].filter(Boolean),
              };
            }

            Object.entries(dynamicFilters).forEach(([key, value]) => {
              if (typeof value === 'string') {
                args.where = {
                  ...args.where,
                  [key]: { contains: value },
                };
              }
            });

            const take = pageSize ? parseInt(pageSize, 10) : 10;
            const skip = page ? (parseInt(page, 10) - 1) * take : 0;

            args.take = take;
            args.skip = skip;

            const totalItems = await prisma[model].count({
              where: args.where || {},
            });

            const totalPages = Math.ceil(totalItems / take);

            const data = await query(args);

            return {
              data,
              meta: {
                currentPage: page ? parseInt(page, 10) : 1,
                pageSize: take,
                totalItems,
                totalPages,
              },
            };
          }

          return query(args);
        },
      },
    },
  });
};

export default prismaHelper;
