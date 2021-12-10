class Api::V1::BoardsController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery prepend: true

  def index
    @user_boards = current_user.boards
    @invited_boards = current_user.invited_boards
    render json: { userBoards: @user_boards, invitedBoards: @invited_boards }
  end

  def show
    @board = Board.find_by(id: params[:id])
    if @board
      render json: @board
    else
      render json: { no_board_found: params[:id] }
    end
  end

  def create
    @board = current_user.boards.build(board_params)
    if @board.save
      render json: @board
    else
      render json: { errors: @board.errors.full_messages }
    end
  end

  def destroy
    @board = Board.find(params[:id])
    board_id = @board.id
    current_user_boards = current_user.boards
    if current_user_boards.find_by(id: board_id)
      @board.destroy
      render json: { message: 'Successfully deleted board' }
      broadcast_board_delete(board_id)
    else
      render json: { errors: 'Only board owner may delete the board' }
    end
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end

  def broadcast_board_delete(board_id)
    ActionCable.server.broadcast("board_#{board_id}", {
      delete: board_id
    })
  end
end
