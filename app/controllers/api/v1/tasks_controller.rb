# frozen_string_literal: true

class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: %i[update destroy]

  def index
    @tasks = Task.where(project_id: params[:project_id]).order('created_at DESC')
    render json: @tasks
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: { status: 304, error: @task.errors }
    end
  end

  def update
    if @task.update_attributes(task_params)
      render json: { status: 200 }
    else
      render json: { status: 304, error: 'something wrong' }
    end
  end

  def destroy
    @task.destroy
    render json: { status: 204 }
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :date, :project_id, :user_id, :done)
  end
end
