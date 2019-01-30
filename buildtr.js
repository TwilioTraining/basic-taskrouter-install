require('dotenv-safe').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const createWorkspace = async name => {
  try {
    const response = await client.taskrouter.workspaces.create({
      friendlyName: name
    });
    return response;
  } catch (e) {
    throw new Error(
      `Unable to create Workspace with the Friendly Name ${name}. Try using a different name.`
    );
  }
};

const getActivitySid = async (workspace, activity) => {
  try {
    const response = await client.taskrouter
      .workspaces(workspace)
      .activities.list();
    const result = response.find(
      activities => activities.friendlyName === activity
    );
    return result.sid;
  } catch (e) {
    throw new Error(`Could not retrieve activity ${activity}`);
  }
};

const createTaskQueue = async (workspace, name, skills, reserved, busy) => {
  try {
    const response = await client.taskrouter
      .workspaces(workspace)
      .taskQueues.create({
        targetWorkers: `skills HAS "${skills}"`,
        friendlyName: name,
        reservationActivitySid: reserved,
        assignmentActivitySid: busy
      });
    return response;
  } catch (e) {
    throw new Error(`TaskQueue creation was unsuccessful`);
  }
};

const createWorker = async (workspace, name, skills, language) => {
  try{
    const response = client.taskrouter.workspaces(workspace)
    .workers
    .create({attributes: JSON.stringify({
      skills: skills,
      languages: language,
      contact_uri: '+12345678910'
    }), friendlyName: name});
    return response;
  }catch (e) {
    throw new Error(`The Worker ${name} was not created.`);
  }
}

const createWorkflow = async (workspace, support, sales, marketing, manager) => {
  try {
    client.taskrouter.workspaces(workspace).workflows.create({
      taskReservationTimeout: 30,
      friendlyName: 'Single Workflow',
      configuration: JSON.stringify({
        task_routing: {
          filters: [
            {
              filter_friendly_name: "Support",
              expression: `department=='support'`,
              targets: [
                {
                  queue: support,
                  expression: `task.selected_language IN worker.languages`
                }
              ]
            },
            {
              filter_friendly_name: "Sales",
              expression: `department=='sales'`,
              targets: [
                {
                  queue: sales,
                  expression: `task.selected_language IN worker.languages`
                }
              ]
            },
            {
              filter_friendly_name: "Marketing",
              expression: `department=='marketing'`,
              targets: [
                {
                  queue: marketing,
                  expression: `task.selected_language IN worker.languages`
                }
              ]
            },
            {
              filter_friendly_name: "Manager",
              expression: `department=='manager'`,
              targets: [
                {
                  queue: manager
                }
              ]
            }
          ]
        }
      })
    });
  } catch (e) {
    throw new Error(`Workflow creation was unsuccessful'`);
  }
};

const buildTaskRouter = async newWorkspace => {
  const workspace = await createWorkspace(newWorkspace);
  const reserved = await getActivitySid(workspace.sid, 'Busy');
  const busy = await getActivitySid(workspace.sid, 'Reserved');
  const supportQueue = await createTaskQueue(
    workspace.sid,
    'Support',
    'support',
    reserved,
    busy
  );
  const salesQueue = await createTaskQueue(
    workspace.sid,
    'Sales',
    'sales',
    reserved,
    busy
  );
  const marketingQueue = await createTaskQueue(
    workspace.sid,
    'Marketing',
    'marketing',
    reserved,
    busy
  );
  const managerQueue = await createTaskQueue(
    workspace.sid,
    'Manager',
    'manager',
    reserved,
    busy
  );
  const francisco = await createWorker(workspace.sid, 'Francisco', ['support', 'sales', 'marketing'], ['en', 'es', 'fr']);
  const lisa = await createWorker(workspace.sid,'Lisa', 'manager', 'en');
  const frank = await createWorker(workspace.sid, 'Frank', ['sales', 'marketing'], ['en', 'es']);
  const workflow = await createWorkflow(
    workspace.sid,
    supportQueue.sid,
    salesQueue.sid,
    marketingQueue.sid,
    managerQueue.sid
  );
  return `Workspace "${workspace.friendlyName}" has been created with the following TaskQueues: ${supportQueue.friendlyName}, ${salesQueue.friendlyName}, ${marketingQueue.friendlyName} and ${managerQueue.friendlyName}! The following workers have been added to your Workspace: ${francisco.friendlyName}, ${frank.friendlyName}, and ${lisa.friendlyName}.`;
};

buildTaskRouter(process.env.WORKSPACE_NAME)
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e.message);
  });