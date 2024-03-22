Rails.application.routes.draw do
  post 'generate-segmentation' => 'segmentation#generate', as: :generate_segmentation
  
  get "up" => "rails/health#show", as: :rails_health_check

 # Catchall route for the React app
  get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  # Fallback route for the root path
  root 'application#fallback_index_html'

end
