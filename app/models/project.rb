# frozen_string_literal: true

# Project model belongs to User.
class Project < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy

  validates :title, presence: true, length: { maximum: 120 }
  validates :user_id, presence: true
end
