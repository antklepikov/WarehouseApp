Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

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
