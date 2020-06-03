class RemoveColumnsFromProductsWarehouse < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :products_warehouses, column: :warehouse_id
    remove_foreign_key :products_warehouses, column: :product_id
  end
end
