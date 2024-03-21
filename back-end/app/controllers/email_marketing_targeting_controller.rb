require 'openai'

class EmailMarketingTargetingController < ActionController::API
  def create
    client = OpenAI::Client.new
    system_prompt = "Respond with json in 1 sentence to the user message"

    # Assuming 'chat' or a similar method based on the documentation.
    # Adjust the parameters according to what's actually available and required.
    response = client.chat(
      parameters: {
        model: "gpt-4-0125-preview",
        response_format: {type: "json_object"},
        messages: [
        {
          role: "system",
          content: system_prompt
        },
        {
          role: "user",
          content: params[:user_prompt]
        }]
      }
    )
    
    render json: response
  end

  private

  
end
