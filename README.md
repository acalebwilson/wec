## WEC
A prototype website for Whitby Evangelical Church. A portfolio project.

This is the frontend of a portfolio project, and is a prototype design for a local church website in need of improvement (at time of writing).

The site is a single page react app, created using create-react-app, with an express - nodejs backend, and with MongoDB as a database. The backend repo can be found here - https://github.com/acalebwilson/wec-service. A live version is available at https://acalebwilson.com. The project was of interest to me as a way to apply skills I had learned through the freecodecamp.com course as it involved both front and backend skills, and has greatly impoved my proficiency with HTML, CSS (SASS), JS (with React and nodejs on the backend), responsive web design, and given me a deeper understanding of both the web development process and software design in general.

I deliberately used few React packages on the frontend to give myself a better understanding of the problems the packages solved. The site uses authentication to access protected functions, such as adding new audio files to the audio library. I chose to use JWTs in cookies for authentication as it made development simpler - express-session doesn't seem to enjoy the fact that the CRA app in development can't be served from the same server as the backend processes (or at least, I couldn't find a solution). The site also makes use of the service worker provided in CRA to allow the app to be classified as a Progressive Web App by Google's 'Lighthouse'.
