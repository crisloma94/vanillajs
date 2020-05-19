# A vanilla js project

# First

Install dependencies from project root with `npm install`

# Start development server with

`npm run dev`

# Architecture

formacionjs     
├── dist   
│   ├── images 
│   ├── bundle.js 
│   ├── index.html   
├── src    
│   ├── index.js  
│   ├── config   
│   ├── utils   
│   ├── components   
│   ├── assets   
│   │   ├── fonts   
│   │   ├── images   
│   ├── styles   
│   ├── views
├── README.md   
├── node_modules   
├── package.json   
├── .gitignore 
├── .babelrc
├── postcss.config.js   
├── webpack.config.js   
├── index.html   
├── server.js   


## src
Where all the code of the app is located

### index.js
Entry point

### config
Static definitions and configurations

### utils
Utility functions

### components
Reusable components without business logic

### assets
Static assets
#### fonts
Fonts
#### images
Images

### styles
Sass stylesheets

### views
Pages of the project