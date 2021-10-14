const photo_queries = {
  home_photos:
    `SELECT 
    photos.id AS photo_id,
    username,
    image_url,
    photos.created_at,
    users.id AS user_id,
    profile_image,
    COUNT(comments.id) AS comments,
    caption
    FROM photos
    JOIN users ON users.id = photos.user_id
    JOIN profiles ON users.id = profiles.user_id
    JOIN comments ON photos.id = comments.photo_id
    GROUP BY comments.photo_id
    ORDER BY photos.created_at DESC LIMIT 10;`,
  get_photos_by_user_id:
    `SELECT  
    photos.id AS photo_id,
    image_url,
    photos.created_at
    FROM photos
    JOIN users ON users.id = photos.user_id
    WHERE users.id = (?) `,
  get_comments_by_photo_id:
    `SELECT
    comments.user_id AS commenter_id,
    content,
    users.username 
    FROM comments 
    JOIN photos ON comments.photo_id = photos.id
    JOIN users ON comments.user_id = users.id 
    WHERE photos.id = (?)`,
  find_photo_by_id:
    `SELECT
    photos.id AS id,
    image_url,
    photos.created_at,
    username,
    users.id AS user_id
    FROM photos 
    JOIN users ON photos.user_id = users.id
    WHERE photos.id = (?) `,
  get_comments:
    `SELECT 
    comments.content,
    comments.created_at,
    comments.user_id AS commenter_id,
    username 
    FROM comments
    JOIN photos ON photos.id = comments.photo_id
    JOIN users ON users.id = comments.user_id
    WHERE photos.id = (?)`
}

module.exports = photo_queries