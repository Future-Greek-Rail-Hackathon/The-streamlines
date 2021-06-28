# Last_Mile_Assign

# Install the application

git clone -b master https://github.com/parhsmaropoulos/Last_Mile_Assign.git

`cd Last_Mile_Assign/backend`

`npm install (install server)`

`cd..`

`cd dummy-front`

`npm install (install front end react)`

# Init database

create a db called last_mile

use command "`psql last_mile < last_mile.sql`"

\*\* You might need to tweak some values at backend/models/dbconfig.ts to connect successfully to the DB.

# Start the server

From root folder cd /backend

`npm run dev`

# Start the front end

From root folder cd /frontend

`npm start`

# Run tests

From root folder cd /backend

`npm test`
