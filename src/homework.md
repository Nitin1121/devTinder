Episode 3
- Create a repository
- Initialize a repository
- node_module, package.json, package-lock.json
- Install express
- Create a server
- Listen to a port
- Write request handlers /, /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of -g while npm install
- What is the difference between caret and tilda (^ and ~)

Episode 4
- Play with routes /hello /hello/2 /test /
- Order of the routes plays a very important role
- Exploring routes
    - Use of +, *, (), ?
    - Use of regex in routes /a/ /.^fly$/
- Read query params in request
- Read dynamic routes can be multiple

Episode 5
- Mutliple route handlers
- next()
- next() & error along with res.send()
- app.use("/route, rh1, [rh2, rh3], rh4, rh5)
- What is middleware, how express js handle request behind the scene
- Difference between app.use() and app.all()
- Error handling using app.use("/", (err, req, res, next) => {}) handle at end

Episode 6
- Install mongoose
- Connect your application to the database `connection-url/database-name`
- Call connectDb function before starting application on a PORT
- Creation of schema and modal
- Create CRUD api's to enuring its working

Episode 7
- JS Object vs JSON
- Add midlleware express.json()
- Make API dynamic to receive data from the end user
- If there multiple similar record findOne() returns which one ?