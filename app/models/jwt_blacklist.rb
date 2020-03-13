# frozen_string_literal: true

# Model for Devise-JWt with using blacklist method.
class JwtBlacklist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Blacklist
  self.table_name = 'jwt_blacklists'
end
