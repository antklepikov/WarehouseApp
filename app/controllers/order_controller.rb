class OrderController < ApplicationController
  def create
    @order = Order.new(order_params)
    if @order.save
      respond_to do |format|
        format.html
        format.json { render json: @order }
      end
    end
  end
  private
  def order_params
    params.require(:orders).permit(:count, :warehouse_id, :product_id, :store_id)
  end
end
