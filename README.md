# images-service

This project is aiming to serve as an images upload micro service to use whenever you need to deal with images upload.

## Build

Install the dependencies.

```bash
$ npm install
```

Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

```bash
# run containers in the background
$ npm run docker:start

# follow API log output.
$ npm run docker:logs

# get an interactive prompt.
$ npm run docker:exec
```

## Environment variables

| Name             | Required | Type      | Default value | Description                    |
| ---------------- | -------- | --------- | ------------- | ------------------------------ |
| `PORT`           | true     | `integer` | -             | -                              |
| `DB_URL`         | true     | `string`  | -             | -                              |
| `JWT_SECRET_KEY` | true     | `string`  | -             | -                              |
| `UPLOAD_DST`     | false    | `string`  | ./uploads     | where to store uploaded images |

## Documentation

POST `/users/signup`

Request example

```json
{
  "email": "email@gmail.com",
  "username": "ifarahi",
  "password": "helloWorld"
}
```

Response example

```json
{
  "email": "email@gmail.com",
  "username": "ifarahi",
  "createdAt": "2021-08-21T22:17:51.548Z",
  "updatedAt": "2021-08-21T22:17:51.548Z"
}
```

POST `/users/login`

Request example

```json
{
  "username": "ifarahi",
  "password": "helloWorld"
}
```

Response example

```json
{
  "apiKey": "eyJhbGciOiJ..."
}
```

POST `/images`

Request example

> Body: form-data

```json
{
  "image": "my-image.jpg"
}
```

Response example

```json
{
  "statusCode": 201,
  "message": "succussfully uploaded",
  "imageUrl": "image-1630076535553-123401023.jpeg"
}
```

## Fetching static image

GET `/static/{imageUrl}`
