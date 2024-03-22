require 'rails_helper'

RSpec.describe 'Segmentation', type: :request do
  describe 'POST /create' do
    let(:valid_params) {
      {
        user_prompt: "test prompt",
        current_date: Time.now.utc.iso8601,
        user_timezone: "America/Costa_Rica",
        products: "My product"
      }
    }
    let(:mock_response) { { some: 'json', response: 'value' }.to_json }

    before do
      allow_any_instance_of(OpenAI::Client).to receive(:chat).and_return(mock_response)
    end

    it 'calls the OpenAI API with expected parameters and returns json' do
      post '/generate-segmentation', params: valid_params
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq(mock_response)
    end

    it 'calls the OpenAI API without parameters and returns json' do
      post '/generate-segmentation'
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq(mock_response)
    end
  end
end
