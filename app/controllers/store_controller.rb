class StoreController < ApplicationController
  def index
    # @stores = current_user.stores.all
    # @stores = Store.all
    @stores = Store.where(user_id: current_user.id)
    respond_to do |format|
      format.html
      format.json { render json: @stores }
    end
  end

  def show
    @warehouses = current_user.warehouses.all

    @productsCount = []
    @warehouses = current_user.warehouses.each do |warehouse|
      @productsCount << {:warehouse => warehouse, :productWarehouseCount => ProductsWarehouse.where(warehouse_id: warehouse.id).map{|i|{id:i.id,products_count:i.products_count} }}
    end
    @store = Store.find(params[:id])
    # @xd  = ActiveModel::Serializer::CollectionSerializer.new(current_user.warehouses.last, serializer: UserWarehouseProductsCountSerializer)]
    # @xd  = UserWarehouseProductsCountSerializer.new(current_user.warehouses)
    # @xd  = ActiveModelSerializers::SerializableResource.new(Warehouse.all,
    #                                                   serializer: UserWarehouseProductsCountSerializer)
    @orders = Order.where(store_id: @store.id, status: 1).each do |order|
      @products = Product.where(id: order.product_id)
      puts "a;owdvjaowvh", @products.inspect
    end


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
