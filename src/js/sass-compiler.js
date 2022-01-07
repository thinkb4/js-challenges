import { readdir } from "fs";
import { execSync } from "child_process";
import chalk from "chalk";
import { resolve } from "path";

const args = process.argv.slice(2);
const challengesFolder = "challenges";

function compileSass(args) {
    readdir(resolve([process.cwd(), challengesFolder].join("/")), (err, folders) => {
        if (err) {
            console.log(err);
            return;
        }

        const path = folders.find(folder => folder.toLowerCase().includes(args.toLowerCase()));
        const folder = `./${challengesFolder}/"${path}"`;
        const command = `sass ${folder}/scss/main.scss ${folder}/style.css --watch --style=compressed --no-source-map`;

        console.log(chalk.greenBright.bold(`🚀 Compiling SASS on the "${path}" project...`));
        execSync(command, { stdio: "inherit" });
    });
}

if (!args || args.length === 0) {
    console.error(chalk.red.bold("🚨 An argument must be provided..."));
    process.exit(0);
}

compileSass(args[0]);
