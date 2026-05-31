# AI_Career_Coach (Whatsapp-Saas Backend)

Backend service built with **Node.js (Express)** and **Socket.IO**. It provides user authentication/activation APIs and a protected profile endpoint.

## Tech Stack
- Node.js (ES Modules)
- Express
- Socket.IO
- MongoDB (via Mongoose)
- JSON Web Token (JWT)
- Nodemailer + EJS templates (email activation)

## Project Structure (high level)
- `src/app.js` - Express app + middleware + `/api` mounting
- `index.js` - HTTP server + Socket.IO setup + server start
- `src/routes/v1/*` - Versioned API routes
- `src/controllers/*` - Request handlers
- `src/services/*` - Business logic
- `src/middlewares/*` - Auth middleware
- `src/utils/*` - JWT/response helpers
- `src/database/mongo.db.js` - MongoDB connection

## Base URLs
- REST API: `http://<HOST>:<PORT>/api`
- API v1: `http://<HOST>:<PORT>/api/v1`

Example (defaults):
- `HOST`: `0.0.0.0`
- `PORT`: `4000`

## Prerequisites
- Node.js installed
- MongoDB instance/connection available

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file: `.env`
3. Start in dev mode:
   ```bash
   npm run dev
   ```
   Or start normally:
   ```bash
   npm start
   ```

## Environment Variables
The config currently uses these variables:
- `NODE_ENV` (default: `development`)
- `PORT` (default: `4000`)
- `HOST` (default: `0.0.0.0`)

> Note: Additional env vars (e.g., JWT secret, Mongo URI, email credentials) may be required by the services in `src/services/*`.
> Add them as needed based on your deployment.

## API Endpoints

### Auth
#### Register
- **POST** `/api/v1/auth/register`
- Body (JSON):
  ```json
  {
    "name": "<string>",
    "email": "<string>",
    "password": "<string>"
  }
  ```
- Response: success response via `successResponse(...)` (includes created user and token as implemented in controller)

#### Login
- **POST** `/api/v1/auth/login`
- Body (JSON):
  ```json
  {
    "email": "<string>",
    "password": "<string>"
  }
  ```
- Response: token + user via `successResponse(...)`

### Activation
Account activation supports both **POST** and **GET**.

#### Activate (POST)
- **POST** `/api/v1/activation/activate`
- Body (JSON):
  ```json
  {
    "activationToken": "<token>",
    "activationCode": "<code>"
  }
  ```

#### Activate (GET)
- **GET** `/api/v1/activation/activate?activationToken=<token>&activationCode=<code>`

### User
#### Profile (Protected)
- **GET** `/api/v1/user/profile`
- Protected by `src/middlewares/auth.middleware.js`

Authorization:
- Send JWT in the request as required by the middleware (commonly an `Authorization: Bearer <token>` header).

## Socket.IO
`index.js` sets up Socket.IO on the same HTTP server.

- Client should connect to the server and emit:
  - **Event:** `message`
  - **Payload:** any JSON/string `data`

Server behavior:
- Logs incoming message
- Broadcasts to all clients:
  - **Event:** ` receive_message` (note the leading space)
  - **Payload:** the same `data`

> If you’re building the frontend, ensure you listen for the exact event name: `" receive_message"`.

## Notes / Known Issues
- Global error handler in `src/app.js` sends:
  ```json
  { "message": "Something went wrong! Try again" }
  ```

## License
ISC

