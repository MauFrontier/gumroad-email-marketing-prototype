require 'rails_helper'

RSpec.describe 'Segmentation', type: :request, vcr: { cassette_name: "segmentation" } do
  describe 'POST /generate-segmentation' do
    let(:expected_response_structure) do
      {
        "result" => "success",
        "payload" => hash_including(
          "filterGroups" => array_including(
            hash_including(
              "filters" => array_including(
                hash_including(
                  "subject" => "Product",
                  "verb" => "Has bought",
                  "verbQualifier" => "Any",
                  "value" => match_array([
                    "Onewheel"
                  ])
                )
              )
            )
          )
        ),
        "errors" => []
      }
    end

    context 'with all valid parameters' do
      let(:valid_params) do
        {
          user_prompt: "someone who bought the Onewheel",
          current_date: Time.now.utc.iso8601,
          user_timezone: "America/Costa_Rica",
          products: '[{"key": "onewheel", "value": "Onewheel"}]'
        }
      end

      it 'calls the OpenAI API with expected parameters and returns json' do
        post '/generate-segmentation', params: valid_params
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to match(expected_response_structure)
      end
    end

    context 'with only user_prompt' do
      let(:user_prompt_only) { { user_prompt: "someone who bought the Onewheel" } }

      it 'accepts the request with only user_prompt and returns json' do
        post '/generate-segmentation', params: user_prompt_only
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to match(expected_response_structure)
      end
    end

    context 'without user_prompt' do
      it 'rejects the request without user_prompt' do
        post '/generate-segmentation', params: {}
        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)).to include("error" => "user_prompt is required")
      end
    end
  end
end
