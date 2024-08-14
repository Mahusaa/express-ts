import { sql } from "drizzle-orm";
import { pgTableCreator, varchar, text, timestamp, decimal, integer } from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `crud-ts_${name}`);


export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  address: text("address"),
  phone_number: varchar("phone_number", { length: 15 }),
  created_at: timestamp("created_at", { mode: "date", withTimezone: true }),
  update_at: timestamp("update_at", { mode: "date", withTimezone: true }),
});


export const products = createTable("product", {
  id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  price: decimal("price", { precision: 12, scale: 0 }).notNull(),
  stock_quantity: integer("stock_quantity"),
  category_id: varchar("category_id", { length: 255 }),
  created_at: timestamp("created_at", { mode: "date", withTimezone: true }),
  update_at: timestamp("update_at", { mode: "date", withTimezone: true }),
});


export const categories = createTable("category", {
  id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }),
  description: text("description"),
});


export const orders = createTable("order", {
  id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
  user_id: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  total_amount: decimal("total_amount", { precision: 12, scale: 0 }),
  status: varchar("status", { length: 50 }),
  created_at: timestamp("created_at", { mode: "date", withTimezone: true }),
  update_at: timestamp("update_at", { mode: "date", withTimezone: true }),
});

export const orderItems = createTable("orderItems", {
  id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
  order_id: varchar("order_id", { length: 255 }).notNull().references(() => orders.id),
  product_id: varchar("product_id", { length: 255 }).notNull().references(() => products.id),
  quantity: integer("quantity"),
  price: decimal("price", { precision: 12, scale: 0 }),
});

export const payments = createTable("payment", {
  id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
  order_id: varchar("order_id", { length: 255 }).notNull().references(() => orders.id),
  payment_method: varchar("payment_method", { length: 50 }),
  amount: decimal("amount", { precision: 12, scale: 0 }),
  payment_status: varchar("payment_status", { length: 50 }),
  created_at: timestamp("created_at", { mode: "date", withTimezone: true }),
});

export const reviews = createTable("review", {
  id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
  user_id: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  product_id: varchar("product_id", { length: 255 }).notNull().references(() => products.id),
  rating: integer("rating"),
  comment: text("comment"),
  created_at: timestamp("created_at", { mode: "date", withTimezone: true }),
  update_at: timestamp("update_at", { mode: "date", withTimezone: true }),
});


export const cartItems = createTable("cartItem", {
  id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
  user_id: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  product_id: varchar("product_id", { length: 255 }).notNull().references(() => products.id),
  quantity: integer("quantity"),
  created_at: timestamp("created_at", { mode: "date", withTimezone: true }),
  update_at: timestamp("update_at", { mode: "date", withTimezone: true }),
})






