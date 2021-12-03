class CreateBoardUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :board_users do |t|
      t.references :user
      t.references :board
      t.boolean :admin

      t.timestamps
    end
  end
end
