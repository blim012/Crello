Rails.application.routes.draw do
  # mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :boards, only: [ :create, :show ]
      resources :columns, only: [ :create ]
      resources :tickets, only: [ :create ]
    end
  end

  devise_for :users
  root 'boards#index';
end
