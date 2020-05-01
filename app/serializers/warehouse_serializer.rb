class WarehouseSerializer < BaseSerializer

  attributes *Warehouse.attribute_names.map(&:to_sym)

  # has_many :products_warehouses, serializer: ProductsWarehousesSerializer

end
