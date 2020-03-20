class HomeController < ApplicationController

  before_action :configure_permitted_parameters, if: :devise_controller?

  def index
    # @current_user = current_user
  end

end
