import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull()
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull().unique(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId").notNull().references(() => user.id),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull()
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId").notNull().references(() => user.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	expiresAt: timestamp("expiresAt"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull()
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt")
});

export const offerings = pgTable("offerings", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	userId: text("userId").notNull().references(() => user.id),
	name: text("name").notNull(),
	description: text("description").notNull(),
	targetAudience: text("targetAudience"),
	valueProposition: text("valueProposition"),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});

export const prompts = pgTable("prompts", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	userId: text("userId").notNull().references(() => user.id),
	name: text("name").notNull(),
	content: text("content").notNull(),
	tone: text("tone"),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});

export const prospects = pgTable("prospects", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	userId: text("userId").notNull().references(() => user.id),
	name: text("name").notNull(),
	source: text("source").notNull(),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});

export const prospect_contexts = pgTable("prospect_contexts", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	prospectId: text("prospectId").notNull().references(() => prospects.id, { onDelete: 'cascade' }),
	unifiedContext: jsonb("unifiedContext").notNull(),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});

export const conversations = pgTable("conversations", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	userId: text("userId").notNull().references(() => user.id),
	prospectId: text("prospectId").notNull().references(() => prospects.id),
	offeringId: text("offeringId").notNull().references(() => offerings.id),
	promptId: text("promptId").references(() => prompts.id),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});

export const messages = pgTable("messages", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	conversationId: text("conversationId").notNull().references(() => conversations.id, { onDelete: 'cascade' }),
	role: text("role").notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("createdAt").defaultNow(),
});
