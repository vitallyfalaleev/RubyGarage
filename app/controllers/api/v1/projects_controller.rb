# frozen_string_literal: true

class Api::V1::ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: %i[update destroy]

  def index
    projects = Project.where(user_id: params[:user_id])
    options = {
        included: [:tasks]
    }
    render json: ProjectsSerializer.new(projects, options).serialized_json
  end

  def create
    project = Project.new(project_params)
    if project.save
      options = {
          included: [:tasks]
      }
      render json: ProjectsSerializer.new(project, options).serialized_json
    else
      render json: { status: 422, error: project.errors }
    end
  end

  def update
    if @project.update_attributes(project_params)
      render json: { status: 200 }
    else
      render json: { status: 422, error: 'something wrong' }
    end
  end

  def destroy
    @project.destroy
    render json: { status: 204 }
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:title, :user_id)
  end
end
