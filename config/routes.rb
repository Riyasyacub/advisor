Rails.application.routes.draw do
  root 'pages#index'
  # devise_for :clients
  # devise_for :mentors
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :clients, :controllers => { registrations: 'clients/registrations' }
  devise_for :mentors, :controllers => { registrations: 'mentors/registrations' }

  get '/offers_fetch', to: 'pages#offers_fetch'
  get '/offers_show/:id', to: 'pages#offers_show', as: 'offers_show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
