class ProductsWarehousesSerializer < ActiveModel::Serializer
  attributes *ProductsWarehouse.column_names,
             :warehouses, :product

  def warehouses
    object.warehouse
  end

  def product
    object.product
  end
end
