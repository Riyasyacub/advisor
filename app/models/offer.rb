class Offer
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :price, type: String

  belongs_to :mentor
  belongs_to :category
end
