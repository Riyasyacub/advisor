class Slot
  include Mongoid::Document
  include Mongoid::Timestamps

  field :frequency, type: Array
  field :start_time, type: Time
  field :end_time, type: Time 

  belongs_to :offer
  belongs_to :mentor
  has_many :bookings
end
