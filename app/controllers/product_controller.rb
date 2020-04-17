class ProductController < ApplicationController

  def index
    @products = Warehouse.find(params[:warehouse_id]).products.all.page(params[:page])
    puts "products pages", @products.total_pages
    respond_to do |format|
      format.json do
        render json: @products,
               meta: {total_pages: @products.total_pages}
      end
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
  def update
    @product = Product.find(params[:id])
    puts "product", @product
    @product.update(products_count: :productCountOrder)
    respond_to do |format|
      format.html
      format.json { render json: @product }
    end
  end
  def destroy
    @product = Product.find(params[:id])
    puts ">>>>>> product delete", @product.inspect
    # @warehouseProduct = ProductsWarehouse.find(warehouse_id: warehouse_id, product_id: id)
    # @warehouseProduct =  ProductsWarehouse.find_by warehouse_id: '61'
    @warehouseProduct =  ProductsWarehouse.where(product_id: @product.id)
    puts ">>>>>> @warehouseProduct delete", @warehouseProduct.inspect
  end

  private
  def products_params
    params.require(:product).permit(:title, :products_count)
  end
end
