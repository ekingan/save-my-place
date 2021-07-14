class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :description
      t.datetime :start_time, null: false
      t.datetime :end_time
      t.string :photo_url
      t.text :details
      t.integer :capacity
      t.boolean :is_public, null: false, default: true
      t.string :url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
