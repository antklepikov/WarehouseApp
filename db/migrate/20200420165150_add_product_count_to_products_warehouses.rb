class AddProductCountToProductsWarehouses < ActiveRecord::Migration[6.0]
  def change
    add_column :products_warehouses, :products_count, :integer, default: 0
  end
end
