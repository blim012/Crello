class Ticket < ApplicationRecord
  belongs_to :column, required: true

  validates :title, presence: true, length: { maximum: 512 }
  validates :order, presence: true
end
