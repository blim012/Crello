class RemoveAdminFromBoardUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :board_users, :admin, :boolean
  end
end
