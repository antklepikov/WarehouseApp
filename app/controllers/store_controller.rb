class StoreController < ApplicationController
  def index
    # @stores = current_user.stores.all
    # @stores = Store.all
    @stores = Store.where(user_id: current_user.id)
    respond_to do |format|
      format.html
      format.json { render json: @stores }
    end
  end

  def show
    @warehouses = current_user.warehouses.all

    # puts "products", @products.inspect
    # puts "warehouses", @warehouses.inspect
    @store = Store.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @store }
    end
  end

  def create
    @store = Store.new(stores_params)
    @store.user_id = current_user.id
    if @store.save(:validate=>false)
      respond_to do |format|
        format.html
        format.json { render json: @store }
      end
    end
  end

  private
    def stores_params
      params.require(:store).permit(:title)
    end
end
