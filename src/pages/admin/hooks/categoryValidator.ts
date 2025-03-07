import { z } from 'zod';

export const categorySchema = z.object({
    name: z.string().min(1, 'Category name is required'),
    addedById: z.string().min(1),
});

export type CategorySchema = z.infer<typeof categorySchema>;
