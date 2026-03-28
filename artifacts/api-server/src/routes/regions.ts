import { Router, type IRouter } from "express";
import { db, regionsTable, citiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const regions = await db.select().from(regionsTable).orderBy(regionsTable.code);
    res.json(regions);
  } catch (err) {
    req.log.error({ err }, "Failed to list regions");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/cities", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const cities = await db
      .select()
      .from(citiesTable)
      .where(eq(citiesTable.regionId, id))
      .orderBy(citiesTable.name);

    res.json(cities);
  } catch (err) {
    req.log.error({ err }, "Failed to list cities");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
