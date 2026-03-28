import { Router, type IRouter } from "express";
import { db, productsTable, categoriesTable } from "@workspace/db";
import { eq, and, gte, lte, like, desc, asc, sql, ne } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const {
      categoryId,
      search,
      minPrice,
      maxPrice,
      inStock,
      sort = "newest",
      page = "1",
      limit = "20",
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];

    if (categoryId) {
      conditions.push(eq(productsTable.categoryId, parseInt(categoryId)));
    }
    if (search) {
      conditions.push(
        sql`(${productsTable.name} ilike ${`%${search}%`} or ${productsTable.nameAr} ilike ${`%${search}%`} or ${productsTable.nameFr} ilike ${`%${search}%`})`
      );
    }
    if (minPrice) {
      conditions.push(gte(productsTable.price, minPrice));
    }
    if (maxPrice) {
      conditions.push(lte(productsTable.price, maxPrice));
    }
    if (inStock === "true") {
      conditions.push(eq(productsTable.inStock, true));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    switch (sort) {
      case "price_asc":
        orderBy = asc(productsTable.price);
        break;
      case "price_desc":
        orderBy = desc(productsTable.price);
        break;
      case "popular":
        orderBy = desc(productsTable.reviewCount);
        break;
      default:
        orderBy = desc(productsTable.id);
    }

    const [{ total }] = await db
      .select({ total: sql<number>`count(*)` })
      .from(productsTable)
      .where(where);

    const products = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        nameAr: productsTable.nameAr,
        nameFr: productsTable.nameFr,
        slug: productsTable.slug,
        price: productsTable.price,
        originalPrice: productsTable.originalPrice,
        discount: productsTable.discount,
        image: productsTable.image,
        images: productsTable.images,
        inStock: productsTable.inStock,
        rating: productsTable.rating,
        reviewCount: productsTable.reviewCount,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        categoryNameAr: categoriesTable.nameAr,
        categoryNameFr: categoriesTable.nameFr,
        featured: productsTable.featured,
      })
      .from(productsTable)
      .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
      .where(where)
      .orderBy(orderBy)
      .limit(limitNum)
      .offset(offset);

    const totalNum = Number(total);

    res.json({
      products: products.map(p => ({
        ...p,
        price: Number(p.price),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
        rating: Number(p.rating),
        isFavorite: false,
      })),
      total: totalNum,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalNum / limitNum),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/related", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const [product] = await db
      .select({ categoryId: productsTable.categoryId })
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const related = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        nameAr: productsTable.nameAr,
        nameFr: productsTable.nameFr,
        slug: productsTable.slug,
        price: productsTable.price,
        originalPrice: productsTable.originalPrice,
        discount: productsTable.discount,
        image: productsTable.image,
        images: productsTable.images,
        inStock: productsTable.inStock,
        rating: productsTable.rating,
        reviewCount: productsTable.reviewCount,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        categoryNameAr: categoriesTable.nameAr,
        categoryNameFr: categoriesTable.nameFr,
      })
      .from(productsTable)
      .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
      .where(and(eq(productsTable.categoryId, product.categoryId), ne(productsTable.id, id)))
      .limit(6);

    res.json(related.map(p => ({
      ...p,
      price: Number(p.price),
      originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
      rating: Number(p.rating),
      isFavorite: false,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to get related products");
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

    const [product] = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        nameAr: productsTable.nameAr,
        nameFr: productsTable.nameFr,
        description: productsTable.description,
        descriptionAr: productsTable.descriptionAr,
        descriptionFr: productsTable.descriptionFr,
        slug: productsTable.slug,
        price: productsTable.price,
        originalPrice: productsTable.originalPrice,
        discount: productsTable.discount,
        image: productsTable.image,
        images: productsTable.images,
        inStock: productsTable.inStock,
        stockQty: productsTable.stockQty,
        rating: productsTable.rating,
        reviewCount: productsTable.reviewCount,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        categoryNameAr: categoriesTable.nameAr,
        categoryNameFr: categoriesTable.nameFr,
        brand: productsTable.brand,
        sku: productsTable.sku,
        weight: productsTable.weight,
        dimensions: productsTable.dimensions,
        material: productsTable.material,
        color: productsTable.color,
        specifications: productsTable.specifications,
        featured: productsTable.featured,
      })
      .from(productsTable)
      .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
      .where(eq(productsTable.id, id));

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({
      ...product,
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      rating: Number(product.rating),
      isFavorite: false,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get product");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
