Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  devise_for :users do
  end

  resources :warehouse do
    resources :product
  end

  resources :store do
    resources :product
  end

  resources :order
  root "home#index"
end
