class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  def index
    @events = current_user.events.all
  end

  def show
    if authorized?
      respond_to do |format|
        format.json { render :show }
      end
    else
      handle_unauthorized
    end
  end

  def create
    @event = current_user.events.build(event_params)
    if authorized?
      respond_to do |format|
        if @event.save
          format.json { render :show, status: :created, location: api_v1_event_path(@event) }
        else
          format.json { render json: @event.errors, status: :unprocessable_entity }
        end
      end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
      respond_to do |format|
        if @event.update(event_params)
          format.json { render :show, status: :ok, location: api_v1_event_path(@event) }
        else
          format.json { render json: @event.errors, status: :unprocessable_entity }
        end
      end
    else
        handle_unauthorized
    end
  end

  def destroy
    if authorized?
      @event.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    else
      handle_unauthorized
    end
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def authorized?
    @event.user == current_user
  end

  def handle_unauthorized
    unless authorized?
      respond_to do |format|
        format.json { render :unauthorized, status: 401 }
      end
    end
  end

  def event_params
    params.require(:event).permit(:title, :start_time)
  end
end
