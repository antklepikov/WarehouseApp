class ProductController < ApplicationController

  def index
    # @products = Warehouse.find(params[:warehouse_id]).products.all
    @products = Product.all
    puts ">>>>>", @warehouse
    respond_to do |format|
      format.html
      format.json { render json: @products }
    end
  end
  def create
    @product = Product.create(products_params)
    puts ">>>>>>> @warehouse", @warehouse
    @warehouseProduct = ProductsWarehouse.create(warehouse_id: @warehouse, product_id: @product.id)
    respond_to do |format|
      format.html
      format.json { render json: @product }
    end
  end
  def destroy

  end

  private
  def products_params
    params.require(:product).permit(:title)
  end
end
