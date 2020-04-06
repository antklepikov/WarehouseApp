class StoreController < ApplicationController
  def index
    
  end
  def show

  end
  def create
    @wstore = Store.new(warehouse_params)
    @warehouse.user_id = current_user.id
    if @warehouse.save(:validate=>false)
      respond_to do |format|
        format.html
        format.json { render json: @warehouse }
      end
    end
  end

  private
    def warehouse_params
      params.require(:warehouse).permit(:title)
    end
end
