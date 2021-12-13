require 'rails_helper'

RSpec.describe Column, type: :model do
  describe 'associations' do
    it { should belong_to(:board).required }
    it { should have_many(:tickets) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_length_of(:title).is_at_most(256) }
    it { should validate_presence_of(:order) }
  end
end
