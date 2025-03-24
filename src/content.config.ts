import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

import { parse as parseCsv } from "csv-parse/sync";

const localDistance = defineCollection({
    loader: file("src/assets/calc.csv", {
        parser: (text) => parseCsv(text, {
            columns: true,
            skip_empty_lines: true,

        }).map((row: any) => ({
            id: row.city,
            ...row,
            dist: parseFloat(row.dist),
        }))
    }),
    schema: z.object({
        local: z.string(),
        city: z.string(),
        dist: z.number()
    })

})

export const collections = { localDistance };