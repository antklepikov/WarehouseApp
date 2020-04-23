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
    @productsCount=[]
    @warehouses = current_user.warehouses.each do |warehouse|
      @productsCount << {productsCount: ProductsWarehouse.where(warehouse_id: warehouse.id).map{|item|{product_id:item.product_id,products_count:item.products_count}}}
    end
    puts "productsCount", @productsCount.inspect
    @store = Store.find(params[:id])
    # @xd  = ActiveModel::Serializer::CollectionSerializer.new(current_user.warehouses.last, serializer: UserWarehouseProductsCountSerializer)]
    # @xd  = UserWarehouseProductsCountSerializer.new(current_user.warehouses)
    # @xd  = ActiveModelSerializers::SerializableResource.new(Warehouse.all,
    #                                                 serializer: UserWarehouseProductsCountSerializer)


    @productsInStores =@store.orders.map{|order|order.product}


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
