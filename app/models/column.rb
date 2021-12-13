class Column < ApplicationRecord
  belongs_to :board, required: true
  has_many :tickets, dependent: :destroy

  validates :title, presence: true, length: { maximum: 256 }
  validates :order, presence: true
end
