Rails.application.routes.draw do
  root 'pages#index'
  # devise_for :clients
  # devise_for :mentors
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :clients, :controllers => { registrations: 'clients/registrations' }
  devise_for :mentors, :controllers => { registrations: 'mentors/registrations' }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
