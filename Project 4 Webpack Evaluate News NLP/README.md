# Evaluate News with NLP

This is the fourth project from Udacity's Front End Development course. The Project Specification can be found [HERE](https://review.udacity.com/#!/rubrics/2668/view).


## Getting started

1. Download or clone the project in your local machine.
2. Open a terminal on the project root's page and instal Node:
`npm install`
3. For the program to run successfully, you'll need to use two terminals:

Obs.: It might be necessary to install the dependencies:

`npm i -D @babel/core @babel/preset-env babel-loader`

`npm i -D style-loader node-sass css-loader sass-loader`

`npm i -D clean-webpack-plugin`

`npm i -D html-webpack-plugin`

`npm i -D mini-css-extract-plugin`

`npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin`

`npm install file-loader --save-dev`

`npm i node-fetch --save`

### Terminal 1 - Client Side

Open a terminal and initiate the Client side with this command: `npm run build-dev`

The client side will be automatically open with the URL http://localhost:8080/

In the page you'll be able to submit a text to be analyzed, and the response will be displayed in the page interface.

### Terminal 2 - Server Side

Open a new terminal and run the following commands:

`npm run build-prod`

`npm start`

The first command generates the /dist folder that contains all the system's code, but optimized for deployment.

The second command executes the files provided in /dist folder and starts the server on the port 3000.

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.
