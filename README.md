# Node integrations with MySQL

ig_clone DATABASE

root: `http://localhost:4001`

| Route                   | CRUD  |                                               Function |
| ----------------------- | :---: | -----------------------------------------------------: |
| `/users`                |  GET  |                                          get all users |
| `/users/create_user`    | POST  |                     create a new user with hashed pass |
| `/users/login`          | POST  |                                             login user |
| `/users/:id`            |  GET  | get user by id and send images,comments posted by user |
| `/photos`               |  GET  |                                         get all photos |
| `/photos/:id`           |  GET  |                                        get photo by id |
| `/photos/create_photo`  | POST  |                                       post a new photo |
| `/photos/user/:user_id` |  GET  |                get all photos posted a user by user_id |
| `/comments`             |  GET  |                                       get all comments |

## Nested JSON GET request
```js
router.get('/:id', (req, res) => {
  db.query(user_queries.find_user_by_id_sub, [[req.params.id]], (error, user_results) => {
    if (error) throw error;
    db.query(user_queries.find_user_by_id, [[req.params.id]], (error, photo_results) => {
      if (error) throw error;
      db.query(user_queries.get_comments_by_id, [[req.params.id]], (error, comment_results) => {
        if (error) throw error;
        return_results = {
          "user_id": user_results[0].id,
          "email": user_results[0].email,
          "password": user_results[0].password,
          "user_created": user_results[0].created_at,
          "post_count": photo_results.length,
          "posts": photo_results,
          "comments": comment_results
        }
        return res.status(200).send(return_results)
      });
    });
  });
})
```
RESULT
`http://localhost:4001/users/101`
```json
{
  "user_id": 101,
  "email": "Abdullah84@yahoo.com",
  "password": "123",
  "user_created": "2021-06-10T13:43:25.000Z",
  "post_count": 1,
  "posts": [
    {
      "image_id": 26,
      "image_url": "http://placeimg.com/640/480",
      "created_at": "2021-09-18T02:39:29.000Z"
    }
  ],
  "comments": [
    {
      "id": 56,
      "content": "Quia est qui libero amet numquam.",
      "user_id": 101,
      "photo_id": 80
    },
    {
      "id": 243,
      "content": "Omnis occaecati in aliquid rerum exercitationem.",
      "user_id": 101,
      "photo_id": 52
    }
  ]
}
``` 