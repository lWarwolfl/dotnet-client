import z from 'zod'

export const activityCreateSchema = z.object({
  title: z.string(),
  date: z.date(),
  description: z.string(),
  category: z.string(),
  city: z.string(),
  venue: z.string(),
})

export const activityUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.date(),
  description: z.string(),
  category: z.string(),
  city: z.string(),
  venue: z.string(),
})

export type ActivityCreateSchemaProps = z.infer<typeof activityCreateSchema>
export type ActivityUpdateSchemaProps = z.infer<typeof activityUpdateSchema>
