class Column < ApplicationRecord
  belongs_to :board
  has_many :tickets
end
