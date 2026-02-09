# Store Rating Platform - Master API Documentation

This document provides a comprehensive contract for all API endpoints. Every endpoint includes Purpose, Method, Route, Request Body, Response Structure, Logic, and Edge Cases.

---

## 🛠️ Global Standards
- **Base URL**: `http://localhost:5000/api/v1`
- **Auth Header**: `Authorization: Bearer <JWT_TOKEN>`
- **Response Wrapper**:
  ```json
  {
    "success": true, 
    "message": "Optional feedback",
    "data": {} 
  }
  ```
- **Error Format**:
  ```json
  {
    "success": false,
    "error": {
      "code": "ERROR_CODE",
      "message": "Human readable message"
    }
  }
  ```

---

## 1. AUTHENTICATION MODULE

### 1.1 `POST /auth/signup`
- **Purpose**: Allows a Normal User to create an account.
- **Method**: `POST`
- **Route**: `/api/v1/auth/signup`
- **Request Body**:
  ```json
  {
    "name": "Full Name (String, 20-60 chars)",
    "email": "valid@email.com (Standard Email Regex)",
    "address": "Postal Address (String, max 400 chars)",
    "password": "Password123! (8-16 chars, 1 uppercase, 1 special char)"
  }
  ```
- **Response Structure (Success 201 Created)**:
  ```json
  {
    "success": true,
    "data": {
      "user": { "id": "uuid", "name": "...", "email": "...", "role": "USER" },
      "token": "eyJhbG..."
    }
  }
  ```
- **Logic**:
  1. **Validation**: Check if all fields meet length and complexity rules.
  2. **Existence**: Check if `email` exists in `users` table.
  3. **Hashing**: Hash password using `bcrypt` (salt rounds: 12).
  4. **Persistence**: Insert into `users` table with `role = 'USER'`.
  5. **Session**: Sign JWT with `userId` and `role`.
- **Edge Cases**:
  - Email already exists (409 Conflict).
  - Invalid Password format (400 Bad Request).
  - Name < 20 or > 60 chars (400 Bad Request).

### 1.2 `POST /auth/login`
- **Purpose**: Authenticates a user and issues a JWT based on specific role.
- **Method**: `POST`
- **Route**: `/api/v1/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "Password123!",
    "role": "ADMIN | USER | STORE_OWNER"
  }
  ```
- **Response Structure (Success 200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbG...",
      "user": { "id": "...", "name": "...", "role": "..." }
    }
  }
  ```
- **Logic**:
  1. **Fetch**: Find user by `email`.
  2. **Verify**: Check `bcrypt` password match.
  3. **Role Check**: Compare `user.role` from DB with `payload.role`. If they don't match, reject.
- **Edge Cases**:
  - Invalid credentials (401 Unauthorized).
  - Role mismatch (403 Forbidden).
  - 5+ failed attempts (429 Rate Limit).

### 1.3 `POST /auth/logout`
- **Purpose**: Clear user session/token.
- **Method**: `POST`
- **Route**: `/api/v1/auth/logout`
- **Logic**: (Client-side) Remove token. (Server-side) Optionally add token to a blacklist if using Redis.

---

## 2. SYSTEM ADMINISTRATOR MODULE (RBAC: ADMIN)

### 2.1 `POST /admin/stores`
- **Purpose**: Atomic creation of a Store and its corresponding Owner account.
- **Method**: `POST`
- **Route**: `/api/v1/admin/stores`
- **Request Body**:
  ```json
  {
    "owner": { "name": "...", "email": "...", "password": "...", "address": "..." },
    "store": { "name": "...", "email": "...", "address": "..." }
  }
  ```
- **Response Structure (Success 201)**:
  ```json
  {
    "success": true,
    "data": { "storeId": "uuid", "ownerId": "uuid" }
  }
  ```
- **Logic**:
  1. **Transaction Start**: Use a DB Transaction.
  2. **User Creation**: Insert Owner into `users` table with `role = 'STORE_OWNER'`. 
  3. **Store Creation**: Insert Store into `stores` table, linking it to the newly created user `id`.
  4. **Commit/Rollback**: If any failure happens, rollback both insertions to prevent orphan stores/owners.
- **Edge Cases**:
  - Owner Email already exists (409).
  - Invalid store metadata (400).

### 2.2 `POST /admin/users`
- **Purpose**: Admin creates another Admin or a Normal User manually.
- **Method**: `POST`
- **Request Body**: `{ "name", "email", "password", "address", "role" }`
- **Logic**: Identical to Signup but allows specifying `role`.

### 2.3 `GET /admin/dashboard/stats`
- **Purpose**: Aggregate statistics for the Admin dashboard.
- **Method**: `GET`
- **Logic**: Run three parallel `COUNT` queries on `users`, `stores`, and `ratings`.
- **Response**: `{ "success": true, "data": { "totalUsers": 100, "totalStores": 20, "totalRatings": 500 } }`

### 2.4 `GET /admin/stores`
- **Purpose**: List all stores with pagination, sorting, and filtering.
- **Query Params**: `name`, `email`, `address`, `sortBy`, `order`, `page`, `limit`.
- **Logic**: Build a dynamic SQL query using `ILIKE` for fuzzy filters and `ORDER BY` for sorting.

### 2.5 `GET /admin/users`
- **Purpose**: List all Normal/Admin users with filtering.
- **Query Params**: `name`, `email`, `address`, `role`, `sortBy`, `order`.

### 2.6 `GET /admin/users/:id`
- **Purpose**: Detailed view of a user profile.
- **Logic**:
  1. Fetch user by `id`.
  2. If `role === 'STORE_OWNER'`, join with `stores` and `ratings` to get the `averageRating`.
- **Response Metadata**: Includes `rating` only if the user is an owner.

---

## 3. NORMAL USER MODULE (RBAC: USER)

### 3.1 `GET /user/stores`
- **Purpose**: List stores for rating with personalized state.
- **Method**: `GET`
- **Route**: `/api/v1/user/stores`
- **Query Params**: `search` (fuzzy name/address), `sortBy`, `order`.
- **Logic**:
  1. Fetch stores.
  2. Subquery or Left Join `ratings` to find if `current_user_id` has a record for each store.
  3. Return `userRating: X` if exists, else `0`.
- **Response Structure**:
  ```json
  [
    { "id": "...", "name": "...", "overallRating": 4.5, "userRating": 0, "address": "..." }
  ]
  ```

### 3.2 `POST /user/ratings`
- **Purpose**: Submit or Update a rating.
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "storeId": "uuid",
    "rating": 1-5 (Integer),
    "comment": "Optional text"
  }
  ```
- **Logic**:
  1. **Existence Check**: Check if a rating by this user for this store exists.
  2. **Upsert**: If exists, `UPDATE`. If not, `INSERT`.
  3. **Recalculate**: Update `stores.average_rating` and `stores.total_ratings` in the `stores` table.

### 3.3 `PATCH /user/profile/password`
- **Purpose**: Self-service password update.
- **Request Body**: `{ "oldPassword", "newPassword" }`
- **Logic**: Verify `oldPassword` hash before hashing/saving `newPassword`.

---

## 4. STORE OWNER MODULE (RBAC: STORE_OWNER)

### 4.1 `GET /owner/dashboard`
- **Purpose**: Owner insights for their specific store.
- **Method**: `GET`
- **Logic**:
  1. Find Store `id` where `owner_id = logged_in_user_id`.
  2. Fetch all ratings for that `storeId`.
  3. Fetch user names who submitted those ratings.
- **Response**: `{ "averageRating": 4.2, "ratings": [ { "userName", "rating", "comment", "date" } ] }`

### 4.2 `PATCH /owner/profile/password`
- **Method**: `PATCH`
- **Logic**: Same as User password update.
