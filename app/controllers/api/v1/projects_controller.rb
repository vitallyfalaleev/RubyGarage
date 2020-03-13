# frozen_string_literal: true

class Api::V1::ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: %i[update destroy]

  def index
    @projects = Project.where(user_id: params[:user_id]).order('created_at DESC')
    render json: @projects
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      render json: @project
    else
      render json: { status: 400, error: @project.errors }
    end
  end

  def update
    if @project.update_attributes(project_params)
      render json: { status: 200 }
    else
      render json: { status: 400, error: 'something wrong' }
    end
  end

  def destroy
    @project.destroy
    render json: { status: 200 }
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:title, :user_id)
  end
end
