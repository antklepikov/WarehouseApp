Rails.application.routes.draw do
  devise_for :users
  # get 'hello_world', to: 'hello_world#index'

  devise_scope :user do
    get '/sign_out', to: 'devise/sessions#destroy', as: :signout
  end

  root 'home#index'
end
