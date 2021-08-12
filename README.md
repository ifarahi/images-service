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

| Name           | Required | Type      | Default value | Description |
| -------------- | -------- | --------- | ------------- | ----------- |
| `PORT`         | true     | `integer` | -             | -           |
| `DATABASE_URL` | true     | `string`  | -             | -           |
