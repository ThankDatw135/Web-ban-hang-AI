-- CreateIndex
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");

-- CreateIndex
CREATE INDEX "orders_user_id_status_created_at_idx" ON "orders"("user_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "products_price_idx" ON "products"("price");

-- CreateIndex
CREATE INDEX "products_created_at_idx" ON "products"("created_at");

-- CreateIndex
CREATE INDEX "products_is_active_category_id_created_at_idx" ON "products"("is_active", "category_id", "created_at");
