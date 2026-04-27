# Grubpack Content Broadcasting System

Backend-only content broadcasting system built for the Grubpack assignment.

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt
- Multer

## Deployed Backend
- Render URL: `https://grubpack-assignment.onrender.com`

## Project Structure
```text
backend/
	src/
		config/
		controllers/
		middlewares/
		models/
		routes/
		services/
		utils/
	uploads/
	architecture-notes.txt
frontend/
```

## Core Modules
- Auth Module
- Content Module
- Schedule Module
- Approval Workflow inside Content Module
- Public Broadcast Module

## Main Features

### Authentication & RBAC
- Teacher and Principal login
- JWT-protected private APIs
- Role-based route access

### Teacher Features
- Upload content with file, subject and scheduling window
- View own content list and detail
- Update own content
- Delete own non-approved content
- Resubmit rejected content
- View own content summary

### Principal Features
- View all content
- View pending content
- View content detail
- Approve or reject content
- Create and manage schedules
- View overall summary

### Public Broadcast Features
- Public live API by teacher
- Optional subject filtering
- Subject-wise active rotation logic
- Empty response handling when no content is active
- Rate limiting on the public live API

## Backend Setup

### 1. Install dependencies
Run inside `backend/`:

- `npm install`

### 2. Create environment variables
Create a `.env` file inside `backend/` with:

```env
PORT=3000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Start server
Run inside `backend/`:

- `npm start`

The server starts from `src/index.js`.

## Important Notes About Database
- Sequelize sync is currently used with `alter: true`.
- This is convenient for assignment development, but for production a migration-based flow is better.

## API Overview

### Auth APIs
- `POST /api/auth/signUp`
- `POST /api/auth/logIn`
- `POST /api/auth/logOut`
- `GET /api/auth/me`

### Content APIs
- `POST /api/content/upload-content`
- `GET /api/content/list-content`
- `GET /api/content/content-detail/:contentId`
- `PUT /api/content/update-content/:contentId`
- `DELETE /api/content/get-content/:contentId`
- `GET /api/content/content-summary`
- `GET /api/content/pending-content`
- `PATCH /api/content/update-content-status/:contentId`
- `PATCH /api/content/get-content/:contentId/resubmit`
- `GET /api/content/live/:teacherId`

### Schedule APIs
- `POST /api/schedule/create-schedule`
- `GET /api/schedule/list-schedule`
- `GET /api/schedule/schedule-detail/:scheduleId`
- `PUT /api/schedule/update-schedule/:scheduleId`
- `DELETE /api/schedule/delete-schedule/:scheduleId`

## Example API Usage

### Teacher upload content
`POST /api/content/upload-content`

Form-data fields:
- `title`
- `file`
- `subject`
- `description` (optional)
- `startTime`
- `endTime`
- `rotationDuration` (optional)

### Principal update content status
`PATCH /api/content/update-content-status/:contentId`

Approve:
```json
{
	"status": "approved"
}
```

Reject:
```json
{
	"status": "rejected",
	"rejectionReason": "Content needs correction"
}
```

### Public live API
`GET /api/content/live/:teacherId`

Optional query:
- `subject`

Example:
- `/api/content/live/1`
- `/api/content/live/1?subject=Maths`

## Upload Rules
- Allowed file types: JPG, PNG, GIF
- Maximum file size: 10MB

## Scheduling Rules
- Only approved content can be scheduled
- Scheduling uses `rotation_order` and `duration`
- Public live API returns active content based on:
	- teacher
	- subject
	- start/end time
	- schedule rotation

## Edge Case Handling
- No approved content -> empty live response
- Approved but not active -> empty live response
- Invalid subject in live filter -> empty live response

## Public API Protection
- The public live API is rate limited using `express-rate-limit`.
- Current policy: 100 requests per 15 minutes per IP.

## Architecture Notes
Detailed design explanation is available in:

- `backend/architecture-notes.txt`

## Assumptions
- Content is stored directly in `pending` state after upload.
- Public live API returns active content per subject for a teacher.
- Schedule management is principal-only.

## Skipped / Future Improvements
- Redis caching for live API
- Rate limiting for public API
- S3 file storage
- Subject-wise analytics
- Production-grade migration workflow

## Submission Notes
- Deployment is hosted on Render.
- GitHub is connected to deployment pipeline.
- Assumptions and skipped features are documented here as required.
