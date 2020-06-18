class Mutations::CreateWarehouse < Mutations::BaseMutation

  argument :title, String, required: true
  argument :number, String, required: true
  argument :address, String, required: true

  field :warehouse, Types::WarehouseType, null: false
  field :errors, [String], null: false

  def resolve(title:, number:, address:)
    warehouse = Warehouse.new(title: title, number: number, address: address)
    warehouse.user_id = 7

    if warehouse.save
      {
        warehouse: warehouse,
        errors: [],
      }
    else
      {
        warehouse: nil,
        errors: warehouse.errors.full_messages
      }
    end

  end
end


