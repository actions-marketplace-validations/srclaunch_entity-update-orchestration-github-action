"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const github = __importStar(require("@actions/github"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function runCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        let myOutput = '';
        let myError = '';
        const options = {
            cwd: './',
            listeners: {
                stderr: (data) => {
                    myError += data.toString();
                },
                stdout: (data) => {
                    myOutput += data.toString();
                },
            },
        };
        yield exec.exec('node', command.split(' '), options);
        console.log(myError);
        console.log(myOutput);
    });
}
function main() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projectId = core.getInput('srclaunch-project-id');
            const pipelineSecret = core.getInput('srclaunch-project-pipeline-secret');
            const diff = core.getInput('diff');
            console.log('diff', diff);
            const githubToken = core.getInput('github-token');
            const context = github.context;
            const repo = context.repo;
            const pushPayload = github.context.payload;
            const beforeRef = pushPayload.before;
            const afterRef = pushPayload.after;
            const headCommit = pushPayload.head_commit;
            const octokit = github.getOctokit(githubToken);
            try {
                // const globber = await glob.create('entities/*.model.ts');
                // for await (const file of globber.globGenerator()) {
                // const content = await fs.readFile(file, 'utf8');
                // console.log(file);
                // console.log(content);
                // }
                for (var diff_1 = __asyncValues(diff), diff_1_1; diff_1_1 = yield diff_1.next(), !diff_1_1.done;) {
                    const file = diff_1_1.value;
                    const fileName = path_1.default.join(path_1.default.dirname(__dirname), file);
                    const content = yield fs_1.promises.readFile(fileName, 'utf8');
                    console.log(file);
                    console.log(content);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (diff_1_1 && !diff_1_1.done && (_a = diff_1.return)) yield _a.call(diff_1);
                }
                finally { if (e_1) throw e_1.error; }
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
        }
        catch (error) {
            console.log('error', error);
            // core.setFailed(error.message);
        }
    });
}
main();
