class Board < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: 'user_id', required: true
  has_many :board_users, dependent: :destroy
  has_many :invited_users, through: :board_users, source: :user
  has_many :columns, dependent: :destroy

  validates :title, presence: true, length: { maximum: 80 }
end
