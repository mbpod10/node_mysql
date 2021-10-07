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
}

module.exports = photo_queries