import z from 'zod'

export const commentSchema = z.object({
  body: z.string(),
})

export type CommentSchemaProps = z.infer<typeof commentSchema>
