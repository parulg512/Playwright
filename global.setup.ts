import { FullConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";
            
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function globalSetup(config:FullConfig) {
// read the env variable from the command line or default 'local'
const envName = process.env.ENV || "local";
const envFile = `.env.${envName}`;
const envPath = path.resolve(`env/${envFile}`);

//load envrioment variables from the selected file
dotenv.config({path: envPath});

console.log("GLOBAL Setup Started.....");
console.log(`Loaded environment: ${envName}`);

}
export default globalSetup;