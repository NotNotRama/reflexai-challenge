# Chatbot Application

This project is a simple chatbot application built with Next.js (pages router), TypeScript, React Query, ShadCN, Prisma, SQLite, Tailwind CSS, and Axios. The application allows users to engage in a conversation with a bot that simulates basic responses. The app also handles API errors and simulates response delays to mimic real-world behavior. It includes error boundaries for better error management, and the chat history is stored using Prisma and SQLite.

## Features

- **Chat Interface**: Users can input their name, type a message, and receive responses from a bot.
- **Random Bot Responses**: The bot responds with one of several predefined responses.
- **Error Simulation**: Users can type `error` to simulate an API error or `throw error` to trigger an application error handled by an error boundary.
- **Delayed Responses**: The bot responses are delayed to simulate real-world interactions with a server.
- **Accessible UI**: Built using ShadCN components, the app follows modern accessibility standards.
- **Chat History**: The application stores chat histories with the chat transcript, message authors, and timestamps.
- **Admin Dashboard**: Access a basic admin dashboard to view all chat histories.

## Tech Stack

- Next.js (pages router)
- TypeScript
- Prisma
- SQLite
- React Query
- Axios
- ShadCN
- Tailwind
- Vitest
- React Testing Library (RTL)
- Axe

## Installation

### Prerequisites


### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/NotNotRama/reflexai-challenge.git
   cd reflexai-challenge
   ```
   
2. Set up environment variables:
   Create a `.env` file in the root of your project with the following:
   ```
   DATABASE_URL="file:./dev.db"
   ```
   
3. Install dependencies:
   ```bash
   pnpm i
   ```

4. Generate Prisma client and database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Chatting with the Bot

1. Enter your name in the input field.
2. Type a message and click Send.
3. The bot will respond with a random message after a short delay.
4. Type `error` to simulate an API error.
5. Type `throw error` to trigger an application error that will be handled by the error boundary. (use `pnpm build`)

### Admin Dashboard

Access the chat history via the admin dashboard at `/admin/dashboard`. You can view all messages with the author's name and timestamps.


## API

The API is implemented using Next.js API routes and Prisma to store messages.

## Testing

Unit and integration tests are provided using Vitest and React Testing Library (RTL). Axe was also used to test accessibility.

### Run Tests

To run the test suite, use:

```bash
pnpm test
```

If you want to use Vitest UI instead, use:
```bash
pnpm vitest --ui
```

![image](https://github.com/user-attachments/assets/40954fe5-8b26-4af2-a71d-14218a3ab631)

## Accessibility

The app is built with ShadCN components, ensuring that the UI is accessible and follows best practices for web accessibility.

## Screenshots/gifs

![chrome_qwv7ZTny3T](https://github.com/user-attachments/assets/ddcf3abe-110e-4dd3-b7bf-997a266bdc91)


