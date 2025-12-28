

POSTMAN COLLECTION LINK : https://negidtu-ujjwal-6099217.postman.co/workspace/Ujjwal-Negi's-Workspace~616cd5ab-75d2-435e-8888-9e1e776083a5/collection/51088939-a622feae-dacc-4bcd-95b5-873fcdcf84b7?action=share&creator=51088939&active-environment=51088939-a6cad6fb-6cd6-4ad6-aecf-1aaca8c13da2


# API Execution Evidence – Subscription Management System

This folder contains Postman execution screenshots demonstrating
successful API behavior.

## Authentication APIs
- Login: returns JWT token
- Signup: creates user successfully

## User APIs
- View subscription
- Cancel subscription
- Profile retrieval

## Admin APIs
Admin endpoints are protected via role-based authorization.

- Non-admin access correctly returns `403 Admin access only`
- Admin access works after role elevation in database. 
- (IMP)  User would have to be elevated to the role of admin in database and then login through those credentials to get admin level view to database.

These screenshots validate correct API behavior and security enforcement.


Variable	Description
BASE_URL	Backend server URL (e.g. http://localhost:5000)
TOKEN	    JWT token generated via Login API


JWT token is automatically stored in the environment after successful login using Postman post-response scripts.
All protected APIs use Authorization: Bearer {{TOKEN}}.



Authentication APIs

Signup: Creates a new user successfully
Login: Authenticates user and returns JWT token.


User APIs

View subscription details
Cancel subscription
Retrieve user profile


Admin APIs (Role-Based Access)
Admin endpoints are protected using role-based authorization.
