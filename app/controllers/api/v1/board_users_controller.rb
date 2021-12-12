class Api::V1::BoardUsersController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery prepend: true

  def invite
    user = User.find_by(email: params[:email])
    board = Board.find_by(id: params[:board_id])
    if user && board
      begin
        @board_user = BoardUser.new(user_id: user.id, board_id: board.id)
        if @board_user.save
          render json: @board_user
        else
          render json: { errors: @board_user.errors.full_messages }
        end
      rescue ActiveRecord::RecordNotUnique
        render json: { errors: 'User has already been invited to the board' }
      end
    else
      unless user
        render json: { errors: 'No user of that email exists' }
      else
        render json: { errors: 'Board does not exist' }
      end
    end
  end

  def leave
    user_id = current_user.id
    @board_user = BoardUser.find_by(user_id: user_id, board_id: params[:board_id])
    if @board_user
      render json: { message: 'Successfully left board' }
    else
      render json: { errors: 'Could not find board' }
    end
  end
end
