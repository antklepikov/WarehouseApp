class Product < ApplicationRecord
  has_many :orders

  has_many :products_warehouses, dependent: :destroy
  has_many :warehouses, through: :products_warehouses, dependent: :destroy

  paginates_per 5
end
