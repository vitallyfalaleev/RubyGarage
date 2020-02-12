# frozen_string_literal: true

class ApplicationController < ActionController::API

  def render_resource(resource)
    if resource.errors.empty?
      render json: {status: 200, errors: resource}
    else
      render json: {status: 400, errors: resource.errors}
    end
  end

  def validation_error(resource)
    render json: resource, status: :bad_request
  end
end
