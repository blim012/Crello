module ApplicationHelper
  def broadcast_update(board)
    serialized_board = ActiveModelSerializers::SerializableResource.new(
      board, { serializer: Api::V1::BoardSerializer }
    ).as_json
    ActionCable.server.broadcast("board_#{board.id}", {
      board: serialized_board
    })
  end
end
