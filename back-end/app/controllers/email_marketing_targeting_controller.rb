require 'openai'

class EmailMarketingTargetingController < ActionController::API
  def create
    client = OpenAI::Client.new
    system_prompt = "Respond with json in 1 sentence to the user message"

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
