# Whitestorm.js plugin generator
### INSTRUCTION: Installation

1. Make a new repository.
2. Install **Yeoman**: `npm install -g yo`
3. Install **Whitestorm.js plugin generator**: `npm install -g generator-whs-plugin` 
4. Run `yo whs-plugin`.

<p align="center"><img height="400" src="http://i.imgur.com/KP1s9rs.png"></p>
  
### INSTRUCTION: Development

1. Run `gulp dev` in repo folder. This will watch all files you edit in **src** (watched by webpack dev server) and automatically compile them in real-time.
2. Open **http://localhost:8080/** in browser. Now you should see a basic plugin that creates dynamic sphere shape with green material.

<p align="center"><img height="400" src="http://i.imgur.com/L1diXRu.png"></p>

3. Edit files in **src** folder. All your changes should be compiled immediately.
  - **index.js** is a main file. Your plugin will export the same as this file export.

### INSTRUCTION: Publishing
As your **package.json** file is complete and plugin is written - you can publish it to [NPM](http://npmjs.com/).
  1. Run `npm publish`.
  2. Profit!

# CLI

### `gulp build` - default command

This command builds all sources for node.js and browser environment.

#### `gulp build:node`

This command builds all sources only for node.js environment - **lib/** folder

#### `gulp build:browser`

This command builds all sources only for browser environment - **build/** folder.

### `gulp dev` - Development mode

This command runs development mode where you can make changes in sources and all your changes will be applied immediately. After running this command you should see all examples by http://localhost:8080/

#### `gulp build:clean`

Removes all files from **build/** and **lib/**

#### `gulp vendor`

If you are using [Github pages](https://pages.github.com/) or other deploy service to run examples/showcase of a plugin - This command will be useful: it copies `whitestorm.js` file from **node_modules/.../** to **whs/** folder.

