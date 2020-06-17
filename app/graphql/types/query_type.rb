module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :warehouses,
          [Types::WarehouseType],
          null: false do
          description "Return a list of warehouses"
    end


    def warehouses
      Warehouse.all
    end
  end
end
