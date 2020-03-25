class WarehouseController < ApplicationController

  def index
    @warehouses = current_user.warehouses.all
    puts '>>>>>>>>>', @warehouses
  end

  def show

  end

  def create
    @warehouse = Warehouse.new(warehouse_params)
      puts 'save', @warehouse.save
      puts 'warehouse inspect', @warehouse.inspect
    @warehouse.user_id = current_user.id
    if @warehouse.save(:validate=>false)
      render json: @warehouse
    end
    # redirect_to '/'
  end

  def destroy

  end


  private

    def warehouse_params
      params.require(:warehouse).permit(:title, :number, :address)
    end
end
