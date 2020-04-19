class WarehouseController < ApplicationController

  def index
    @warehouses = current_user.warehouses.all.page(params[:page])
    puts "warehouses", params.inspect
    # @warehouses = current_user.warehouses.all
    respond_to do |format|
      format.html
      format.json {render json: @warehouses, total_pages: @warehouses.total_pages}
    end
  end

  def show
    @warehouse = Warehouse.find(params[:id])
    # @order= Order.where(warehouse_id: @warehouse.id)
    # @productsOrder = Product.includes(:orders)
    # @productsOrder = Order.where(warehouse_id: @warehouse.id).left_joins(:product)
    # @productsOrder = Order.joins(:product)
    # @order = Order.where(warehouse_id: params[:id])
    @test_temp =[]
    @order = Order.where(warehouse_id: @warehouse.id).each do |order|
      # order.joins(Product.where(id: order.product_id))
      # Product.where(id: order.product_id).inspect

      @test_temp << {:order => order, :ordered_product => Product.where(id: order.product_id)}
      # order.write_attribute(:ordered_product, Product.where(id: order.product_id))
      # order.ordered_product = product
    end
    puts "@productsOrder", @order.inspect

    respond_to do |format|
      format.html
      format.json { render json: @warehouse}
    end
  end

  def create
    @warehouse = Warehouse.new(warehouse_params)
    @warehouse.user_id = current_user.id
    if @warehouse.save(:validate=>false)
      respond_to do |format|
        format.html
        format.json { render json: @warehouse }
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
