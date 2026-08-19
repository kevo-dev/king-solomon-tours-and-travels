CREATE TABLE `bookingInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tourId` int NOT NULL,
	`userId` int,
	`travelerName` varchar(180) NOT NULL,
	`travelerEmail` varchar(320) NOT NULL,
	`travelerCount` int NOT NULL,
	`travelDate` timestamp,
	`message` text,
	`status` enum('new','contacting','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookingInquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destinations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(140) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`region` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`coverImage` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `destinations_id` PRIMARY KEY(`id`),
	CONSTRAINT `destinations_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `itineraries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`tripNotes` text,
	`dayPlan` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `itineraries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `operators` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int,
	`businessName` varchar(180) NOT NULL,
	`slug` varchar(190) NOT NULL,
	`description` text NOT NULL,
	`email` varchar(320),
	`phone` varchar(64),
	`verificationStatus` enum('pending','verified','suspended') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `operators_id` PRIMARY KEY(`id`),
	CONSTRAINT `operators_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `savedTours` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tourId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `savedTours_id` PRIMARY KEY(`id`),
	CONSTRAINT `saved_tour_unique` UNIQUE(`userId`,`tourId`)
);
--> statement-breakpoint
CREATE TABLE `tours` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operatorId` int NOT NULL,
	`destinationId` int NOT NULL,
	`title` varchar(220) NOT NULL,
	`slug` varchar(240) NOT NULL,
	`summary` text NOT NULL,
	`description` text NOT NULL,
	`category` enum('safari','beach','cultural','adventure','city') NOT NULL,
	`region` varchar(100) NOT NULL,
	`durationDays` int NOT NULL,
	`groupMin` int NOT NULL DEFAULT 1,
	`groupMax` int NOT NULL,
	`startingPriceKes` int NOT NULL,
	`isPrivate` boolean NOT NULL DEFAULT false,
	`isPublished` boolean NOT NULL DEFAULT false,
	`gallery` json NOT NULL,
	`itinerary` json NOT NULL,
	`inclusions` json NOT NULL,
	`exclusions` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tours_id` PRIMARY KEY(`id`),
	CONSTRAINT `tours_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','operator') NOT NULL DEFAULT 'user';--> statement-breakpoint
CREATE INDEX `inquiries_tour_idx` ON `bookingInquiries` (`tourId`);--> statement-breakpoint
CREATE INDEX `inquiries_user_idx` ON `bookingInquiries` (`userId`);--> statement-breakpoint
CREATE INDEX `itineraries_user_idx` ON `itineraries` (`userId`);--> statement-breakpoint
CREATE INDEX `operators_owner_idx` ON `operators` (`ownerId`);--> statement-breakpoint
CREATE INDEX `tours_destination_idx` ON `tours` (`destinationId`);--> statement-breakpoint
CREATE INDEX `tours_operator_idx` ON `tours` (`operatorId`);--> statement-breakpoint
CREATE INDEX `tours_category_idx` ON `tours` (`category`);