-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_address" TEXT NOT NULL,
    "bill_to" TEXT NOT NULL,
    "invoice_date" TIMESTAMP(3),
    "due_date" TIMESTAMP(3),
    "items" JSONB NOT NULL,
    "notes" TEXT,
    "sub_total" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "tax_rate" DOUBLE PRECISION,
    "created_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
