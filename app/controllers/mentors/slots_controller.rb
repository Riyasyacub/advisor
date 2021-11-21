class Mentors::SlotsController < ApplicationController

  def new
    @slot = Slot.new
  end

  def create
    @slot = Slot.new(slot_params)

    if @slot.save
      redirect_to offers_show_path(@slot.offer_id)
    else
      raise @slot.inspect
    end
  end

  private

  def slot_params
    params.require(:slot).permit(:start_time,:end_time,:mentor_id,:offer_id,:frequency => [])
  end

end
