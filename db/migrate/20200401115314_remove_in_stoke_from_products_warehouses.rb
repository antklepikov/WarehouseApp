class RemoveInStokeFromProductsWarehouses < ActiveRecord::Migration[6.0]
  def change
    remove_column :products_warehouses, :in_stoke
  end
end
