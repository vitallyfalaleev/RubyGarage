class AddDoneToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :done, :boolean, null: false, default: false
  end
end
