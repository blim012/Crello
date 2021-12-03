class Api::V1::TicketsController < ApplicationController
  protect_from_forgery

  def create
    @ticket = Ticket.new(ticket_params)
    if @ticket.save
      render json: @ticket
    else
      render json: { errors: @ticket.errors.full_messages }
    end
  end

  private

  def ticket_params
    params.require(:ticket).permit(:title, :column_id, :order, :description)
  end
end
