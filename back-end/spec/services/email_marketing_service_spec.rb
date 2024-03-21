require 'rails_helper'

RSpec.describe EmailMarketingService do
  describe '.system_prompt' do
    it 'returns a non-empty string' do
      expect(EmailMarketingService.system_prompt).to be_a(String)
      expect(EmailMarketingService.system_prompt).not_to be_empty
    end
  end
end