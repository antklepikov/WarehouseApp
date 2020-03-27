class WarehouseController < ApplicationController

  def index
    @warehouses = current_user.warehouses.all
    respond_to do |format|
          format.html
          format.json { render json: @warehouses }
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
    puts '1111111'
    puts @warehouse
    puts '1111111'
    if @warehouse.update(warehouse_params)
      respond_to do |format|
        format.html
        format.json { render json: @warehouse }
      end
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
