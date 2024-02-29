# Music Sharing app
Built using MVC design pattern. <br>
1. allowing users to do CRUD operations like:
    - `GET`: (songs, artists, genres).
    - `POST`: (songs, artists, genres).
    - `PUT`: (songs, artists, genres).
    - `DELETE`: (songs, artists, genres).
2. Register and login
3. Authenticatetion and Authorization.
    - Utilize Passportjs, sessions to Authenticate users.
    - Authorization done by allowing only the user who created the (song, artist, genre) to update or delete it.


## Database Schema
![database schema](./docs/DB-Schema.png)

## what I learned
- Handling uploded files using `multer`.
- Host Imgaes on `Cloudinary`.
- Form Validation with `express-validator`.
- Mongoose.
- Cookies and sessions
- Passportjs
- pug.js

## Routes.
- auth/singup.
    - registration form.
- auth/login.
    - login form.
- catalog/
    - The home/index page.
- catalog/`objects`/ 
    - The list of all songs, artists or genres (e.g. /catalog/songs/, /catalog/genres/, etc.)
- catalog/`object`/`id` 
    - The detail page for a specific song, artist user, or genre with the given _id.
- catalog/`object`/create 
    - The form to create a new song, artist or genre (e.g. /catalog/song/create).
- catalog/`object`/`id`/update 
    - The form to update a specific song, artist or genre with the given _id.
- catalog/`object`/`id`/delete 
    - The form to delete a specific song, artist or genre with the given _id.