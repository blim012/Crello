require 'rails_helper'

RSpec.describe Board, type: :model do
  describe 'associations' do
    it { should belong_to(:creator).class_name('User').required }
    it { should have_many(:board_users) }
    it { should have_many(:invited_users).class_name('User') }
    it { should have_many(:columns) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_length_of(:title).is_at_most(80) }
  end
end
