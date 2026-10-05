const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

// ANSI color formatting
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const MAGENTA = "\x1b[35m";

console.log(`${BOLD}${CYAN}`);
console.log("==================================================");
console.log("       🗳️   VoteWise India - Unified Runner       ");
console.log("==================================================");
console.log(`${RESET}`);

const serverDir = path.join(__dirname, "server");
const clientDir = path.join(__dirname, "client");

// Pre-flight checks
if (!fs.existsSync(path.join(serverDir, ".env"))) {
  console.log(`${YELLOW}⚠️  Warning: server/.env file not found!${RESET}`);
  console.log(`   Please copy server/.env.example to server/.env and fill in your keys.\n`);
}

if (!fs.existsSync(path.join(serverDir, "node_modules"))) {
  console.log(`${RED}❌ server/node_modules is missing. Run 'cd server && npm install' first.${RESET}`);
  process.exit(1);
}

if (!fs.existsSync(path.join(clientDir, "node_modules"))) {
  console.log(`${RED}❌ client/node_modules is missing. Run 'cd client && npm install' first.${RESET}`);
  process.exit(1);
}

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";

function pipeOutput(stream, prefix, color) {
  const rl = readline.createInterface({ input: stream });
  rl.on("line", (line) => {
    console.log(`${color}${BOLD}[${prefix}]${RESET} ${line}`);
  });
}

function pipeError(stream, prefix, color) {
  const rl = readline.createInterface({ input: stream });
  rl.on("line", (line) => {
    console.error(`${color}${BOLD}[${prefix}]${RESET} ${line}`);
  });
}

console.log(`${GREEN}🚀 Starting Backend Server (Port 8000)...${RESET}`);
const serverProcess = spawn(npmCmd, ["run", "dev"], {
  cwd: serverDir,
  stdio: ["inherit", "pipe", "pipe"],
  env: { ...process.env, FORCE_COLOR: "1" }
});

pipeOutput(serverProcess.stdout, "SERVER", CYAN);
pipeError(serverProcess.stderr, "SERVER", RED);

console.log(`${GREEN}🚀 Starting Frontend Client (Port 5173)...${RESET}`);
const clientProcess = spawn(npmCmd, ["run", "dev"], {
  cwd: clientDir,
  stdio: ["inherit", "pipe", "pipe"],
  env: { ...process.env, FORCE_COLOR: "1" }
});

pipeOutput(clientProcess.stdout, "CLIENT", MAGENTA);
pipeError(clientProcess.stderr, "CLIENT", RED);

console.log(`\n${BOLD}Press ${YELLOW}Ctrl + C${RESET}${BOLD} at any time to stop all services.${RESET}\n`);

// Handle graceful termination
let isShuttingDown = false;
function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n${YELLOW}🛑 Stopping all VoteWise India services...${RESET}`);

  try {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill("SIGTERM");
    }
  } catch (e) {}

  try {
    if (clientProcess && !clientProcess.killed) {
      clientProcess.kill("SIGTERM");
    }
  } catch (e) {}

  setTimeout(() => {
    process.exit(0);
  }, 500);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

serverProcess.on("close", (code) => {
  if (code !== 0 && code !== null && !isShuttingDown) {
    console.log(`${RED}⚠️  Server process exited with code ${code}${RESET}`);
  }
});

clientProcess.on("close", (code) => {
  if (code !== 0 && code !== null && !isShuttingDown) {
    console.log(`${RED}⚠️  Client process exited with code ${code}${RESET}`);
  }
});