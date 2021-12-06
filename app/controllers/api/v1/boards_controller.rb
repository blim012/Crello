class Api::V1::BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user_boards = current_user.boards
    @invited_boards = current_user.invited_boards
    render json: { userBoards: @user_boards, invitedBoards: @invited_boards }
  end

  def create
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
