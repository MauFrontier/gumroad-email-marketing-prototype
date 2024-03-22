require 'rails_helper'

RSpec.describe SegmentationService do
  describe '.generate_system_prompt' do
    let(:current_date) { Time.now.utc.iso8601 }
    let(:user_timezone) { "America/Costa_Rica" }
    let(:invalid_products_str) { "Invalid JSON" } # Invalid JSON
    let(:valid_products_str) { '[{"key":"custom-product","value":"Custom Product"}]' } # Valid JSON
    let(:default_products_key) { "brush-pack-1" } # Key from default products

    context 'with invalid products JSON string' do
      it 'uses default products' do
        system_prompt = SegmentationService.generate_system_prompt(current_date, user_timezone, invalid_products_str)

        expect(system_prompt).to be_a(String)
        expect(system_prompt).not_to be_empty
        expect(system_prompt).to include(current_date)
        expect(system_prompt).to include(user_timezone)
        expect(system_prompt).to include(default_products_key)

        expect(system_prompt).not_to include('{{CURRENT_DATE}}')
        expect(system_prompt).not_to include('{{USER_TIMEZONE}}')
        expect(system_prompt).not_to include('{{REAL_PRODUCTS_ARRAY}}')
      end
    end

    context 'with valid products JSON string' do
      it 'uses the provided products' do
        system_prompt = SegmentationService.generate_system_prompt(current_date, user_timezone, valid_products_str)

        expect(system_prompt).to be_a(String)
        expect(system_prompt).not_to be_empty
        expect(system_prompt).to include(current_date)
        expect(system_prompt).to include(user_timezone)
        expect(system_prompt).to include('"key":"custom-product"')
        expect(system_prompt).to include('"value":"Custom Product"')

        expect(system_prompt).not_to include('{{CURRENT_DATE}}')
        expect(system_prompt).not_to include('{{USER_TIMEZONE}}')
        expect(system_prompt).not_to include('{{REAL_PRODUCTS_ARRAY}}')
      end
    end
  end
end
