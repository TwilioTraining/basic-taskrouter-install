const accountSid = 'AC537d7ba26bdcad528df1380c51237e65';
const authToken = '143aa6b579d5314fc200f1168e2fc353';
const client = require('twilio')(accountSid, authToken);


// Build a TaskRouter instance and return it's SID
// Get 2 activity SIDS

const createWorkspace = async () => {
  const response = await client.taskrouter.workspaces
  .create({
    eventCallbackUrl: 'http://requestb.in/vh9reovh',
    template: 'FIFO',
    friendlyName: 'NewWorkspace1'
  });
  return response.sid;
}

createWorkspace().then(ws => {
  console.log(ws);
})
// const buildTaskrouter = async (worspace) => {

// }
// client.taskrouter.workspaces
//   .create({
//     eventCallbackUrl: 'http://requestb.in/vh9reovh',
//     template: 'FIFO',
//     friendlyName: 'NewWorkspace'
//   })
//   .then(workspace => {
//     client.taskrouter.workspaces(workspace.sid)
//     .activities
//     .each(activities => {
//       if (activities.friendlyName == 'Reserved') {
//         var reservedSid = activities.sid;
//       }
//       if (activities.friendlyName == 'Busy') {
//         var assignedSid = activities.sid;
//       }
      
//     });


//     let activities = client.taskrouter.workspaces('workspace.id').activities;
//     console.log(activities);
//     // client.taskrouter.workspaces('workspace.id')
//     // .taskQueues
//     // .create({
//     //    targetWorkers: `languages HAS "english"`,
//     //    friendlyName: 'English',
//     //    reservationActivitySid: 'WAea296a56ebce4bfbff0e99abadf16934',
//     //    assignmentActivitySid: 'WA21d51f4c72583766988f9860de3e130a'
//     //  })
//     // .then(task_queue => console.log(task_queue.sid))
//     // .done();
//   })
//   .done();