import { readdir } from "fs";
import { execSync } from "child_process";
import chalk from "chalk";

const args = process.argv.slice(2);

function compileSass(args) {
    readdir(process.cwd(), (err, folders) => {
        if (err) {
            console.log(err);
            return;
        }

        const path = folders.find(folder => folder.toLowerCase().includes(args.toLowerCase()));
        const command = `sass ./"${path}"/scss/main.scss ./"${path}"/style.css --watch --style=compressed --no-source-map`;

        console.log(chalk.greenBright.bold(`🚀 Compiling SASS on the "${path}" project...`));
        execSync(command, { stdio: "inherit" });
    });
}

if (!args || args.length === 0) {
    console.error(chalk.red.bold("🚨 An argument must be provided..."));
    process.exit(0);
}

compileSass(args[0]);
