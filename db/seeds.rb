# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: "a@a.com", password: "aaaaaa", password_confirmation: "aaaaaa")
User.create(email: "b@b.com", password: "bbbbbb", password_confirmation: "bbbbbb")
User.create(email: "c@c.com", password: "cccccc", password_confirmation: "cccccc")

Board.create(title: 'board1', user_id: 1)
Board.create(title: 'board11', user_id: 1)
Board.create(title: 'board2', user_id: 2)

BoardUser.create(user_id: 2, board_id: 1)

Column.create(title: 'column1', board_id: 1, order: 0)
Column.create(title: 'column2', board_id: 1, order: 1)
Column.create(title: 'column3', board_id: 1, order: 2)

Ticket.create(title: 'ticket11', description: 'desc1', column_id: 1, order: 0)
Ticket.create(title: 'ticket12', description: 'desc1', column_id: 1, order: 1)
Ticket.create(title: 'ticket13', description: 'desc1', column_id: 1, order: 2)
Ticket.create(title: 'ticket21', description: 'desc1', column_id: 2, order: 0)
Ticket.create(title: 'ticket22', description: 'desc1', column_id: 2, order: 1)
Ticket.create(title: 'ticket23', description: 'desc1', column_id: 2, order: 2)
Ticket.create(title: 'ticket31', description: 'desc1', column_id: 3, order: 0)
Ticket.create(title: 'ticket32', description: 'desc1', column_id: 3, order: 1)
Ticket.create(title: 'ticket33', description: 'desc1', column_id: 3, order: 2)

Column.create(title: 'column1', board_id: 2, order: 0)
Column.create(title: 'column2', board_id: 2, order: 1)
Column.create(title: 'column3', board_id: 2, order: 2)

Ticket.create(title: 'ticket11', description: 'desc1', column_id: 4, order: 0)
Ticket.create(title: 'ticket12', description: 'desc1', column_id: 4, order: 1)
Ticket.create(title: 'ticket13', description: 'desc1', column_id: 4, order: 2)
Ticket.create(title: 'ticket21', description: 'desc1', column_id: 5, order: 0)
Ticket.create(title: 'ticket22', description: 'desc1', column_id: 5, order: 1)
Ticket.create(title: 'ticket23', description: 'desc1', column_id: 5, order: 2)
Ticket.create(title: 'ticket31', description: 'desc1', column_id: 6, order: 0)
Ticket.create(title: 'ticket32', description: 'desc1', column_id: 6, order: 1)
Ticket.create(title: 'ticket33', description: 'desc1', column_id: 6, order: 2)
