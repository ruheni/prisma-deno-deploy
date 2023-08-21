import { serve } from "https://deno.land/std@0.197.0/http/server.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const { PrismaClient } = require("./generated/client/index.js");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env["DATABASE_URL"]
    }
  }
})

const handler = async (_request: Request): Promise<Response> => {
  const dinosaurs = await prisma.dinosaur.findMany()
  console.log({ dinosaurs })

  return new Response(JSON.stringify(dinosaurs), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};

serve(handler)