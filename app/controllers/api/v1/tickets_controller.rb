class Api::V1::TicketsController < ApplicationController
  protect_from_forgery

  def create
    @ticket = Ticket.new(ticket_params)
    if @ticket.save
      render json: @ticket
      helpers.broadcast_update(get_board)
    else
      render json: { errors: @ticket.errors.full_messages }
    end
  end

  private

  def ticket_params
    params.require(:ticket).permit(:title, :column_id, :order, :description)
  end

  def get_board
    column = Column.find_by(id: params[:column_id])
    Board.find_by(id: column.board_id)
  end
end
