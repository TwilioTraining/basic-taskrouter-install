# A Basic TaskRouter Setup

## What is This?

This is a Node.js script that will quickly build a Twilio TaskRouter Workspace with 4 TaskQueues, 3 Workers and 1 Workflow. Use this code if you would like to spin up a TaskRouter instance to practice with, understand and get to know the basics of TaskRouter. All of the code/instructions used to build this script can be found here: https://www.twilio.com/docs/taskrouter. 

## Instructions
1. Make sure you have a Twilio account. If you don't have one you can get one here: https://www.twilio.com/try-twilio.
2. Make sure you have a recent version of Node.js on your computer.
3. Download this code to a local directory on your computer. Either clone or download the zip.
4. From terminal/commandline `cd` into the `basic-taskrouter-install` directory.
5. In terminal/commandline run `npm install`. This will install the necessary node modules you need for running this code.
6. Once that has finished running create a `.env` file in the `basic-taskrouter-install` directory.
7. Copy the values from the `.env.example` file into your `.env` file.
8. Be sure to fill out the values in your `.env` file. You can find your ACCONT_SID and AUTH_TOKEN here: https://www.twilio.com/console. The values in your `.env` file would look something like this:
```
ACCOUNT_SID='AC#################################'
AUTH_TOKEN='################################'
WORKSPACE_NAME='My new workspace'
```
9. Once all your changes are saved, from your terminal/commandline run `node buildtr.js`.

If you've filled in all of the information properly in your `.env` file you should get a message in your terminal that looks like this:
```
Workspace "My new workspace" has been created with the following TaskQueues: Support, Sales, Marketing and Manager! The following workers have been added to your Workspace: Francisco, Frank, and Lisa.
```

## Final Notes
Please keep in mind that this is not production code. This code was written so it is easy to follow, provides you with an example of how to use async/await with the Twilio Node.js helper library, and so you can get an understanding of how to work with the basics of the Twilio TaskRouter API. You can always make additional configurations in the Twilio Console (I strongly encourage you to do this if you are trying to learn the ins and outs of TaskRouter), or by modifying this code.

Enjoy! :beers: