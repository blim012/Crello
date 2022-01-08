# Crello

Crello is a clone of Trello, a Kanban based workflow management tool.

Crello implements the main base features of Trello, some of which include:
* Invites to other users to collaborate on a board
* Real-time board updates between users when making changes on a board
* Draggable tickets and columns
* Creation and management of multiple boards, tickets, and columns
* Horizonal scrolling on mouse drag

Created using React and Rails for the frontend and backend, respectively.
Horizontal scrolling via mouse drag was implemented using [react-indiana-drag-scroll](https://github.com/norserium/react-indiana-drag-scroll).
Draggable tickets and columns was implemented using [Dragula](https://github.com/bevacqua/dragula)

Tested using RSpec and [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers)
