Rails.application.routes.draw do
  # mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :boards, only: [ :index, :show, :create, :destroy ]
      resources :columns, only: [ :update, :create, :destroy ]
      resources :tickets, only: [ :create, :destroy ]
      post 'tickets/move', to: 'tickets#move'
      post 'columns/move', to: 'columns#move'
    end
  end

  devise_for :users
  root 'boards#index';
end
