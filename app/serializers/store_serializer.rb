class StoreSerializer < BaseSerializer

  attributes *Store.column_names
  #
  # has_many :orders, serializer: OrderSerializer
  #

end
