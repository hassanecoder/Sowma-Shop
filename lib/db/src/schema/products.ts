import { pgTable, serial, text, integer, numeric, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { categoriesTable } from "./categories";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  nameFr: text("name_fr").notNull(),
  description: text("description"),
  descriptionAr: text("description_ar"),
  descriptionFr: text("description_fr"),
  slug: text("slug").notNull().unique(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 12, scale: 2 }),
  discount: integer("discount").default(0),
  image: text("image"),
  images: jsonb("images").$type<string[]>().default([]),
  inStock: boolean("in_stock").default(true).notNull(),
  stockQty: integer("stock_qty").default(0),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  categoryId: integer("category_id").notNull().references(() => categoriesTable.id),
  brand: text("brand"),
  sku: text("sku"),
  weight: text("weight"),
  dimensions: text("dimensions"),
  material: text("material"),
  color: text("color"),
  specifications: jsonb("specifications").$type<Array<{ key: string; keyAr: string; value: string; valueAr: string }>>().default([]),
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(0),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
