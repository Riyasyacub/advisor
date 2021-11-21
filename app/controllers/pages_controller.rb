class PagesController < ApplicationController
  def index
    @category = Category.all
  end

  def offers_show
    @offer = Offer.where(id: params[:id]).first.as_json(only: [:name,:price,:created_at,:description],methods: [:id],
      include: {category:  {only: [:name],methods: [:id]},
               mentor: {only: [:name,:designation,:organization,:bio,:achievements],methods: [:id],
               include: {offers: {only: [:name,:price],methods: [:id]}}
               }
              }
               )
              #  raise @offer.inspect
    @booking = Booking.new
    @slots = Slot.where(offer_id: params[:id]).all
    @slot = Slot.new
  end

  def offers_fetch
    @cat = Category.where(id: params[:id]).first
    @offers = @cat.offers.all.as_json(only: [:name,:price,:created_at,:description],methods: [:id],
      include: {category:  {only: [:name],methods: [:id]},
               mentor: {only: [:name,:designation,:organization,:bio,:achievements],methods: [:id],
               include: {offers: {only: [:name,:price],methods: [:id]}}
               }
              }
               )
              
    respond_to do |format|
      format.json { render json: @offers }
    end

  end

  def new_booking
    booking = Booking.new(booking_params)
    # raise booking_params.inspect
    if booking.save
      redirect_to offers_show_path(booking["offer_id"])
    else
      raise booking.inspect
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:start_time,:end_time,:mentor_id,:client_id,:offer_id)
  end

end
