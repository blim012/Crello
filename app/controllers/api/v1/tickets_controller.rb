class Api::V1::TicketsController < ApplicationController
  protect_from_forgery

  def create
    @ticket = Ticket.new(ticket_params)
    if @ticket.save
      render json: @ticket
      broadcast_update
    else
      render json: { errors: @ticket.errors.full_messages }
    end
  end

  private

  def ticket_params
    params.require(:ticket).permit(:title, :column_id, :order, :description)
  end

  def broadcast_update
    board = get_board
    serialized_board = ActiveModelSerializers::SerializableResource.new(
      board, { serializer: Api::V1::BoardSerializer }
    ).as_json
    ActionCable.server.broadcast("board_#{board.id}", {
      board: serialized_board
    })
  end

  def get_board
    column = Column.find_by(id: params[:column_id])
    Board.find_by(id: column.board_id)
  end
end
