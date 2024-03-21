require "test_helper"

class EmailMarketingTargetingControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get email_marketing_targeting_create_url
    assert_response :success
  end
end
