CREATE TABLE IF NOT EXISTS public."AspNetUsers" (
	"Id" text NOT NULL,
	"CreationDate" timestamptz NOT NULL,
	"IsAdmin" bool NOT NULL,
	"UserName" varchar(256) NULL,
	"NormalizedUserName" varchar(256) NULL,
	"Email" varchar(256) NULL,
	"NormalizedEmail" varchar(256) NULL,
	"EmailConfirmed" bool NOT NULL,
	"PasswordHash" text NULL,
	"SecurityStamp" text NULL,
	"ConcurrencyStamp" text NULL,
	"PhoneNumber" text NULL,
	"PhoneNumberConfirmed" bool NOT NULL,
	"TwoFactorEnabled" bool NOT NULL,
	"LockoutEnd" timestamptz NULL,
	"LockoutEnabled" bool NOT NULL,
	"AccessFailedCount" int4 NOT NULL,
	CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id")
);
CREATE INDEX "EmailIndex" ON public."AspNetUsers" USING btree ("NormalizedEmail");
CREATE UNIQUE INDEX "UserNameIndex" ON public."AspNetUsers" USING btree ("NormalizedUserName");

INSERT INTO public."AspNetUsers"
("Id", "CreationDate","IsAdmin", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", 
 "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumber", "PhoneNumberConfirmed", 
 "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount")
VALUES (
    '9c9e8360-163b-437c-b8cc-81fcf4b2ff44',         -- Gera um UUID automaticamente
    '2025-02-01 01:07:46.406 -0300', 		   -- Define a data atual no formato TIMESTAMPTZ
    true,					   --Define se é um usuario admin
    'admin',                   -- Nome do usuário
    'ADMIN',                  	   -- Nome normalizado
    '',         			   -- E-mail
    '',         			   -- E-mail normalizado
    false,                      -- E-mail confirmado
    'AQAAAAIAAYagAAAAEBjrmp9d1q0FHmzoI/YiCByIJEfCZLfwa0/mk8uO9KHKvcumCwaQJHprIQ468hckkw==',-- Hash da senha
    'F2CJZXHC5D7JWOCO65NOU6NW6A7X7NX3',         -- SecurityStamp (UUID aleatório)
    '4fb2a394-03e0-4266-907b-5fcbe9d63c53',         -- ConcurrencyStamp (UUID aleatório)
    NULL,                      -- Número de telefone
    false,                     -- PhoneNumberConfirmed
    false,                     -- TwoFactorEnabled
    NULL,                      -- LockoutEnd
    true,                     -- LockoutEnabled
    0                          -- AccessFailedCount
);
