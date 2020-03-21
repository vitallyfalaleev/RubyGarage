# frozen_string_literal: true

class ApplicationController < ActionController::API
  def render_resource(resource)
    if resource.errors.empty?
      render json: { status: 200, data: resource }
    else
      render json: { status: 422, errors: resource.errors }
    end
  end
end
