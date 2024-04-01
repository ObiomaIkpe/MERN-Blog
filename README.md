This full stack blog application was built with quite interesting features.

## getting started!
after the downloading or cloning the repository, from your terminal(you may have to split your terminal, as the frontend and backend run on different servers!):
```
From the root of the folder, run
>    npm install && npm run dev
This will install all dependencies and get the backend server running.

Next, cd /blogfrontend
>    npm install && npm run dev
```

#### link to deployed version ---- 
> 

###  What happenend at the front end.
On the front-end, I used redux to manage global state, especially for features like user 
logged-in and sign-up states, whose status are used at different parts of the application.

still on the front-end, there is a user dashboard with admin features, but the admin features are 
only available for users who are registered admins (which is verified on the backend).

the user dashboard page has a responsive sidebar. clicking on each link on the sides of the sidebar renders the corresponding component. eg. when logged-in as admin, clicking on the "posts" renders all the posts of all the users. Same logic applies to all sidebar links.

Each blog post has a comment section. Readers can comment and like any post, and also edit comments, as long as the comment belongs to them. However, the admin can edit any comment irrespective of the owner.

on the main page, there is a searchbox, where users can easily input the search terms and criteria they want, and all the blog posts that match those listings will be returned

The admin feature is quite interesting, the admin has access to almost all data on the web app from their frontend. from being able to create, update and delete posts,to deleting any comment attached to posts.

### Backend
the backend is where I handled all the logic. Ensuring that users have unique emails, password encryption, and database calls were all done from the backend. 

Error handling is treated specially, as there are instances in our code where we'll need to graciously return errors while giving the user a good reason why there is an error, eg **unauthorized** etc.

for easier code readability, the routes and controller functions of all the resources are separated into different files.


Database models are designed according to needs. 


This blog application gave me a first hand experience on fullstack web development experience.