class Mentors::OffersController < ApplicationController

  def new
    @offer = Offer.new
    @categories = Category.all.pluck(:name,:id)
  end

  def create
    @offer = Offer.new(offer_params)

    if @offer.save
      redirect_to offers_show_path(@offer.id)
    else
      raise @offer.inspect
    end
  end



  private 

    def offer_params
      params.require(:offer).permit(:name,:price,:description,:category_id,:mentor_id)
    end


end
