# spec/requests/email_marketing_targeting_spec.rb
require 'rails_helper'

RSpec.describe 'EmailMarketingTargeting', type: :request do
  describe 'POST /create' do
    let(:valid_params) { { user_prompt: "test prompt" } }
    let(:mock_response) { { some: 'json', response: 'value' }.to_json }

    before do
      allow_any_instance_of(OpenAI::Client).to receive(:chat).and_return(mock_response)
    end

    it 'calls the OpenAI API with expected parameters and returns json' do
      post '/email_marketing_targeting', params: valid_params
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq(mock_response)
    end
  end
end
