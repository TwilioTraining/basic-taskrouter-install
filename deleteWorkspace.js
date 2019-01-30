require('dotenv-safe').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const client = require('twilio')(accountSid, authToken);

client.taskrouter
  .workspaces('################################')
  .remove()
  .then(workspace => console.log(`${workspace.sid} has been deleted.`))
  .done();
