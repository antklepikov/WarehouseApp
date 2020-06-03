class Warehouse < ApplicationRecord



  belongs_to :user
  has_many :orders, dependent:  :destroy
  has_many :products_warehouses, dependent: :destroy
  has_many :products, through: :products_warehouses, dependent: :destroy
  paginates_per 3

  validates :title,
            :address,
            :number,
            presence: true

  validates :title,
            :address,
            uniqueness: true
end
