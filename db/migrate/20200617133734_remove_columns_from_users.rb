class RemoveColumnsFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :tokens
    remove_column :users, :uid
    remove_column :users, :provider
    remove_column :users, :allow_password_change
  end
end
