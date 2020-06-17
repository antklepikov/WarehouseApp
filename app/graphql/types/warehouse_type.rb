module Types
  class WarehouseType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :number, Integer, null: true
    field :address, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user_id, Integer, null: false
    field :user, Types::UserType, null: false
  end
end
