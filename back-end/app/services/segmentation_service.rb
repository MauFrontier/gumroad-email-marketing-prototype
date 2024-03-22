class SegmentationService
  # Updates to directly inject the content of the default products JSON file
  def self.generate_system_prompt(current_date=nil, user_timezone=nil, products_str = nil)
    # Path to your markdown file within the Rails app
    markdown_path = Rails.root.join('app', 'assets', 'ai_contracts', 'segmentation_contract.md')
    # Path to the default products JSON file
    default_products_path = Rails.root.join('app', 'assets', 'default_data', 'default_products.json')

    # Load the Markdown content
    markdown_content = File.read(markdown_path)

    # Inject dynamic content into the Markdown
    current_date ||= Time.now.utc.iso8601
    user_timezone ||= "America/Costa_Rica"
    markdown_content.gsub!('{{CURRENT_DATE}}', current_date)
    markdown_content.gsub!('{{USER_TIMEZONE}}', user_timezone)

    # Use the provided products string or directly include the default products JSON string
    products_markdown = products_str || File.read(default_products_path)

    # Replace the products placeholder in the Markdown content
    markdown_content.gsub!('{{REAL_PRODUCTS_ARRAY}}', products_markdown)

    markdown_content
  end
end
