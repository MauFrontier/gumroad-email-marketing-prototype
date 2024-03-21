require 'rails_helper'

RSpec.describe SegmentationService do
  describe '.system_prompt' do
    it 'returns a non-empty string' do
      expect(SegmentationService.system_prompt).to be_a(String)
      expect(SegmentationService.system_prompt).not_to be_empty
    end
  end
end