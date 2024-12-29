import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middelware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
.get("/", 
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string()})),
    async (c) => {
        const user = await createAdminClient();
        
    }
)
export default app;
