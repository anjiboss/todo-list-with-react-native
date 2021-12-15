# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Build? :
   `npm run build` or `yarn build`.
   Production mode:
   `npm start` or `yarn start`.
4. Development:

   - Typescript Watch mode:
     `npm run watch` or `yarn watch`.
   - Run with `nodemon`:
     `npm run dev` or `yarn dev`.

   - Run With `Concurrently` (easiest way to run, just with 1 command)
     - `npm run con` or `yarn con`
     - _Note_ : To run this you must have [Concurrently](https://github.com/open-cli-tools/concurrently) installed Global or Install it as dev dependency

# API

-Version 1:

- `GET`
  - `/v1/api/todo`: Get All _Uncompleted_ Todos
  - `/v1/api/todo/completed`: Get All _Completed_ Todos
- `POST`:
  - `/v1/api/todo`: Add New Todo (status is setted to `false` by default)
- `PUT`:
  - `/v1/api/todo`: Toggle Current Todo status.
