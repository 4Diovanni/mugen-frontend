# 🎮 MUGEN Frontend - Backend Integration Guide

## Quick Start
The frontend needs to connect to the backend running on `http://localhost:8080/api`

### Environment Variables (.env)
```env
VITE_APP_NAME=Mugen
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:8080/api
VITE_JWT_TOKEN=your_token_here
```

### Backend Endpoints

#### Characters
- `GET /characters` - List all characters (paginated)
- `GET /characters/owner/{userId}` - Get user's characters
- `GET /characters/{id}` - Get character details
- `POST /characters` - Create new character
- `PUT /characters/{id}` - Update character
- `GET /characters/{id}/stats` - Get calculated stats
- `GET /characters/{id}/tp-summary` - Get TP info
- `GET /characters/{id}/level-progress` - Get XP progress

#### Skills
- `GET /characters/{characterId}/skills` - List character skills
- `POST /characters/{characterId}/skills/{skillId}` - Add skill to character

#### Equipment
- `GET /weapons` - List weapons
- `GET /armor` - List armor
- `GET /equipment` - List equipped items

#### Experience
- `POST /characters/{characterId}/gain-exp` - Gain experience
- `GET /characters/experience/exp-table` - Get XP table

### Authentication
All requests need JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

### CORS Configuration
Backend needs to accept requests from frontend origin. Ensure CORS is configured in Spring Boot.

## Example API Call
```javascript
const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_JWT_TOKEN;

const response = await fetch(`${API_URL}/characters/owner/{userId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
  }
});
```
