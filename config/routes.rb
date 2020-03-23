Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # devise_for :users
  devise_for :users do
    # get '/users/sign_out' => 'devise/sessions#destroy', :via => :delete
  end

  root "home#index"
end
