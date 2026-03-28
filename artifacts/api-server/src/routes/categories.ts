import { Router, type IRouter } from "express";
import { db, categoriesTable, productsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const categories = await db
      .select({
        id: categoriesTable.id,
        name: categoriesTable.name,
        nameAr: categoriesTable.nameAr,
        nameFr: categoriesTable.nameFr,
        description: categoriesTable.description,
        descriptionAr: categoriesTable.descriptionAr,
        descriptionFr: categoriesTable.descriptionFr,
        slug: categoriesTable.slug,
        icon: categoriesTable.icon,
        image: categoriesTable.image,
        sortOrder: categoriesTable.sortOrder,
      })
      .from(categoriesTable)
      .orderBy(categoriesTable.sortOrder);

    const counts = await db
      .select({
        categoryId: productsTable.categoryId,
        count: sql<number>`count(*)`,
      })
      .from(productsTable)
      .groupBy(productsTable.categoryId);

    const countMap = Object.fromEntries(counts.map(c => [c.categoryId, Number(c.count)]));

    const result = categories.map(c => ({
      ...c,
      productCount: countMap[c.id] ?? 0,
    }));

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to list categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    const [countRow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productsTable)
      .where(eq(productsTable.categoryId, id));

    res.json({ ...category, productCount: Number(countRow?.count ?? 0) });
  } catch (err) {
    req.log.error({ err }, "Failed to get category");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
