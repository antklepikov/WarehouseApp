class StoreController < ApplicationController
  def index
    @stores = ActiveModelSerializers::SerializableResource.new(current_user.stores , each_serializer: StoreSerializer)
  end

  def show
    @store = Store.find(params[:id])
    @productsInStores = ActiveModelSerializers::SerializableResource.new(@store.orders.where(status: 1), each_serializer: OrderSerializer)

  end

  def create
    @store = Store.new(stores_params)
    @store.user_id = current_user.id
    if @store.save(:validate => false)
      respond_to do |format|
        format.html
        format.json { render (
                                 {json:
                                      {store: ActiveModel::Serializer::CollectionSerializer.new(@store, serializer: StoreSerializer)}
                                 }
                             ) }
      end
    end
  end

  private

  def stores_params
    params.require(:store).permit(:title)
  end
end
