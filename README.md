# Industrix Todo Application

A full-stack todo management app built for the Industrix coding test.  
The app lets users create, update, filter, and manage todos with categories, priorities, and completion status.

- **Frontend:** Next.js / React + TypeScript + Ant Design (antd)
- **Backend:** Node.js / Express + Sequelize + PostgreSQL
- **API Testing:** Bruno
- **Testing:** Jest unit tests on backend controllers & utility functions

---

## Features Implemented

- CRUD for todos
- Category management (Work, Personal, Shopping, etc.)
- Priority support: `high`, `medium`, `low`
- Due date for todos
- Search by title/description
- Filter by:
    - completion status (All / Completed / Uncompleted)
    - category
- Server-side pagination
- Responsive UI using Ant Design Grid, Table, Modal/Drawer
- Basic validation on both frontend and backend
- Unit tests for core backend logic

---
## HOW TO RUN TODO-LIST : <br>
open industrix-backend/config/config.js <br>
connect it to your postgresql <br>
change the password to ur postgresql password <br>
rename .env .example to .env on both frontend and backend folder. <br>

open new local terminal (For Backend) : <br>
cd industrix-backend <br>
npm install
npm install express pg pg-hstore sequelize sequelize-cli dotenv cors <br>
npm install -D nodemon

npm run drop <br>
npm run create <br>
npm run migrate <br>
npm run seed <br>
npm test <br>
npm run dev <br>

open new local terminal (For Frontend) : <br>
cd industrix-frontend<br>
npm install<br>
npm install axios antd dayjs @ant-design/icons<br>
npm install -D typescript @types/react @types/node @types/react-dom<br>
npm run dev <br>

-------

Request CRUD testing was done by using Bruno app. <br>
FRONTEND in ANTD

-------

Answer for technical questions :

Database Design Questions
1. What database tables did you create and why?<br>
   I created two main tables: Categories and Todos.<br>
- Categories stores reusable labels for tasks with fields like id, name, and color.<br>
- Todos stores the actual task data: title, description, completed, priority, due_date, timestamps, and a foreign key categoryId.<br>
- The relationship is one-to-many: one category can have many todos. I chose this structure to keep task data focused in a single table while still allowing flexible grouping and filtering by category via the foreign key.
2. How did you handle pagination and filtering in the database? <br>
   I used Sequelize’s limit, offset, and where options.
   Pagination uses limit + offset, and filtering (like by search, category, or priority) is applied through the where clause before querying.<br>

Technical Decision Questions
1. How did you handle pagination and filtering in the database?<br>
   I used Sequelize’s findAndCountAll with limit, offset, and a dynamic where clause.<br>
- Pagination:<br>
I compute page, limit, and offset = (page - 1) * limit.<br>
limit and offset are passed directly into findAndCountAll, and I return both the rows and count to build current_page, per_page, total, and total_pages in the API response.<br>
- Filtering:<br>
I build a where object based on query params.<br>
Search is applied using case-insensitive ILIKE on text fields, and I also support filtering by completed status and categoryId via the same where object.<br>
This way, pagination always happens after filtering in the database, so the client never paginates over already-filtered data.<br>
<br>For this test I relied on PostgreSQL’s default indexes on primary and foreign keys; I didn’t add custom indexes yet because the dataset is small.<br>
2. How did you structure your React components? <br>
   I split the app into small (different text file), reusable components: forms, list items, modal UI, and API utilities. Pages stay clean, and each component only handles one concern. <br>
3. What backend architecture did you choose and why? <br>
   I used a REST API with Express and Sequelize.<br>
   It’s simple, easy to use, and works perfectly with a relational database like PostgreSQL.<br>
4. How did you handle data validation?<br>
   Frontend: Ant Design Form rules <br>
   Backend: Custom checks in controllers + Sequelize built-in validators<br>
   This prevents bad data from reaching the database.<br>

Testing & Quality Questions
1. What did you choose to unit test and why? <br>
   I focused my unit tests on the backend logic.<br>
   First, I tested a small utility function (snakeKeys) to make sure camelCase keys are always converted correctly to snake_case.<br>
   Then I wrote tests for the todo list controller to verify that pagination (limit and offset) and the completed filter are passed correctly into Sequelize.<br>
   I also added tests for the create controller to ensure that missing titles and invalid priorities return a 400 response with the right error message.<br>
   I chose these areas because they contain the core business rules of the API, so bugs there would have the biggest impact.<br>
2. If you had more time, what would you improve or add? <br>
   Authentication and authorization: add JWT-based login with refresh tokens and role-based access, so different users can manage their own task lists securely.<br>
Better UX and features: add more filters (e.g., by priority), sorting options in the table, and more polished error/empty states on the frontend.<br>
-------