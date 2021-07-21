class Api::V1::HomeController < ApplicationController
  def index
    @events = Event.all
    respond_to do |format|
      format.json { render json: @events, status: :ok }
    end
  end

  def show
    @event = Event.find(params[:id])
    respond_to do |format|
      format.json { render :show }
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :start_time)
  end
end
