class Api::V1::TicketsController < ApplicationController
  protect_from_forgery

  def update
    @ticket = Ticket.find(params[:id])
    if @ticket.update(ticket_params)
      render json: @ticket
    else
      render json: { errors: @ticket.errors.full_messages }
    end
  end

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
    @ticket = Ticket.find(params[:id])
    delete_ticket_and_update_order(@ticket)
    helpers.broadcast_update(@ticket.column.board)
  end

  def move
    dest_col = Column.find_by(board_id: params[:board_id], order: params[:dest_col_idx])
    if(params[:src_col_idx] == params[:dest_col_idx])
      dest_tickets = dest_col.tickets
      update_ticket_order_same_col(dest_tickets, params[:src_ticket_idx], params[:dest_ticket_idx])
    else
      src_col = Column.find_by(board_id: params[:board_id], order: params[:src_col_idx])
      update_ticket_order_diff_col(src_col, dest_col, params[:src_ticket_idx], params[:dest_ticket_idx])
    end
    helpers.broadcast_update(Board.find(params[:board_id]))
  end

  private

  def ticket_params
    params.require(:ticket).permit(:title, :column_id, :order)
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

  def update_ticket_order_diff_col(src_col, dest_col, src_ticket_idx, dest_ticket_idx)
    src_tickets = src_col.tickets
    dest_tickets = dest_col.tickets
    moved_ticket = src_tickets.find_by(order: params[:src_ticket_idx])

    src_tickets.where('"order" > ?', src_ticket_idx).update_all('"order" = "order" - 1')
    dest_tickets.where('"order" >= ?', dest_ticket_idx).update_all('"order" = "order" + 1')
    moved_ticket.update(column_id: dest_col.id, order: dest_ticket_idx)
  end

  def delete_ticket_and_update_order(ticket)
    tickets = ticket.column.tickets
    tickets.where('"order" > ?', ticket.order).update_all('"order" = "order" - 1')
    ticket.destroy
  end
end
