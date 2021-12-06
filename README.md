This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You’ll need to have Node >= 10 on your local development machine to run this app.

After cloning the repo, you'll have to install the dependancy packages with `npm install` or `yarn install`. To start the appication, run `npm start` or `yarn start`.

This application allows a user to search for projects from GitLab's API. Some important libraries/dependancies for this app include:

-`Chakra UI` - A react component library which aids in building an elegant UI. (https://chakra-ui.com/).  
-`@apollo/client` - used for making GraphQL queries (https://www.apollographql.com/docs/react/).  
-`apollo3-cache-persist` - used for persisting the search state between sessions (https://github.com/apollographql/apollo-cache-persist).  
-`react-router-dom` - used for routing to different pages when needed (https://reactrouter.com/docs/en/v6).  

Other important things to note:

- This was my first time using GraphQL (and I think I've already been converted). It's also the first time I've encountered cursor-based pagination. Getting up to speed with these technologies and concepts was probably the biggest challenge.
- I was unable to find  a way to fetch the list of users associated with a project. I looked through GitLab's GraphQL API docs and couldn't find a way to do it. It's possible that I missed something.
- Due to the large amount of screen space that a web browser provides, the user is not directed to a new page when they click on a project in the results list. Instead, the list item expands to show the additional details. I might have deviated slightly from the requirements here, but I'll be happy to explain how it could be done with a new page.
