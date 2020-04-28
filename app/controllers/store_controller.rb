class StoreController < ApplicationController
  def index
    @stores = current_user.stores

    respond_to do |format|
      format.html
      format.json { render json: @stores }
    end
  end

  def show

    @warehouses = current_user.warehouses
    @store = Store.find(params[:id])

    # @xd  = ActiveModel::Serializer::CollectionSerializer.new(current_user.warehouses.last, serializer: UserWarehouseProductsCountSerializer)]
    # @xd  = UserWarehouseProductsCountSerializer.new(current_user.warehouses)
    # @xd  = ActiveModelSerializers::SerializableResource.new(Warehouse.all,
    #                                                 serializer: UserWarehouseProductsCountSerializer)

    @productsInStores = @store.orders.where(status: 1).map{|order|
      {product: order.product, count: order.count}
    }
    respond_to do |format|
      format.html
      format.json { render json: @store }
    end
  end

  def create
    @store = Store.new(stores_params)
    @store.user_id = current_user.id
    if @store.save(:validate => false)
      respond_to do |format|
        format.html
        format.json { render json: @store }
      end
    end
  end

  private

  def stores_params
    params.require(:store).permit(:title)
  end
end
