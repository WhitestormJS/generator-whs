# Whitestorm.js plugin workflow
### INSTRUCTION: Installation

1. Fork this repository. <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/GitHub_Fork_Button.png" height="40" valign="middle"> (Or clone) <img src="https://help.github.com/assets/images/help/repository/clone-repo-clone-url-button.png" height="40" valign="middle"> or [Duplicate it](https://github.com/WhitestormJS/whs-plugin.js#q-i-have-already-forked-once-and-i-want-to-create-my-second-plugin-but-im-not-able-to-fork-it-again-how-to-deal-with-it).
2. Run `npm install` to install all dependencies.
3. Rename this (forked) repository.
4. Now you need to manage a **package.json** file:
  - Rename this package.
  
  ![](http://i.imgur.com/deapJbW.gif)
  
  - Reset version of package.
  
  ![](http://i.imgur.com/b8vuouk.gif)
  
  - Write a description of your new plugin.
  
  ![](http://i.imgur.com/Sm9FaBn.gif)
  
  - Change the author.
  
  ![](http://i.imgur.com/NGNbgch.gif)
  
  - Don't forget to save it;)
  
### INSTRUCTION: Development

1. Run `gulp dev` in repo folder. This will watch all files you edit in **src-examples**(watched by `examples:watch`) and **src**(watched by webpack dev server) and automatically compile them.
2. Open **http://localhost:8080/basic/basic/** in browser. Now you should see a basic plugin that creates dynamic sphere shape with green material.
<p align="center"><img height="400" src="http://i.imgur.com/L1diXRu.png"></p>
3. Edit files in **src** folder. All your changes should be compiled immediately.
  - **index.js** is a main file. Your plugin will export the same as this file export.
  
4. Configure webpack with your new name. In **webpack.config.babel.js**:

![](http://i.imgur.com/R957Kwk.gif)

  - **filename** is how webpack will name compiled file.
  - **library** is how webpack will export your plugin. We *recommend* using **['WHS', 'PluginName']** structure.
5. Edit **layout.html** file in **src-examples**. It should point script tag to file compiled by webpack. (see step #4).

![](http://i.imgur.com/yW6HTRz.gif)  
6. Edit files in **src-examples** folder.
  - They have structure [/**ExamplesCategory**/**ExampleName**/index.html].
  - **index.html** points to **script.js** file that is a WhitestormJS app.
  - All .html files + "script.js" are using [swig](http://paularmstrong.github.io/swig/) for templating.
  - You can write es6 code. All "script.js" files are compiled by [babel](https://babeljs.io/) with [es2015 perset](https://babeljs.io/docs/plugins/preset-es2015/).
  - You can use **import** for importing additional libraries from npm. If you want to import file from example's directory or **assets** folder - start import url from "./" where this folder means **src-examples** folder. Example: "./assets/terrain/default_terrain".
  - Folders **libs** and **assets** in **src-examples** are reserved. 
    - **libs** folder contains additional scripts that your plugin depends for testing. 
    - **assets** - additional images/models/sounds, etc.
    
![](http://i.imgur.com/JHlnr34.png)

### INSTRUCTION: Publishing
As your **package.json** file is complete and plugin is written - you can publish it to [NPM](http://npmjs.com/).
  1. Run `npm publish`.
  2. Profit!

# FAQ

##### Q: I have already forked once and i want to create my second plugin but i'm not able to fork it again. How to deal with it?
A: Gtihub provides an [instruction of duplicating repo](https://help.github.com/articles/duplicating-a-repository/)
In git: 
```bash

$ git clone --bare https://github.com/WhitestormJS/whs-plugin.js.git
# Make a bare clone of the repository

$ cd whs-plugin.js.git
$ git push --mirror https://github.com/username/whs-newplugin.git
# Mirror-push to the new repository

$ git add remote upstream https://github.com/WhitestormJS/whs-plugin.js.git
# Add original as additional remotes for getting patches and updates.

$ cd ../
$ rm -rf whs-plugin.js.git
```

Then, if you want to **apply new updates** from whs-plugin.js, do:

```bash
$ git fetch upstream
$ git cherry-pick <sha1>
# <sha1> is a commit with update
```

