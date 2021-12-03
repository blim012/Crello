class Api::V1::ColumnsController < ApplicationController
  def create
    @column = Column.new(column_params)
    if @column.save
      render json: @column
    else
      render json: { errors: @column.errors.full_messages }
    end
  end

  private

  def column_params
    params.require(:column).permit(:title, :board_id, :order)
  end
end
