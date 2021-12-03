class Board < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: 'user_id'
  has_many :board_users
  has_many :invited_users, through: :board_users, source: :user
  has_many :columns
end
