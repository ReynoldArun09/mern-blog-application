# MERN Blog app
Blog app built with mern stack

## Tech Stack

- **Client:** React, Typescript
- **Server:** Node, Typescript, Express, Docker, Mongo(mongoose)
- **Monitoring tools:** Prometheus, Grafana, Grafana Loki,


## 🔗 Links
- Live: https://super-jelly-727c23.netlify.app/
- Code: https://github.com/Beast-Rey/mern-blog-app

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)


## Features

- [x] Light/dark mode toggle
- [x] Login/Register
- [x] Create Blog post
- [x] Add comment
- [x] Delete comment
- [x] Search blogs
- [x] Edit profile



## 🛠 Technologies

- Javascript
- React
- Tailwind 
- Tanstack-Query
- Shadcn ui
- React-hook-form
- Recoil
- Vite
- Axios
- Node
- Express 
- Typescript
- Zod
- Docker
- Moongose
- Multer
- cloudinary

## Project Structure

```
client\
  |--src\
      |--apis            # tanstack query
      |--atoms           # state management
      |--axios           # axios connection
      |--components      # Components              
      |--pages           # routes
      |--utils           # schema types interface
server\
  |--src\
      |--database\       # Mongoose configuration
      |--handlers        # Route handlers
      |--helper          # Interface types enum
      |--middlewares\    # Custom express middlewares
      |--models\         # Mongoose models
      |--routes\         # Applicaton routes
      |--utils\          # utilities Zod validation Nodemailer
      |--app.ts          # Express app
      |--index.ts        # Server configuration
```
