class CreateProductsWarehouses < ActiveRecord::Migration[6.0]
  def change
    create_table :products_warehouses do |t|
      t.integer :in_stoke
      t.references :warehouse, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.timestamps
    end
  end
end
