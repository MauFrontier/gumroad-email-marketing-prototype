require 'rails_helper'

RSpec.describe SegmentationService do
  describe '.generate_system_prompt' do
    let(:current_date) { Time.now.utc.iso8601 }
    let(:user_timezone) { "America/Costa_Rica" }
    let(:products_str) { "Test Product" }

    it 'returns a non-empty Markdown string with injected values' do
      system_prompt = SegmentationService.generate_system_prompt(current_date, user_timezone, products_str)

      expect(system_prompt).to be_a(String)
      expect(system_prompt).not_to be_empty

      expect(system_prompt).to include(current_date)
      expect(system_prompt).to include(user_timezone)
      expect(system_prompt).to include(products_str)
    end
  end
end
