class AddIndexToBoardUsers < ActiveRecord::Migration[6.1]
  def change
    add_index :board_users, [:user_id, :board_id], unique: true
  end
end
