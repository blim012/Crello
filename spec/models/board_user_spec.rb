require 'rails_helper'

RSpec.describe BoardUser, type: :model do
  describe 'associations' do
    it { should belong_to(:user).required }
    it { should belong_to(:board).required }
  end
end
