require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:board_users) }
    it { should have_many(:invited_boards).class_name('Board') }
    it { should have_many(:boards) }
  end
end
