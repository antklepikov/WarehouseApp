class Order < ApplicationRecord

  # enum status: %i[active approved declined]
  enum status: { active: 0, approved: 1, declined: 2 }
  belongs_to :product
  belongs_to :store
  belongs_to :warehouse

end
