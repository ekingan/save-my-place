class Api::V1::AuthController < ApplicationController
  def index
    if user_signed_in?
      respond_to do |format|
        format.json { render json: true, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: false, status: :unauthorized }
      end
    end
  end
end
