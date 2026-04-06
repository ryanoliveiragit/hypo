import {
  pgTable,
  text,
  integer,
  bigint,
  timestamp,
  boolean,
  index,
  pgTableCreator,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const pgTableAuto = pgTableCreator(() => '');

// ── Invite Codes ───────────────────────────────────────────────
export const inviteCodes = pgTable('invite_codes', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  code: text('code').notNull().unique(),
  usedBy: text('used_by'),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ── Users ──────────────────────────────────────────────────────
export const users = pgTable('users', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  username: text('username').notNull().unique(),
  displayName: text('display_name').notNull(),
  passwordHash: text('password_hash').notNull(),
  inviteCodeId: text('invite_code_id').references(() => inviteCodes.id),
  sessionToken: text('session_token'),
  isPremium: boolean('is_premium').default(false).notNull(),
  usernameChangeAt: timestamp('username_change_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ── Profiles ───────────────────────────────────────────────────
export const profiles = pgTable('profiles', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bio: text('bio').default('').notNull(),
  layout: text('layout').default('centered').notNull(),
  effect: text('effect').default('gradient').notNull(),
  font: text('font').default('inter').notNull(),
  accentColor: text('accent_color').default('#cc1111').notNull(),
  bgPreset: text('bg_preset').default('none').notNull(),
  clan: text('clan'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ── Links ──────────────────────────────────────────────────────
export const links = pgTable('links', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  url: text('url').notNull(),
  icon: text('icon').default('link').notNull(),
  order: integer('order').default(0).notNull(),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ── Images ─────────────────────────────────────────────────────
export const images = pgTable('images', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(),
  fileUrl: text('file_url').notNull(),
  fileSize: integer('file_size').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ── Views / Analytics ─────────────────────────────────────────
export const views = pgTable('views', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  timestamp: bigint('timestamp', { mode: 'number' }).notNull(),
  count: integer('count').default(1).notNull(),
}, (t) => [
  index('views_user_ts_idx').on(t.userId, t.timestamp),
]);

// ── Relations ─────────────────────────────────────────────────
import { relations } from 'drizzle-orm';

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  links: many(links),
  images: many(images),
  inviteCode: one(inviteCodes, { fields: [users.inviteCodeId], references: [inviteCodes.id] }),
}));

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));

export const linkRelations = relations(links, ({ one }) => ({
  user: one(users, { fields: [links.userId], references: [users.id] }),
}));

export const imageRelations = relations(images, ({ one }) => ({
  user: one(users, { fields: [images.userId], references: [users.id] }),
}));

export const viewsRelations = relations(views, ({ one }) => ({
  user: one(users, { fields: [views.userId], references: [users.id] }),
}));

// Type exports
export type InsertView = typeof views.$inferInsert;
export type SelectView = typeof views.$inferSelect;
export type InsertImage = typeof images.$inferInsert;
export type SelectImage = typeof images.$inferSelect;
export type InsertLink = typeof links.$inferInsert;
export type SelectLink = typeof links.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertInvite = typeof inviteCodes.$inferInsert;
export type SelectInvite = typeof inviteCodes.$inferSelect;
