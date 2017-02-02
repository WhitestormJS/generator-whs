const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
    super(args, opts);

    this.option('babel');
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Output filename',
      default: 'myModuleOrComponent.js',
      validate: input => input.indexOf('.js') > 0
    }, {
      type: 'list',
      name: 'key',
      choices: ['module', 'component'],
      message: 'What keyword to add? Will be like: "whs-module"'
    }]).then((answers) => {
      this.log('Output filename', answers.name);
      this.log('Keyword', answers.key);
      this.outputName = answers.name;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('**/*'), this.destinationPath(), {filename: this.outputName});
      this.fs.copy(this.templatePath('**/.*'), this.destinationPath());
  }

	install() {
    this.npmInstall();
  }
}
