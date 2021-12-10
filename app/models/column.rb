class Column < ApplicationRecord
  belongs_to :board
  has_many :tickets, dependent: :destroy
end
