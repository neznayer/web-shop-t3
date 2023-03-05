import { TRPCError } from "@trpc/server";
import { z } from "zod";

const UpdateProductModel = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
  }),
});
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productrRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findFirst({ where: { id: input.id } });
    }),
  deleteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "admin")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Only admins can delete the product",
        });

      return ctx.prisma.product.delete({ where: { id: input.id } });
    }),

  updateById: protectedProcedure
    .input(UpdateProductModel)
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new Error("you must be an admin");
      }

      return ctx.prisma.product.update({
        where: { id: input.id },
        data: input.data,
      });
    }),
});
