class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
      t.string :title
      t.integer :order
      t.string :description
      t.references :column

      t.timestamps
    end
  end
end
