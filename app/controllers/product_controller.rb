class ProductController < ApplicationController

  def index
    # @products = Warehouse.find(params[:warehouse_id]).products.all

    @products = Product.all
    puts ">>>>>@warehouseindex", params[:warehouse_id]

    respond_to do |format|
      format.html
      format.json { render json: @products }
    end
  end
  def create
    @warehouse = Warehouse.find(params[:id])
    @product = Product.new(products_params).save
    puts ">>>>>>> @warehouse", @warehouse
    @warehouseProduct = ProductsWarehouse.new(warehouse_id: @warehouse.id, product_id: @product.id).save
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
