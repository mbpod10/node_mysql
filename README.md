# Node integrations with MySQL

ig_clone DATABASE

root: `http://localhost:4001`

| Route                   | CRUD  |                                      Function |
| ----------------------- | :---: | --------------------------------------------: |
| `/users`                |  GET  |                                 get all users |
| `/users/create_user`    | POST  |            create a new user with hashed pass |
| `/users/login`          | POST  |                                    login user |
| `/users/:id`            |  GET  | get user by id and send images posted by user |
| `/photos`               |  GET  |                                get all photos |
| `/photos/:id`           |  GET  |                               get photo by id |
| `/photos/create_photo`  | POST  |                              post a new photo |
| `/photos/user/:user_id` |  GET  |       get all photos posted a user by user_id |
| `/comments`             |  GET  |                              get all comments |
