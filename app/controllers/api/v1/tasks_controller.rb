class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    @tasks = Task.where(project_id: params[:project_id]).order("created_at DESC")
    render json: @tasks
  end

end