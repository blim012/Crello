Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :boards, only: [ :index, :show, :update, :create, :destroy ]
      resources :columns, only: [ :update, :create, :destroy ]
      resources :tickets, only: [ :update, :create, :destroy ]
      post 'tickets/move', to: 'tickets#move'
      post 'columns/move', to: 'columns#move'
      post 'board_users/invite', to: 'board_users#invite'
      delete 'board_users/leave/:board_id', to: 'board_users#leave'
    end
  end

  devise_for :users
  root 'boards#index';
end
