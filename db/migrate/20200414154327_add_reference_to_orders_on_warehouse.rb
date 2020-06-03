class AddReferenceToOrdersOnWarehouse < ActiveRecord::Migration[6.0]
  def change
    add_reference :orders, :warehouse, foreign_key: true, null: false, index: true
  end
end
