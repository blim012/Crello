require 'rails_helper'

RSpec.describe Ticket, type: :model do
  describe 'associations' do
    it { should belong_to(:column).required }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_length_of(:title).is_at_most(512) }
    it { should validate_presence_of(:order) }
  end
end
