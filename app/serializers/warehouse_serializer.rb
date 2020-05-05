class WarehouseSerializer < BaseSerializer

  # attributes *Warehouse.attribute_names.map(&:to_sym)
  attributes *Warehouse.column_names



  # has_many :products_warehouses, serializer: ProductsWarehousesSerializer


end
