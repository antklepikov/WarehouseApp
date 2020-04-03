class ProductController < ApplicationController

  def index

    @products = Product.all

    respond_to do |format|
      format.html
      format.json { render json: @products }
    end
  end

  def create
    @warehouse = Warehouse.find(params[:warehouse_id])
    @product = Product.new(products_params)
    @product.save
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
    params.require(:product).permit(:title, :products_count)
  end
end
