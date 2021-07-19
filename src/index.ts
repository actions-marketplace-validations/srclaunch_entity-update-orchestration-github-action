import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import * as glob from '@actions/glob';
import {PushEvent} from '@octokit/webhooks-definitions/schema';

async function runCommand(command: string) {
  let myOutput = '';
  let myError = '';
  const options = {
    cwd: './',
    listeners: {
      stderr: (data: Buffer) => {
        myError += data.toString();
      },
      stdout: (data: Buffer) => {
        myOutput += data.toString();
      },
    },
  };

  await exec.exec('node', command.split(' '), options);

  console.log(myError);
  console.log(myOutput);
}

async function main() {
  try {
    const projectId = core.getInput('srclaunch-project-id');
    const pipelineSecret = core.getInput('srclaunch-project-pipeline-secret');
    const githubToken = core.getInput('github-token');
    const context = github.context;
    const repo = context.repo;
    const pushPayload = github.context.payload as PushEvent;

    const headCommit = pushPayload.head_commit;

    const octokit = github.getOctokit(githubToken);

    const globber = await glob.create('entities/*.model.ts');

    for await (const file of globber.globGenerator()) {
      console.log(file);
    }

    // await runCommand('ls -la');

    // octokit.rest.repos.downloadTarballArchive({
    //   owner: repo.owner,
    //   ref: context.ref,
    //   repo: repo.repo,
    // });
    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

    // const { data: pullRequest } = await octokit.rest.pulls.get({
    //   mediaType: {
    //     format: 'diff',
    //   },
    //   owner: 'octokit',
    //   pull_number: 123,
    //   repo: 'rest.js',
    // });

    // console.log(`Hello ${nameToGreet}!`);
    // const time = new Date().toTimeString();

    // core.setOutput('time', time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);

    console.log(`The event payload: ${payload}`);
  } catch (error) {
    console.log('error', error);
    // core.setFailed(error.message);
  }
}

main();
