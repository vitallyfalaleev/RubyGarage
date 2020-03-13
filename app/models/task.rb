# frozen_string_literal: true

# Task model for Projects
class Task < ApplicationRecord
  belongs_to :user
  belongs_to :project

  validates :name, presence: true, length: { maximum: 120 }
  validates :user_id, presence: true
  validates :project_id, presence: true
end
