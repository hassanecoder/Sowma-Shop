import { Router, type IRouter } from "express";
import { db, ordersTable, productsTable } from "@workspace/db";
import { eq, inArray } from "drizzle-orm";

const router: IRouter = Router();

router.post("/", async (req, res) => {
  try {
    const { fullName, phone, regionId, cityId, address, items, notes } = req.body;

    if (!fullName || !phone || !regionId || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (!/^[0-9+\s-]{9,15}$/.test(phone)) {
      res.status(400).json({ error: "Invalid phone number" });
      return;
    }

    const productIds = items.map((i: { productId: number }) => i.productId);
    const dbProducts = await db
      .select({ id: productsTable.id, price: productsTable.price, inStock: productsTable.inStock })
      .from(productsTable)
      .where(inArray(productsTable.id, productIds));

    const priceMap = Object.fromEntries(dbProducts.map(p => [p.id, Number(p.price)]));

    const orderItems = items.map((i: { productId: number; quantity: number; price: number }) => ({
      productId: i.productId,
      quantity: Math.max(1, i.quantity),
      price: priceMap[i.productId] ?? i.price,
    }));

    const total = orderItems.reduce((sum: number, i: { quantity: number; price: number }) => sum + i.quantity * i.price, 0);

    const orderNumber = `SWM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const [order] = await db
      .insert(ordersTable)
      .values({
        orderNumber,
        status: "pending",
        fullName,
        phone,
        regionId: parseInt(regionId),
        cityId: cityId ? parseInt(cityId) : null,
        address: address || null,
        items: orderItems,
        total: total.toFixed(2),
        notes: notes || null,
      })
      .returning();

    res.status(201).json({
      ...order,
      total: Number(order.total),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
