class ProductController < ApplicationController

  def index
    @products_warehouse = ProductsWarehouse.where(warehouse_id: params[:warehouse_id]).page(params[:page]).per(params[:page] ? 5 : 1000)

    respond_to do |format|
      format.html
      format.json { render(
          {json:
               {
                   products: ActiveModel::Serializer::CollectionSerializer.new(@products_warehouse, serializer: ProductsWarehousesSerializer),
                   total_pages: @products_warehouse.total_pages
               }
          }
      ) }
    end
  end

  def create
    warehouse = Warehouse.find(params[:warehouse_id])
    @product = Product.new(products_params)
    @warehouse_product = ProductsWarehouse.new(warehouse_id: warehouse.id, product_id: @product.id, products_count: params[:productCount]).save
    if @product.save && @warehouse_product.save
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
    @warehouse_product =  ProductsWarehouse.where(product_id: @product.id)
  end

  private
  def products_params
    params.require(:product).permit(:title, :productsCount)
  end
end
