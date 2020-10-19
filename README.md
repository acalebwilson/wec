## WEC
A prototype website for Whitby Evangelical Church. A portfolio project.

This is the frontend of a portfolio project, and is a prototype design for a local church website in need of improvement (at time of writing). The app is based on the current [website](https://www.whitbyec.com/), and all text is either pulled straight from there, or is placeholder.

The site is a single page react app, created using create-react-app, with an express - nodejs backend, and with MongoDB as a database. The front end repo can be found [here](https://github.com/acalebwilson/wec). A live version is available [here](https://acalebwilson.com). The project was of interest to me as a way to apply skills I had learned through the [freecodecamp](https://www.freecodecamp.org/) course as it involved both front and backend skills, and has greatly impoved my proficiency with HTML, CSS (SASS), JS (with React and nodejs on the backend), responsive web design, and given me a deeper understanding of both the web development process and software design in general.

I chose to use React as the idea of a single page application was appealing, and sounded like an interesting thing to build. Additionally, the framework itself seemed (after a bit of learning) quite intuitive. I deliberately used few React packages on the frontend to give myself a better understanding of the problems the packages solved. My main focus throughout the project was on functionality, though I found myself bogged down in making design decisions far too often - I don't claim to be a designer, and the current design took a long time and several iterations to reach it's present state. Working through this project also made me very aware of the risks of 'scope creep', as I kept imagining new and exciting things I could add which then stole hours of my time implementing, only to realise (often) that the solution was excessively convoluted and not that useful, as well as increasing the overall time spent. I learnt to save time by prototyping on the layout, so in future I plan to do the same with features and implementation. If you take the time to look through some of the code you'll probably spot old functions I missed, which are relics of some bygone functionality. 

The site also makes use of the service worker provided in CRA to allow the app to be classified as a Progressive Web App by Google's 'Lighthouse'.

If you want to see the logged in functionality, I would advise cloning the code, then going into App.js and finding the "getInitialDetails" function. Normally it checks with the server to see if the user has a valid cookie, but if you comment out the main function and uncomment the function below, then run npm start, you can see what the page looks like to an admin (navigate to different pages for contextual menus). Don't try and submit any data though as you'll run into some headaches.




