class Api::V1::BoardSerializer < ActiveModel::Serializer
  attributes :id, :title, :creator, :ordered_columns

  def ordered_columns
    columns = object.columns.order(:order)
    columns.collect do |column|
      { 
        id: column.id, 
        title: column.title,
        order: column.order,
        tickets: ordered_tickets(column)
      }
    end
  end

  private

  def ordered_tickets(column)
    tickets = column.tickets.order(:order)
    tickets.collect do |ticket|
      {
        id: ticket.id,
        order: ticket.order,
        title: ticket.title,
      }
    end
  end
end
