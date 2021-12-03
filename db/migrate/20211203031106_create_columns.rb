class CreateColumns < ActiveRecord::Migration[6.1]
  def change
    create_table :columns do |t|
      t.string :title
      t.references :board
      t.integer :order

      t.timestamps
    end
  end
end
