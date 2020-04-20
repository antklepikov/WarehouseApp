class Order < ApplicationRecord
  belongs_to :product
  belongs_to :store
  enum status: [:active, :approved, :declined]
  # attr_accessor :ordered_product
end
