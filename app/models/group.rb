class Group < ApplicationRecord
  has_many :group_users
  has_many :users
  validates :name, presence: true
end
