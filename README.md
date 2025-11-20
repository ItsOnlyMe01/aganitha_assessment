TinyLink — URL Shortener (Assignment Submission)

TinyLink is a full-stack URL shortener built using Next.js App Router, Prisma, and Neon Postgres.
It allows users to create short URLs, track clicks, view link statistics, and delete links.

Deployed as a Web Service on Render, this project follows all the required specifications given in the assignment.

🚀 Live Demo

👉 Live App:
https://aganitha-assessment.onrender.com/

👉 Demo Video (Loom):
https://www.loom.com/share/6a079d9374ae4e08b5ac23f1f8403baf

👉 GitHub Repository:
https://github.com/ItsOnlyMe01/aganitha_assessment

📖 Project Overview

TinyLink is a simple but complete URL shortener system with:

Custom short codes

Redirect functionality with click analytics

Dashboard for managing links

Stats page for individual links

Database-backed URL storage and analytics

Health check endpoint for automated testing

It is built using a modern full-stack architecture and deployed to Render.

🔧 Tech Stack
Frontend / Backend

Next.js 14+ (App Router)

React

TypeScript

Tailwind CSS

Database & ORM

Neon Postgres

Prisma ORM

Deployment

Render Web Service

🗂️ Folder Structure
src/
app/
page.tsx -> Dashboard page
layout.tsx -> Global layout
code/[code]/page.tsx -> Stats page
api/
links/
route.ts -> GET, POST (links)
links/[code]/route.ts -> GET stats, DELETE link
redirect/[code]/route.ts -> Redirect handler (302)
healthz/route.ts -> Health check endpoint

components/
AddLinkForm.tsx
LinkTable.tsx
CopyButton.tsx

lib/
prisma.ts -> Prisma client singleton

prisma/
schema.prisma -> Database schema
migrations/ -> Auto-generated migrations

.env.example
next.config.js
package.json

🧩 Core Features
✔ Create Short Links

Enter long URL

Optional custom code

Short code must be globally unique

Validation included

409 returned if code already exists

✔ Redirect

Visiting:

/{code}

Returns:

302 redirect to long URL

Increments click count

Updates lastClicked timestamp

✔ Dashboard

List all links

Short code

Target URL

Click count

Last clicked time

Delete link

Search/filter (optional)

✔ Stats Page

At:

/code/:code

Shows:

Target URL

Short URL

Total clicks

Created time

Last clicked time

✔ Delete

Removes link completely.
After deletion:

/{code}

returns 404.

✔ Health Check
/api/healthz

Returns:

{ "ok": true, "version": "1.0" }

🛠️ API Documentation
POST /api/links

Create a new short link.

Body:

{
"url": "https://example.com",
"code": "custom123"
}

Returns:

201 on success

409 if code exists

GET /api/links

Get all links.

GET /api/links/:code

Get stats for a single link.

DELETE /api/links/:code

Delete a link.

GET /api/redirect/:code

Redirect handler (increments clicks).

GET /api/healthz

Health check endpoint.

🔐 Environment Variables

Create .env file:

DATABASE_URL=your_neon_connection_string
NEXT_PUBLIC_BASE_URL=your_render_url

Also include a .env.example for reviewers.

▶️ Running Locally
npm install
npx prisma migrate dev
npm run dev

App runs on:

http://localhost:3000

🚀 Deployment (Render Web Service)
Build Command:
npm install && npm run build && npx prisma generate

Start Command:
npm start

Set env variables in Render:
DATABASE_URL=
NEXT_PUBLIC_BASE_URL=

✔ Autograder Requirements (All Implemented)

/healthz returns 200

/ shows dashboard

/code/:code shows stats

/api/links CRUD works correctly

/api/redirect/:code increments click count

Deleting a code results in 404

Stable API paths

Clean UI with Tailwind

Acknowledgements

This project was built as part of the Aganitha TinyLink assignment.
