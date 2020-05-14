class OrderController < ApplicationController
  def show
    @order = Order.find(params[:id])
    @productOrder = ActiveModelSerializers::SerializableResource.new(@order, each_serializer: OrderSerializer)

    @productCount = ActiveModelSerializers::SerializableResource.new(ProductsWarehouse.find_by(product_id: @order.product_id), serializer: ProductsWarehousesSerializer)
  end

  def create
    @order = Order.new(order_params)
    if @order.save
      respond_to do |format|
        format.html
        format.json { render json: @order }
      end
    else
      render :json => { :error => @order.errors.full_messages }
    end
  end

  def update
    @order =  Order.find(params[:id])
    @order.update(status: params[:status])
    @product = ProductsWarehouse.find_by(product_id: @order.product_id)
    @product.update(products_count: @product.products_count - @order.count)
  end

  private
  def order_params
    params.require(:orders).permit(:count, :warehouse_id, :product_id, :store_id)
  end
end
