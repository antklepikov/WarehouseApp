class OrderController < ApplicationController
  def show
    # @productOrder =[]
    @order = Order.find(params[:id])
    @productOrder = Product.where(id: @order.product_id)
    # @productOrder << {:order => @order, :ordered_product => Product.where(id: @order.product_id)}
  end

  def create
    @order = Order.new(order_params)

    if @order.save
      respond_to do |format|
        format.html
        format.json { render json: @order }
      end
    end
  end

  def update
    @order =  Order.find(params[:id])
    @order.update(status: params[:status])
    @product = Product.find(id: @order.product_id)
  end
  private
  def order_params
    params.require(:orders).permit(:count, :warehouse_id, :product_id, :store_id)
  end
end
