class ProductsWarehouse < ApplicationRecord
  belongs_to :product, dependent: :destroy
  belongs_to :warehouse, dependent: :destroy

  validates :products_count,
            :warehouse_id,
            :product_id,
      presence: true
end
