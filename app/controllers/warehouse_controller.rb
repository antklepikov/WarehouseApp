class WarehouseController < ApplicationController

  def index
    @warehouses = current_user.warehouses.all.page(params[:page])
    respond_to do |format|
      format.html
# format.json { ActiveModel::UserWarehouseProductsCountSerializer, total_pages: @warehouses.total_pages}
# format.json  @warehouses, serializer: UserWarehouseProductsCountSerializer, adapter: json
      format.json { render(
          {json:
               {
                   # @warehouses, each_serializer: UserWarehouseProductsCountSerializer
                   warehouses: ActiveModel::Serializer::CollectionSerializer.new(@warehouses, serializer: WarehouseSerializer),
                   total_pages: @warehouses.total_pages
               }
          }
      ) }
    end
  end

  def show

    @warehouse = Warehouse.find(params[:id])
    @productsCount = ProductsWarehouse.where(warehouse_id: @warehouse.id).map { |item| {id: item.product_id, products_count: item.products_count} }
    @order = Order.where(warehouse_id: @warehouse.id)

    @orderInWarehouse = @order.where(status: 0).map { |order|
      {order: order, orderedProduct: order.product} }

    @stores = Order.limit(6).where(warehouse_id: @warehouse.id, store: current_user.stores).map { |order| order.store }.map { |store|
      {store: store, countHold: @order.where(store_id: store.id).count}
    }.uniq.sort_by { |sort| -sort[:countHold] }

    respond_to do |format|
      format.html
      format.json { render json: {warehouse: @warehouse} }
    end
  end

  def create
    @warehouse = Warehouse.new(warehouse_params)
    @warehouse.user_id = current_user.id
    if @warehouse.save
      respond_to do |format|
        format.html
        format.json { render json: @warehouse }
      end
    else
      respond_to do |format|
        format.html
        format.json {render :json => { :error => @warehouse.errors.full_messages }}
      end
    end

  end

  def update
    @warehouse = Warehouse.find(params[:id])
    @warehouse.update(warehouse_params)
    respond_to do |format|
      format.html
      format.json { render json: @warehouse }

    end
  end

  def destroy
    @warehouse = Warehouse.find(params[:id]).destroy
    respond_to do |format|
      format.html
      format.json { render json: @warehouse }
    end

  end


  private

  def warehouse_params
    params.require(:warehouse).permit(:title, :number, :address)
  end
end
