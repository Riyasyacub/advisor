Rails.application.routes.draw do
  root 'pages#index'
  # devise_for :clients
  # devise_for :mentors
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :clients, :controllers => { registrations: 'clients/registrations' }
  devise_for :mentors, :controllers => { registrations: 'mentors/registrations' }

  get '/offers_fetch', to: 'pages#offers_fetch'
  get '/offers_show/:id', to: 'pages#offers_show', as: 'offers_show'
  post '/new_booking', to: 'pages#new_booking', as: 'new_booking'

  get '/new_offer', to: 'mentors/offers#new', as: "new_offer"
  post '/create_offer', to: 'mentors/offers#create', as: "create_offer"

  get '/new_slot', to: 'mentors/slots#new', as: "new_slot"
  post '/create_slot', to: 'mentors/slots#create', as: "create_slot"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
