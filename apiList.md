# Devtinder APIs 

⸻

DevTinder API Routes

User Authentication & Profile
	•	POST /signup → Register a new user
	•	POST /login → Authenticate user & return JWT token
	•	GET /profile/:userId → Fetch user profile details
	•	PATCH /profile/:userId → Update user profile (bio, photos, interests)
	•	DELETE /profile/:userId → Delete a user account
	•	POST /logout → Log out the user & clear session

Liking & Matching Sy bstem
	•	POST /like/:targetUserId → Like a user
	•	POST /dislike/:targetUserId → Dislike a user
	•	GET /matches/:userId → Fetch all matched users
	•	GET /suggestions → Get a list of suggested users for swiping

Posts & Content
	•	POST /post → Create a new post (for feed)
	•	GET /posts → Get all posts from users
	•	DELETE /post/:postId → Delete a specific post
	•	POST /post/:postId/like → Like a post
	•	POST /post/:postId/comment → Comment on a post

Messaging System
	•	POST /chat/:userId/start → Start a chat with a matched user
	•	POST /chat/:chatId/message → Send a message
	•	GET /chat/:chatId/messages → Fetch chat messages
	•	DELETE /chat/:chatId → Delete a chat

Settings & Preferences
	•	PATCH /settings/preferences → Update user preferences (age, distance, interests)
	•	PATCH /settings/notifications → Update notification settings
	•	DELETE /settings/delete-account → Permanently delete account

Additional Features
	•	POST /boost → Boost user profile for more visibility
	•	POST /superlike/:userId → Superlike a user
	•	POST /report/:userId → Report a user for bad behavior
	•	POST /block/:userId → Block a user
	•	GET /blocked → Get a list of blocked users

⸻

This format is ready to be added directly to apiList.md. Let me know if you need modifications! 🚀


## POST requests

- POST /signup
- POST / login
- PATCH /logout


## connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/send/accepted/:requestId
-POST /request/send/rejected/:requestId

## userRouter
- GET /user/connections
- Get /user/requests
- GET /user/feel -> Gets you all the profiles present in the platform 


Status : ignored, accepted, rejected, interested


