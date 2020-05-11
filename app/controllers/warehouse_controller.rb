class WarehouseController < ApplicationController

  before_action :set_warehouse, only: [:show, :destroy, :update]

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

    # orders = Order.where(warehouse_id: @warehouse.id).group_by {|order| {store: order.store}}.uniq
    # puts "lala", orders.inspect
    # @stores = orders
    # @stores = ActiveModelSerializers::SerializableResource.new(orders, each_serializer: OrderSerializer)

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
  def warehouse_params
    params.require(:warehouse).permit(:title, :number, :address)
  end
end
