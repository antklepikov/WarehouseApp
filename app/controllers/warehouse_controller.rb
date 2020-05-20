class WarehouseController < ApplicationController

  before_action :set_warehouse, only: [:show, :destroy, :update]
  before_action :popular_stores, only: [:show]

  def index
    @warehouses = current_user.warehouses.page(params[:page])
    respond_to do |format|
      format.html
      format.json { render(
          {json:
               {
                   warehouses: ActiveModel::Serializer::CollectionSerializer.new(@warehouses, serializer: WarehouseSerializer),
                   total_pages: @warehouses.total_pages
               }
          }
      ) }
    end
  end

  def show
    @stores = ActiveModelSerializers::SerializableResource.new(@orders_stores, each_serializer: StoreSerializer)

    @orderInWarehouse = ActiveModelSerializers::SerializableResource.new(Order.where(warehouse_id: @warehouse.id, status: "active"), each_serializer: OrderSerializer)
  end

  def create
    @warehouse = Warehouse.new(warehouse_params)
    @warehouse.user_id = current_user.id
    if @warehouse.save
      respond_to do |format|
        format.html
        format.json { render json: {warehouse: ActiveModelSerializers::SerializableResource.new(@warehouse, each_serializer: WarehouseSerializer)} }
      end
    else
      render :json => { :error => @warehouse.errors.full_messages }
    end
  end

  def update

    if @warehouse.update(warehouse_params)
      respond_to do |format|
        format.html
        format.json { render json: {warehouse: ActiveModelSerializers::SerializableResource.new(@warehouse, each_serializer: WarehouseSerializer)} }
      end
    else
      render :json => { :error => @warehouse.errors.full_messages }
    end
  end

  def destroy
    @warehouse.destroy
    respond_to do |format|
      format.html
      format.json { render json: @warehouse }
    end

  end


  private
  def set_warehouse
    @warehouse = Warehouse.find(params[:id])
  end

  def popular_stores

    @orders_stores = Store.joins(:orders).where( orders: { warehouse_id: @warehouse.id } ).group('stores.id').order('count(orders.id) DESC')
  end

  def warehouse_params
    params.require(:warehouse).permit(:title, :number, :address)
  end
end
