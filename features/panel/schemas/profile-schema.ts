import z from 'zod'

const MAX_SIZE_MB = 2

export const profileImageSchema = z.object({
  image: z
    .custom<File>()
    .optional()
    .refine((file) => !file || file.size <= MAX_SIZE_MB * 1024 * 1024, {
      message: `The file must be a maximum of ${MAX_SIZE_MB}MB.`,
    })
    .refine(
      (file) => !file || ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type),
      {
        message: 'Only image files (JPEG, JPG, PNG, GIF) are allowed to be sent.',
      }
    ),
})

export type ProfileImageSchemaProps = z.infer<typeof profileImageSchema>
