#!/usr/bin/env node
import { Command } from "commander";
import { initProject } from "./commands/init.js";
import { add } from "./commands/add.js";
const program = new Command();

program
  .name("awesome-ui-cli")
  .description("CLI for managing your UI components")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize awesome-ui-cli library with required dependencies")
  .action(initProject);

program
  .command("add <component>")
  .description("Add a component to your project")
  .action(add);

program.parse();
