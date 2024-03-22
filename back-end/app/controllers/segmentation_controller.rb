class SegmentationController < ActionController::API
  include ActionController::Live

  def generate
    return render json: { error: "user_prompt is required" }, status: :bad_request unless params[:user_prompt].present?

    client = OpenAI::Client.new
    system_prompt = SegmentationService.generate_system_prompt(params[:current_date], params[:user_timezone], params[:products])

    response.headers['Content-Type'] = 'text/event-stream'

    stream_proc = proc do |chunk|
      response.stream.write(chunk.dig("choices", 0, "delta", "content"))
    end

    client.chat(
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
        }],
        stream: stream_proc
      }
    )

  rescue IOError
    # Client Disconnected
  ensure
    # Close the stream properly
    response.stream.close
  end

  private
end
