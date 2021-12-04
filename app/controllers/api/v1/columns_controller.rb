class Api::V1::ColumnsController < ApplicationController
  protect_from_forgery
  
  def create
    @column = Column.new(column_params)
    if @column.save
      render json: @column
      helpers.broadcast_update(get_board)
    else
      render json: { errors: @column.errors.full_messages }
    end
  end

  def destroy

  end

  def move
    board = Board.find(params[:board_id])
    columns = board.columns
    update_col_order(columns, params[:src_idx], params[:dest_idx])
    helpers.broadcast_update(board)
  end

  private

  def column_params
    params.require(:column).permit(:title, :board_id, :order)
  end

  def get_board
    Board.find_by(id: params[:board_id])
  end

  def update_col_order(columns, from_idx, to_idx)
    moved_columns = columns.find_by(order: from_idx)
    if from_idx < to_idx
      columns.where('"order" > ? AND "order" <= ?', from_idx, to_idx).update_all('"order" = "order" - 1')
    else
      columns.where('"order" < ? AND "order" >= ?', from_idx, to_idx).update_all('"order" = "order" + 1')
    end
    moved_columns.update(order: to_idx)
  end
end
