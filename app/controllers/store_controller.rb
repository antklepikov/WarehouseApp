class StoreController < ApplicationController
  def index
    @stores = ActiveModelSerializers::SerializableResource.new(current_user.stores , each_serializer: StoreSerializer)
  end

  def show
    @warehouses = current_user.warehouses
    @store = Store.find(params[:id])
    @products_in_stores = ActiveModelSerializers::SerializableResource.new(@store.orders.where(status: "approved"), each_serializer: OrderSerializer)

  end

  def create
    @store = Store.new(stores_params)
    @store.user_id = current_user.id
    if @store.save
      respond_to do |format|
        format.html
        format.json { render json: {store: StoreSerializer.new(@store).as_json} }
      end
    else
      render :json => { :error => @store.errors.full_messages }
    end
  end

  private

  def stores_params
    params.require(:store).permit(:title)
  end
end
