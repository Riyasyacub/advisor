class Booking
  include Mongoid::Document
  include Mongoid::Timestamps

  field :date, type: Date
  
  belongs_to :slots
  belongs_to :offer
  belongs_to :mentor
  belongs_to :client

end
