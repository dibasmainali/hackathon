# Frontend-Backend Connection Setup

## Configuration Complete ✅

### Backend Setup (backend-folder/index.js)
- ✅ CORS middleware configured for `http://localhost:5173`
- ✅ Auth routes mounted at `/auth`
- ✅ Cookie credentials enabled for authentication
- ✅ Server runs on port `4000` (or `process.env.PORT`)

### Frontend Setup

#### Vite Proxy Configuration (vite.config.js)
- ✅ `/auth/*` requests proxy to `http://localhost:4000`
- ✅ `/api/*` requests proxy to `http://localhost:4000`
- ✅ Credentials and cookies are forwarded properly

#### API Utility (src/utils/api.js)
- ✅ Centralized API request handling
- ✅ Automatic credential inclusion
- ✅ Error handling
- ✅ Response parsing

#### Auth Pages
- ✅ LoginPage uses `authAPI.login()`
- ✅ SignupPage uses `authAPI.signup()`
- ✅ Proper error handling and user feedback

## How to Run

1. **Start Backend** (in `backend-folder`):
   ```bash
   npm start
   # or
   node index.js
   ```
   Backend will run on `http://localhost:4000`

2. **Start Frontend** (in `frontend-folder`):
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Test Connection**:
   - Go to `http://localhost:5173/login`
   - Try logging in or signing up
   - Check browser DevTools Network tab to see requests proxied correctly

## API Endpoints

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/me` - Get current user (protected)

## Troubleshooting

### CORS Errors
- Ensure backend is running before frontend
- Check that CORS middleware is before other routes in `backend-folder/index.js`

### Connection Refused
- Verify backend is running on port 4000
- Check `backend-folder/index.js` port configuration
- Check Vite proxy target in `frontend-folder/vite.config.js`

### Cookies Not Working
- Ensure `credentials: 'include'` in API calls (already set)
- Check CORS `Access-Control-Allow-Credentials` header (already set)

