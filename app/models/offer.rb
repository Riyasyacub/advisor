class Offer
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :price, type: String
  field :description, type: String

  belongs_to :mentor
  belongs_to :category

  def id
    self['id'].to_s
  end
end
