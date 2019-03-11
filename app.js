const yargs = require('yargs');
const _ = require('lodash');

const buildtr = require('./buildtr');


const nameOptions = {
  describe: 'Name of your TaskRouter Workspace',
  demand: true,
  alias: 'n'
};

const argv = yargs
  .command('create', 'Create a new TaskRouter sample Contact Center', {
    name: nameOptions
  })
  .help()
  .argv;

var command = argv._[0];

if (command == 'create'){
  buildtr.buildTaskRouter(argv.name)
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e.message);
  });
};