class ProductController < ApplicationController

  def index
    @productsWarehouse = ProductsWarehouse.where(warehouse_id: params[:warehouse_id]).page(params[:page]).per(params[:page] ? 5 : 1000)

    respond_to do |format|
      format.html
      format.json { render(
          {json:
               {
                   products: ActiveModel::Serializer::CollectionSerializer.new(@productsWarehouse, serializer: ProductsWarehousesSerializer),
                   total_pages: @productsWarehouse.total_pages
               }
          }
      ) }
    end
  end

  def create
    @warehouse = Warehouse.find(params[:warehouse_id])
    @product = Product.new(products_params)
    @warehouseProduct = ProductsWarehouse.new(warehouse_id: @warehouse.id, product_id: @product.id, products_count: params[:productCount]).save
    if @product.save && @warehouseProduct.save
      respond_to do |format|
        format.html
        format.json { render json: @product }
      end
    else
      render :json => { :error =>  @product.errors.full_messages }
    end

  end

  def destroy
    @product = Product.find(params[:id])
    @warehouseProduct =  ProductsWarehouse.where(product_id: @product.id)
  end

  private
  def products_params
    params.require(:product).permit(:title, :productsCount)
  end
end
