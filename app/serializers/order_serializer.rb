class OrderSerializer < BaseSerializer

  attributes *Order.column_names,
             :product,  :store

  def product
    object.product
  end

  def store
    object.store
  end
  #
  # belongs_to :store, serializer: StoreSerializer


end

