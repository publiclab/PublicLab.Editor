#!/usr/bin/env node

const { Octokit } = require('@octokit/rest');
const inquirer = require('inquirer');

const octokit = new Octokit({
    auth: '<GENERATE FROM HERE: https://github.com/settings/tokens>',
});

async function fetchAppParameters() {
  const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What is your name?",
        default: 'Jeff',
      },
    {  
        type: 'list',
        name: 'verson',
        message: "How will you describe the release upgrade? Note changes or any breaking changes if it's a major release, following Semantic Versioning conventions: https://docs.npmjs.com/about-semantic-versioning",
        default: 'Major',
        choices: ['Minor', 'Major'],
      },
      {
        type: 'input',
        name: 'isDraft',
        message: "Do you want to make Draft release? (y/n)",
        default: 'N',
      }
  ];
  return inquirer.prompt(questions).then(answers => {
    console.log(
      `Thanks for entering the information, kindly wait till I generate a perfect release for you.`
    );
    return answers;
  });

}

(async () => {
    const answers = await fetchAppParameters();
    const output = await octokit.repos.getLatestRelease({
      owner: 'publiclab',
      repo: 'plots2'
      });
    const latestTag = output.data.tag_name; 
    const currTag = latestTag.split('v')[1].split('.');
    const newTag = answers.verson === "Minor" ? ("v" + currTag[0] + "." + (parseInt(currTag[1]) + 1).toString()) : ("v" + (parseInt(currTag[0]) + 1).toString() + ".0");
    
    console.log("latestTag", latestTag);
    console.log("newTag", newTag);
    
    let commitHistory = ``;
    try {
        const result = await octokit.repos.compareCommits({
            owner: 'publiclab',
            repo: 'plots2',
            base: latestTag,
            head: "main"
          });    
           commitHistory = result.data.commits.reduce((acc, commitobj) => {
              const authorName = `@${commitobj.commit.author.name}`;
              const commit_sha = commitobj.sha;
              const commit_msg = commitobj.commit.message;
              const arr = commit_msg.split(' ')
              const PR_number = arr[0];
              arr.shift();
              const final_msg = arr.join(' ');
              return acc + "\n ### :baby: " +  authorName + " " + PR_number  + " (squashed commit: " + commit_sha + ")" + "\n" + final_msg + "\n";
          } , '');
    } catch(e) {
        console.error('Something went wrong!', e);
    }      

    try {
        const result = await octokit.repos.createRelease({
            owner: 'publiclab',
            repo: 'plots2',
            tag_name: newTag,
            draft: answers.isDraft.toUpperCase() === 'Y',
            name: `${answers.verson} Release ${newTag}`,
            body: "#### :sunflower: Release made by: " + answers.name +  "\n\n ### Changes: \n" +
            commitHistory
          });    
          console.log("Your release is ready here: ");
          console.log(result.data.html_url);
    } catch(e) {
        console.error('Something went wrong!', e);
    }      
})();
