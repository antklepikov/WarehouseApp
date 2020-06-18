module Types
  class QueryType < Types::BaseObject
      field :warehouses, [Types::WarehouseType], null: false

      def warehouses
        Warehouse.all
      end


      field :warehouse, Types::WarehouseType, null: false do
        argument :id, ID, required: true
      end

      def warehouse(id:)
        Warehouse.find(id)
      end
    end
end
