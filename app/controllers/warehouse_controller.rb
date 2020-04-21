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

    @productsCount = ProductsWarehouse.where(warehouse_id: @warehouse.id).pluck(:products_count)

    puts "@productsCount", @productsCount.inspect
    @productsOrder =[]
    @order = Order.where(warehouse_id: @warehouse.id, status: 0).each do |order|
      @productsOrder << {:order => order, :ordered_product => Product.where(id: order.product_id), productsCount: ProductsWarehouse.where(product_id: order.product_id).pluck(:products_count)}
    end

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
