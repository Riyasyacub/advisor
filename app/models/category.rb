class Category
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name,type: String
  has_many :offers

  def id
    self['id'].to_s
  end
end
