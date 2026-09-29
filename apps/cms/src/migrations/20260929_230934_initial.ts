import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_deliverables\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_deliverables_order_idx\` ON \`services_deliverables\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_deliverables_parent_id_idx\` ON \`services_deliverables\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_deliverables_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_deliverables\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_deliverables_locales_locale_parent_id_unique\` ON \`services_deliverables_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`anchor\` text NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_anchor_idx\` ON \`services\` (\`anchor\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`services_locales\` (
  	\`title\` text NOT NULL,
  	\`short_desc\` text NOT NULL,
  	\`long_desc\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_locales_locale_parent_id_unique\` ON \`services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	\`locale\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_texts_order_parent\` ON \`services_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_texts_locale_parent\` ON \`services_texts\` (\`locale\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`stack\` text,
  	\`year\` text,
  	\`category\` text DEFAULT 'web' NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`show_on_home\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_image_idx\` ON \`projects\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`projects_locales\` (
  	\`title\` text NOT NULL,
  	\`tag\` text NOT NULL,
  	\`short_desc\` text NOT NULL,
  	\`long_desc\` text NOT NULL,
  	\`client\` text,
  	\`result\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_locales_locale_parent_id_unique\` ON \`projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`clients\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`logo_size\` text DEFAULT 'default' NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`show_on_home\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`clients_logo_idx\` ON \`clients\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`clients_updated_at_idx\` ON \`clients\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`clients_created_at_idx\` ON \`clients\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`clients_locales\` (
  	\`sector\` text NOT NULL,
  	\`work\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clients\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`clients_locales_locale_parent_id_unique\` ON \`clients_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`show_on_home\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`jobs_updated_at_idx\` ON \`jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`jobs_created_at_idx\` ON \`jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`jobs_locales\` (
  	\`years\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`org\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`jobs_locales_locale_parent_id_unique\` ON \`jobs_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`skill_groups\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`skill_groups_updated_at_idx\` ON \`skill_groups\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`skill_groups_created_at_idx\` ON \`skill_groups\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`skill_groups_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`skill_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`skill_groups_locales_locale_parent_id_unique\` ON \`skill_groups_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`skill_groups_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`skill_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`skill_groups_texts_order_parent\` ON \`skill_groups_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`messages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email\` text NOT NULL,
  	\`message\` text NOT NULL,
  	\`locale\` text NOT NULL,
  	\`ip_hash\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`messages_updated_at_idx\` ON \`messages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`messages_created_at_idx\` ON \`messages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	\`clients_id\` integer,
  	\`jobs_id\` integer,
  	\`skill_groups_id\` integer,
  	\`messages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clients_id\`) REFERENCES \`clients\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`jobs_id\`) REFERENCES \`jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skill_groups_id\`) REFERENCES \`skill_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`messages_id\`) REFERENCES \`messages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_clients_id_idx\` ON \`payload_locked_documents_rels\` (\`clients_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_jobs_id_idx\` ON \`payload_locked_documents_rels\` (\`jobs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_skill_groups_id_idx\` ON \`payload_locked_documents_rels\` (\`skill_groups_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_messages_id_idx\` ON \`payload_locked_documents_rels\` (\`messages_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_socials_order_idx\` ON \`site_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_socials_parent_id_idx\` ON \`site_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`business_name\` text NOT NULL,
  	\`copyright_holder\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`address_locality\` text NOT NULL,
  	\`address_region\` text,
  	\`address_country\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`site_locales\` (
  	\`job_title\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`availability\` text,
  	\`languages\` text,
  	\`og_image_path\` text NOT NULL,
  	\`og_image_alt\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_locales_locale_parent_id_unique\` ON \`site_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_texts_order_parent\` ON \`site_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`labels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`labels_locales\` (
  	\`nav_services\` text NOT NULL,
  	\`nav_work\` text NOT NULL,
  	\`nav_clients\` text NOT NULL,
  	\`nav_background\` text NOT NULL,
  	\`nav_contact\` text NOT NULL,
  	\`nav_home\` text NOT NULL,
  	\`a11y_skip_link\` text NOT NULL,
  	\`a11y_main_navigation\` text NOT NULL,
  	\`a11y_language\` text NOT NULL,
  	\`a11y_menu\` text NOT NULL,
  	\`a11y_socials\` text NOT NULL,
  	\`common_contact_button\` text NOT NULL,
  	\`common_see_all_services\` text NOT NULL,
  	\`common_see_all_projects\` text NOT NULL,
  	\`common_see_all_clients\` text NOT NULL,
  	\`common_see_full_background\` text NOT NULL,
  	\`common_stack\` text NOT NULL,
  	\`common_deliverables\` text NOT NULL,
  	\`work_filter\` text NOT NULL,
  	\`work_filter_all\` text NOT NULL,
  	\`work_filter_web\` text NOT NULL,
  	\`work_filter_ai\` text NOT NULL,
  	\`work_client\` text NOT NULL,
  	\`work_result\` text NOT NULL,
  	\`not_found_title\` text NOT NULL,
  	\`not_found_back_home\` text NOT NULL,
  	\`lightbox_open\` text NOT NULL,
  	\`lightbox_close\` text NOT NULL,
  	\`lightbox_dialog\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`labels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`labels_locales_locale_parent_id_unique\` ON \`labels_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_hero_aside\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_hero_aside_order_idx\` ON \`home_hero_aside\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_hero_aside_parent_id_idx\` ON \`home_hero_aside\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_hero_aside_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_hero_aside\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_hero_aside_locales_locale_parent_id_unique\` ON \`home_hero_aside_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`closing_target\` text DEFAULT 'contact' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`home_locales\` (
  	\`seo_title\` text NOT NULL,
  	\`seo_description\` text NOT NULL,
  	\`hero_title\` text NOT NULL,
  	\`hero_subtitle\` text NOT NULL,
  	\`hero_primary_cta\` text NOT NULL,
  	\`hero_secondary_cta\` text NOT NULL,
  	\`sections_services\` text NOT NULL,
  	\`sections_projects\` text NOT NULL,
  	\`sections_clients\` text NOT NULL,
  	\`sections_clients_heading\` text NOT NULL,
  	\`sections_background\` text NOT NULL,
  	\`closing_title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_locales_locale_parent_id_unique\` ON \`home_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_page_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_page_process_order_idx\` ON \`services_page_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_page_process_parent_id_idx\` ON \`services_page_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_page_process_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_page_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_page_process_locales_locale_parent_id_unique\` ON \`services_page_process_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`closing_target\` text DEFAULT 'contact' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`services_page_locales\` (
  	\`seo_title\` text NOT NULL,
  	\`seo_description\` text NOT NULL,
  	\`head_title\` text NOT NULL,
  	\`head_subtitle\` text,
  	\`method_title\` text NOT NULL,
  	\`closing_title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_page_locales_locale_parent_id_unique\` ON \`services_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`work_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`closing_target\` text DEFAULT 'contact' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`work_page_locales\` (
  	\`seo_title\` text NOT NULL,
  	\`seo_description\` text NOT NULL,
  	\`head_title\` text NOT NULL,
  	\`head_subtitle\` text,
  	\`closing_title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`work_page_locales_locale_parent_id_unique\` ON \`work_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`clients_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`closing_target\` text DEFAULT 'contact' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`clients_page_locales\` (
  	\`seo_title\` text NOT NULL,
  	\`seo_description\` text NOT NULL,
  	\`head_title\` text NOT NULL,
  	\`head_subtitle\` text,
  	\`count_label\` text NOT NULL,
  	\`closing_title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clients_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`clients_page_locales_locale_parent_id_unique\` ON \`clients_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`background_page_principles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`background_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`background_page_principles_order_idx\` ON \`background_page_principles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`background_page_principles_parent_id_idx\` ON \`background_page_principles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`background_page_principles_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`background_page_principles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`background_page_principles_locales_locale_parent_id_unique\` ON \`background_page_principles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`background_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`closing_target\` text DEFAULT 'contact' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`background_page_locales\` (
  	\`seo_title\` text NOT NULL,
  	\`seo_description\` text NOT NULL,
  	\`head_title\` text NOT NULL,
  	\`head_subtitle\` text,
  	\`experience_title\` text NOT NULL,
  	\`stack_title\` text NOT NULL,
  	\`principles_title\` text NOT NULL,
  	\`closing_title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`background_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`background_page_locales_locale_parent_id_unique\` ON \`background_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`contact_page_locales\` (
  	\`seo_title\` text NOT NULL,
  	\`seo_description\` text NOT NULL,
  	\`head_title\` text NOT NULL,
  	\`head_subtitle\` text,
  	\`form_title\` text NOT NULL,
  	\`form_email_label\` text NOT NULL,
  	\`form_message_label\` text NOT NULL,
  	\`form_message_placeholder\` text NOT NULL,
  	\`form_submit_label\` text NOT NULL,
  	\`form_privacy_note\` text NOT NULL,
  	\`form_subject_prefix\` text NOT NULL,
  	\`form_sent_title\` text NOT NULL,
  	\`form_sent_text\` text NOT NULL,
  	\`form_error_text\` text NOT NULL,
  	\`reach_title\` text NOT NULL,
  	\`reach_email_label\` text NOT NULL,
  	\`reach_profiles_label\` text NOT NULL,
  	\`reach_location_label\` text NOT NULL,
  	\`reach_languages_label\` text NOT NULL,
  	\`reach_brief\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contact_page_locales_locale_parent_id_unique\` ON \`contact_page_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`services_deliverables\`;`)
  await db.run(sql`DROP TABLE \`services_deliverables_locales\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`services_locales\`;`)
  await db.run(sql`DROP TABLE \`services_texts\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`projects_locales\`;`)
  await db.run(sql`DROP TABLE \`clients\`;`)
  await db.run(sql`DROP TABLE \`clients_locales\`;`)
  await db.run(sql`DROP TABLE \`jobs\`;`)
  await db.run(sql`DROP TABLE \`jobs_locales\`;`)
  await db.run(sql`DROP TABLE \`skill_groups\`;`)
  await db.run(sql`DROP TABLE \`skill_groups_locales\`;`)
  await db.run(sql`DROP TABLE \`skill_groups_texts\`;`)
  await db.run(sql`DROP TABLE \`messages\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_socials\`;`)
  await db.run(sql`DROP TABLE \`site\`;`)
  await db.run(sql`DROP TABLE \`site_locales\`;`)
  await db.run(sql`DROP TABLE \`site_texts\`;`)
  await db.run(sql`DROP TABLE \`labels\`;`)
  await db.run(sql`DROP TABLE \`labels_locales\`;`)
  await db.run(sql`DROP TABLE \`home_hero_aside\`;`)
  await db.run(sql`DROP TABLE \`home_hero_aside_locales\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`home_locales\`;`)
  await db.run(sql`DROP TABLE \`services_page_process\`;`)
  await db.run(sql`DROP TABLE \`services_page_process_locales\`;`)
  await db.run(sql`DROP TABLE \`services_page\`;`)
  await db.run(sql`DROP TABLE \`services_page_locales\`;`)
  await db.run(sql`DROP TABLE \`work_page\`;`)
  await db.run(sql`DROP TABLE \`work_page_locales\`;`)
  await db.run(sql`DROP TABLE \`clients_page\`;`)
  await db.run(sql`DROP TABLE \`clients_page_locales\`;`)
  await db.run(sql`DROP TABLE \`background_page_principles\`;`)
  await db.run(sql`DROP TABLE \`background_page_principles_locales\`;`)
  await db.run(sql`DROP TABLE \`background_page\`;`)
  await db.run(sql`DROP TABLE \`background_page_locales\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`contact_page_locales\`;`)
}
