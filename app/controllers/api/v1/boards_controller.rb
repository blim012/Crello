class Api::V1::BoardsController < ApplicationController
  #skip_before_action :verify_authenticity_token

  def create
    #sign_in(:user, User.first)
    @board = current_user.boards.build(board_params)
    if @board.save
      render json: @board
    else
      render json: { errors: @board.errors.full_messages }
    end
  end

  def show
    @board = Board.where(id: params[:id])
    if @board
      render json: @board
    else
      render json: { errors: 'Board cannot be found' }
    end
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
