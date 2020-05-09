class ProductsWarehousesSerializer < ActiveModel::Serializer
  attributes :id, :warehouse_id, :product_id, :products_count,
             :warehouse, :product

end
