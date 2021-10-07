const photo_queries = {
  find_photo_by_id:
    `SELECT
    photos.id AS id,
    image_url,
    photos.created_at,
    email,
    users.id AS user_id
    FROM photos 
    JOIN users ON photos.user_id = users.id
    WHERE photos.id = (?) `,
  get_photos_by_user_id:
    `SELECT  
    photos.id AS photo_id,
    image_url,
    photos.created_at
    FROM photos
    JOIN users ON users.id = photos.user_id
    WHERE users.id = (?) `
}

module.exports = photo_queries