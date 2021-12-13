class BoardUser < ApplicationRecord
  belongs_to :user, required: true;
  belongs_to :board, required: true;
end
