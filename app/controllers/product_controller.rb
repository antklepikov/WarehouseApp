class ProductController < ApplicationController

  def index
    @productsWarehouse = ProductsWarehouse.where(warehouse_id: params[:warehouse_id]).page(params[:page]).per(params[:page] ? 5 : 1000)
    @products=@productsWarehouse.map{|productWarehouse|
      {product: productWarehouse.product, productCount: productWarehouse.products_count}}
    render json: {
        products: @products,
        total_pages: @productsWarehouse.total_pages
    }
  end

  def create
    @warehouse = Warehouse.find(params[:warehouse_id])
    @product = Product.new(products_params)
    @product.save
    @warehouseProduct = ProductsWarehouse.new(warehouse_id: @warehouse.id, product_id: @product.id, products_count: params[:products_count]).save
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
