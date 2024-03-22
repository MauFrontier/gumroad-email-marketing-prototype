class SegmentationService
  def self.generate_system_prompt(current_date=nil, user_timezone=nil, products_str = nil)
    markdown_path = Rails.root.join('app', 'assets', 'ai_contracts', 'segmentation_contract.md')
    default_products_path = Rails.root.join('app', 'assets', 'default_data', 'default_products.json')

    markdown_content = File.read(markdown_path)

    current_date ||= Time.now.utc.iso8601
    user_timezone ||= "UTC"
    products_markdown = products_str || File.read(default_products_path)

    markdown_content.gsub!('{{CURRENT_DATE}}', current_date)
    markdown_content.gsub!('{{USER_TIMEZONE}}', user_timezone)
    markdown_content.gsub!('{{REAL_PRODUCTS_ARRAY}}', products_markdown)

    markdown_content
  end
end
