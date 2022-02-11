CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,  
	"priority" INTEGER, 
	"completed" BOOLEAN,
	"task" VARCHAR(256) NOT NULL
);
