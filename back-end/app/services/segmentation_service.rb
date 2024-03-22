require 'json'

class SegmentationService
  def self.generate_system_prompt(current_date=nil, user_timezone=nil, products_str = nil)
  puts "[Debug] Starting generate_system_prompt with products_str: #{products_str}"
    markdown_path = Rails.root.join('app', 'assets', 'ai_contracts', 'segmentation_contract.md')
    default_products_path = Rails.root.join('app', 'assets', 'default_data', 'default_products.json')

    markdown_content = File.read(markdown_path)
    
    current_date ||= Time.now.utc.iso8601
    user_timezone ||= "UTC"

    begin
      products = JSON.parse(products_str) if products_str
    rescue JSON::ParserError => e
      Rails.logger.error("Failed to parse products_str as JSON: #{e.message}")
      products = JSON.parse(File.read(default_products_path))
    end

    products_markdown = products.is_a?(String) ? products : products.to_json

    markdown_content.gsub!('{{CURRENT_DATE}}', current_date)
    markdown_content.gsub!('{{USER_TIMEZONE}}', user_timezone)
    markdown_content.gsub!('{{REAL_PRODUCTS_ARRAY}}', products_markdown)

    markdown_content
  end
end
