class TdlistsController < ApplicationController
  def index
    tdlists = Tdlist.order("created_at DESC")
    render json: tdlists
  end

  def create
    tdlist = Tdlist.create(tdlist_param)
    render json: tdlist
  end

  def update
    tdlist = Tdlist.find(params[:id])
    tdlist.update_attributes(tdlist_param)
    render json: tdlist
  end

  def destroy
    tdlist = Tdlist.find(params[:id])
    tdlist.destroy
    head :no_content, status: :ok
  end

  private
  def tdlist_param
    params.require(:tdlist).permit(:title, :done)
  end
end
