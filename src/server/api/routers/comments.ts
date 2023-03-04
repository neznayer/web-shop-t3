import { TRPCError } from "@trpc/server";
import { z } from "zod";

const CommentModel = z.object({
  comment: z.string().optional(),
  rating: z.number().optional(),
});

const UpdateCommentModel = z.object({
  id: z.string(),
  data: CommentModel,
});

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  getCommentsForProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({ where: { productId: input.id } });
    }),

  createComment: protectedProcedure
    .input(CommentModel)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: { ...input, userId: ctx.session.user.id },
      });
    }),
  deleteComment: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.findFirst({
        where: { id: input.id },
      });
      if (
        comment?.userId !== ctx.session.user.id &&
        ctx.session.user.role !== "admin"
      ) {
        throw new TRPCError({
          message:
            "You can only delete your own comments, or you must be an admin",
          code: "UNAUTHORIZED",
        });
      }
      return ctx.prisma.comment.delete({ where: { id: input.id } });
    }),
  updateComment: protectedProcedure
    .input(UpdateCommentModel)
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.findFirst({
        where: { id: input.id },
      });
      if (comment?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          message: "You can only edit your own comments",
          code: "UNAUTHORIZED",
        });
      }
      return ctx.prisma.comment.update({
        where: { id: input.id },
        data: input.data,
      });
    }),
});
