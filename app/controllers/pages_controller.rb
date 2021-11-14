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
end
