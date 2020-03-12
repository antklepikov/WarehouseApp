class CreateWarehouses < ActiveRecord::Migration[6.0]
  def change
    create_table :warehouses do |t|
      t.string :title
      t.integer :number
      t.string :address
      t.timestamps
    end
  end
end
