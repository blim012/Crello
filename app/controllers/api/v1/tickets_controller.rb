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

  def destroy

  end

  def move
    # src_col_idx
    # src_ticket_idx
    # dest_col_idx
    # dest_ticket_idx
    # board_id

    if(params[:src_col_idx] == params[:dest_col_idx])
      tickets = Column.find_by(board_id: params[:board_id], order: params[:src_col_idx]).tickets
      update_ticket_order_same_col(tickets, params[:src_ticket_idx], params[:dest_ticket_idx])
      helpers.broadcast_update(Board.find(params[:board_id]))
    else
      # update_diff_col_order
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

  def update_ticket_order_same_col(tickets, from_idx, to_idx)
    moved_ticket = tickets.find_by(order: from_idx)
    if from_idx < to_idx
      tickets.where('"order" > ? AND "order" <= ?', from_idx, to_idx).update_all('"order" = "order" - 1')
    else
      tickets.where('"order" < ? AND "order" >= ?', from_idx, to_idx).update_all('"order" = "order" + 1')
    end
    moved_ticket.update(order: to_idx)
  end

  def update_order(list, from_idx, to_idx)
    #update table 
    #set order = order - 1
    #where order >= ? and order <= ?;

    #update table
    #set order = ?
    #where song = ?
  end
end
