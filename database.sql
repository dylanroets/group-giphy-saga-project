CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

-- favorite_giphy table
CREATE TABLE "favorite_giphy" (
	"id" SERIAL PRIMARY KEY,
	"category_id" INT,
	"URL" VARCHAR (200),
	"description" VARCHAR (200)
);

INSERT INTO "favorite_giphy" ("category_id","URL","description")
VALUES
(1, 
'https://images.unsplash.com/photo-1670258880099-f1f0bd41e44a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
'lady sitting in field'),
(1, 
'https://images.unsplash.com/photo-1670258880099-f1f0bd41e44a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
'lady sitting in field');