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

  private

  def column_params
    params.require(:column).permit(:title, :board_id, :order)
  end

  def get_board
    Board.find_by(id: params[:board_id])
  end
end
