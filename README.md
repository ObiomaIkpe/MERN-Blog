This full stack blog application was built with quite interesting features.

## getting started!
after the downloading or cloning the repository, from your terminal:
    npm install && cd blogfrontend && npm install


On the front-end, I used redux to manage global state, especially for features like user 
login and sign-up states, whose status are used at different parts of the application.

still on the front-end, there is a user dashboard with admin features, but the admin features are 
only available for users who are registered admins (which is still verified on the backend).

the user dashboard page has a responsive sidebar. clicking on each link on the sides of the sidebar renders the corresponding component. eg. when logged-in as logged in as admin, clicking on the posts, renders all the posts of all the users, and the logic continues. Same logic applies to all sidebar links.

Each blog post has a comment section. Readers can comment on any post they like, and also edit comments, as long as the comment belongs to them. However, the admin can edit any comment irrespective of the owner. Comments can also be liked or unliked.

on the main page, there is a searchbox, where users can easily input the search terms and criteria they want, and all the blog posts that match those listings will be returned

The admin feature is quite interesting, the admin has access to almost all data on the web app from their frontend. from being able to create, update and delete posts,to deleting any comment attached to posts.