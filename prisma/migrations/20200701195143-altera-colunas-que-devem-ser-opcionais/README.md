# Migration `20200701195143-altera-colunas-que-devem-ser-opcionais`

This migration has been generated by Jefferson Carlos at 7/1/2020, 7:51:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Item" ALTER COLUMN "dueDate" DROP NOT NULL,
ALTER COLUMN "supportingText" DROP NOT NULL;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200701194807-add-item-table..20200701195143-altera-colunas-que-devem-ser-opcionais
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -17,7 +17,7 @@
 model Item {
   id             Int      @id @default(autoincrement())
   title          String
-  dueDate        DateTime
-  supportingText String
+  dueDate        DateTime?
+  supportingText String?
 }
```

