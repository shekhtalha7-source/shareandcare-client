# ShareAndCare

ShareAndCare is a community events platform where people can discover, create, manage and join social service and community events such as charity drives, elderly care home visits, blood donation camps and cleanup campaigns.

## Live Links

- **Client (Live Site):** https://shareandcare-client.vercel.app
- **Server (API):** https://shareandcare-server.vercel.app
- **Server Repository:** https://github.com/shekhtalha7-source/shareandcare-server

## Purpose

The goal of this project is to bring people together for social good. Anyone can post an event, and other users can join it, so volunteers and organizers can connect easily.

## Key Features

- **Authentication:** Secure login and registration with token-based (JWT) protection for private routes
- **Create Events:** Logged-in users can add new events with title, description, type, thumbnail, location and date
- **Date Validation:** Events can only be created for a future date
- **Browse Events:** View all upcoming events in one place
- **Event Details:** See full information about any event
- **Join Events:** Join events and track them on a separate "Joined Events" page
- **Manage Events:** Edit or delete only the events you created
- **Search and Filter:** Find events by title or event type
- **Responsive Design:** Works on mobile, tablet and desktop

## Pages

| Page | Description |
|------|-------------|
| Home | Banner, featured events and platform highlights |
| Upcoming Events | List of all upcoming events |
| Event Details | Full details with a Join button |
| Add Event | Private page to create an event |
| Manage Events | Private page to edit or delete your events |
| Joined Events | Private page listing events you joined |
| Login / Register | User authentication |

## Tech Stack

**Frontend**
- Next.js
- React
- Tailwind CSS
- TypeScript

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT (JWKS verification)

**Deployment**
- Vercel (client and server)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- A MongoDB database (MongoDB Atlas)

### Installation

1. Clone the repository

```bash
git clone https://github.com/shekhtalha7-source/shareandcare-client.git
cd shareandcare-client/shareandcare
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the project root and add your values

```
NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL
```

4. Run the development server

```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Check code with ESLint |

## Project Structure

```
shareandcare/
├── public/        # Static files and images
├── src/           # Pages, components and app logic
├── package.json
└── next.config.ts
```

## Deployment

The project is deployed on Vercel. Every push to the `main` branch triggers an automatic redeploy.

## Author

Made by **Shake Talha**

GitHub: https://github.com/shekhtalha7-source
