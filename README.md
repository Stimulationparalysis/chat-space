# DB設計

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|string|null: true|
|image|text|null: true|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- has_many :groups, through: members
- has_many :users, through: members

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false|
|user_id|integer|null: false|
|group_id|references|null: false, foreign_key: true|

### Association
- has_many :groups, through: members
- has_many :messages
- has_many :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupName|string|index: true, null: false, unique: true|
|chatMember|string|null: false|
|group_id|integer|null: false|
|user_id|references|null: false, foreign_key: true|

### Association
- has_many :users, through: members
- has_many :members