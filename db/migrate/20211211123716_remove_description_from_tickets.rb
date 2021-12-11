class RemoveDescriptionFromTickets < ActiveRecord::Migration[6.1]
  def change
    remove_column :tickets, :description, :string
  end
end
