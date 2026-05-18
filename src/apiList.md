authRouter
POST /signup
POST /signin
POST /logout

profileRouter
GET profile/view
PATCH profile/edit
PATCH profile/password

ConnectionRequestRouter
POST request/send/ignored/:userId
POST request/send/interested/:userId
POST request/review/rejected/:userId
POST request/review/accepted/:userId

userRouter
GET user/feeds
GET user/connections
GET user/requests