# PhotoGram API

This is a RESTful API Express Server for the PhotoGram App Client.

## Technologies

<img src='https://cdn.iconscout.com/icon/free/png-512/nodejs-2-226035.png' width='25px'>
Node.js
<img src='https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png' width='15px'>
JavaScript

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Endpoints

`/` = landing page. Suports GET method.

`/signup` = sign up. Supports POST method.

`/login` = login. Supports POST method.

### Protected Endpoitns

`/user/:user_id` = specified users account data. Supports GET and PATCH methods.

`/user/:user_id/images/:image_id` = spcified users individual image. Supports PATCH and DELETE methods.

`/user/:user_id/albums/addAlbum` = creates new albums in specifed users data. Supports POST method

`/user/albums/:album_id` = specified user and album data. Supports DELETE method.

`/user/user_id/albums//editAlbum/:album_id` = edit specified users album. Suports PATCH method.

`/upload/:user_id` = image upload to specified user. Supoorts POST method.
