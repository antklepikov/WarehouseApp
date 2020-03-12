class AddReferenceToWarehousesOnUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :warehouses, :user, foreign_key: true, null: false, index: true
  end
end
