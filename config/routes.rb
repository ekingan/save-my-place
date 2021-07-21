Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
    root "pages#events", as: :authenticated_root
  end
  root 'pages#events'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :events, only: [:index, :show, :create, :update, :destroy]
      resources :home, only: [:index, :show]
      get 'auth/', to: 'auth#index'
    end
  end
  match '*path', to: 'pages#index', via: :all
end
