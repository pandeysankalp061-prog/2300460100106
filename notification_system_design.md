# Notification System Design Document

## Overview
This document outlines the architecture and design of the notification system for the backend application.

## System Architecture

### Components
1. **Logging Middleware** - Handles request/response logging
2. **Vehicle Maintenance Scheduler** - Manages maintenance task scheduling
3. **Notification App Backend** - REST API for notification management

## Notification System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Logging Middleware Layer                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Logs all HTTP requests and responses                  │ │
│  │  Tracks API usage and performance metrics              │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Notification API Layer (Express.js)               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  GET    /api/notifications      - Retrieve all         │ │
│  │  POST   /api/notifications      - Create new           │ │
│  │  PUT    /api/notifications/:id  - Update/Mark read     │ │
│  │  DELETE /api/notifications/:id  - Delete               │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         Business Logic & Data Management                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Notification Store (In-Memory)                        │ │
│  │  Validation & Processing                              │ │
│  │  Status Management                                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## API Endpoints

### 1. Get All Notifications
- **Method:** `GET`
- **URL:** `/api/notifications`
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1234567890,
      "title": "Notification Title",
      "message": "Notification message content",
      "type": "info",
      "recipientId": "user123",
      "read": false,
      "createdAt": "2026-06-11T10:30:00Z",
      "updatedAt": "2026-06-11T10:30:00Z"
    }
  ],
  "count": 1
}
```

### 2. Create Notification
- **Method:** `POST`
- **URL:** `/api/notifications`
- **Request Body:**
```json
{
  "title": "Maintenance Alert",
  "message": "Vehicle maintenance scheduled",
  "type": "alert",
  "recipientId": "user123"
}
```
- **Response:** Status 201 Created

### 3. Mark as Read
- **Method:** `PUT`
- **URL:** `/api/notifications/:id`
- **Response:** Updated notification object with `read: true`

### 4. Delete Notification
- **Method:** `DELETE`
- **URL:** `/api/notifications/:id`
- **Response:** Deleted notification object

## Data Models

### Notification Object
```javascript
{
  id: Number,              // Unique identifier (timestamp-based)
  title: String,           // Notification title
  message: String,         // Notification content
  type: String,            // Type: 'info', 'alert', 'warning', 'error'
  recipientId: String,     // User ID receiving notification
  read: Boolean,           // Read status (default: false)
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

### Maintenance Task Object
```javascript
{
  id: Number,              // Unique identifier
  vehicleId: String,       // Vehicle identifier
  taskType: String,        // Maintenance task type
  scheduledDate: Date,     // Scheduled maintenance date
  status: String,          // 'pending', 'completed', 'cancelled'
  createdAt: Date,         // Creation timestamp
  completedAt: Date        // Completion timestamp (if completed)
}
```

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** JavaScript
- **Data Storage:** In-Memory (Can be replaced with Database)
- **Port:** 3000 (configurable via PORT environment variable)

## Key Features

### 1. Logging Middleware
- Tracks all incoming HTTP requests
- Logs response status codes
- Records timestamps for audit trail
- Helps with debugging and monitoring

### 2. Vehicle Maintenance Scheduler
- Schedule maintenance tasks for vehicles
- Track maintenance history
- Mark tasks as completed
- Retrieve pending maintenance items

### 3. Notification Management
- Create notifications with different types
- Retrieve all notifications
- Mark notifications as read
- Delete notifications
- Validate required fields
- Return appropriate HTTP status codes

## Error Handling

| Status Code | Scenario |
|------------|----------|
| 200 | Successful GET request |
| 201 | Successful resource creation (POST) |
| 400 | Bad request (missing/invalid fields) |
| 404 | Resource not found |
| 500 | Server error |

## Future Enhancements

1. **Database Integration**
   - Replace in-memory storage with MongoDB/PostgreSQL
   - Implement data persistence

2. **Authentication & Authorization**
   - Add JWT token-based authentication
   - Implement role-based access control

3. **Real-time Notifications**
   - WebSocket integration for push notifications
   - Email/SMS notifications

4. **Notification Scheduling**
   - Schedule notifications for future delivery
   - Recurring notifications

5. **Analytics**
   - Track notification delivery rates
   - User engagement metrics

## Deployment

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Server
```bash
node notification_app_be/server.js
```

### Environment Variables
```
PORT=3000          # Server port (default: 3000)
NODE_ENV=development # Development/Production mode
```

## Testing

### Sample cURL Commands

**Create a notification:**
```bash
curl -X POST http://localhost:3000/api/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Notification",
    "message": "This is a test",
    "type": "info",
    "recipientId": "user123"
  }'
```

**Get all notifications:**
```bash
curl http://localhost:3000/api/notifications
```

**Mark as read:**
```bash
curl -X PUT http://localhost:3000/api/notifications/1234567890
```

**Delete notification:**
```bash
curl -X DELETE http://localhost:3000/api/notifications/1234567890
```

## Conclusion

This notification system provides a solid foundation for managing notifications within the application. It is designed to be scalable and maintainable, with clear separation of concerns and extensibility for future requirements.
