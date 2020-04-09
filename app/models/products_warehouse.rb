class ProductsWarehouse < ApplicationRecord
  belongs_to :product, dependent: :destroy
  belongs_to :warehouse, dependent: :destroy
end
