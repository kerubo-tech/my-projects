require "test_helper"

class TdlistsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get tdlists_index_url
    assert_response :success
  end

  test "should get create" do
    get tdlists_create_url
    assert_response :success
  end

  test "should get update" do
    get tdlists_update_url
    assert_response :success
  end

  test "should get destroy" do
    get tdlists_destroy_url
    assert_response :success
  end
end
