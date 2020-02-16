# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post 'signup', to: 'registrations#create'
        post 'login', to: 'sessions#create'
      end
      resources :users, only: [:index]
      resources :projects
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
