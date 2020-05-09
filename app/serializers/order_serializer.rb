class OrderSerializer < BaseSerializer

  attributes :id, :count, :store_id, :warehouse_id, :product_id, :status,
             :product,  :store

end

