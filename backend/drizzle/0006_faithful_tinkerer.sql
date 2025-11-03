PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`address` text NOT NULL,
	`image` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_event`("id", "user_id", "title", "content", "category", "address", "image", "date") SELECT "id", "user_id", "title", "content", "category", "address", "image", "date" FROM `event`;--> statement-breakpoint
DROP TABLE `event`;--> statement-breakpoint
ALTER TABLE `__new_event` RENAME TO `event`;--> statement-breakpoint
PRAGMA foreign_keys=ON;