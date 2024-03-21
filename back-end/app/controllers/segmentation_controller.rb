require 'openai'

class SegmentationController < ActionController::API
  def generate
    client = OpenAI::Client.new
    system_prompt = SegmentationService.system_prompt

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
