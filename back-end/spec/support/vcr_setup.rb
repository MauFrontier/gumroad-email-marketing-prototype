require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = "spec/fixtures/vcr_cassettes"
  config.hook_into :webmock
  config.configure_rspec_metadata!
  # Automatically filter sensitive information
  config.filter_sensitive_data('<API_KEY>') { ENV['OPENAI_ACCESS_TOKEN'] }
end
