const Stack = require("./Stack.js");
const prompt = require("prompt-sync")();
let currentPage = "Default page";

const backPages = new Stack();
const nextPages = new Stack();
// ------------------------------

// We create helper functions to helps us implement the basic operations of this program.
function showCurrentPage(action) {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log("Back page = ", backPages.peek());
  console.log("Next Page = ", nextPages.peek());
}

function newPage(page) {
  backPages.push(currentPage);
  currentPage = page;

  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage("New: ");
}

backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage("Back: ");
};

nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage("Next: ");
};
// ------------------------------

// ------------------------------
// User Interface Part 1
// ------------------------------

let finish = false;

let showBack = false;
let showNext = false;
// ------------------------------

showCurrentPage("Default: ");
// ------------------------------

while (finish === false) {
  /*The following strings are used to prompt the user. These strings contain user input instructions that will be referenced in the while loop.
   */
  const baseInfo = "\nEnter a url";
  const backInfo = "B|b for back page";
  const nextInfo = "N|n for next page";
  const quitInfo = "Q|q for quit";
  const question = "Where would you like to go today? ";

  let instructions = baseInfo;
  if (!backPages.isEmpty()) {
    instructions = `${instructions},
     ${backInfo}`;
    showBack = true;
  } else {
    showBack = false;
  }

  // ------------------------------

  if (!nextPages.isEmpty()) {
    instructions = `${instructions},
    ${nextInfo}`;
    showNext = true;
  } else {
    showNext = false;
  }
  // ------------------------------

  instructions = `${instructions},
 ${quitInfo}.`;
  console.log(instructions);

  const answer = prompt(question);

  let lowerCaseAnswer = answer.toLowerCase();

  if (
    lowerCaseAnswer !== "n" &&
    lowerCaseAnswer !== "b" &&
    lowerCaseAnswer !== "q"
  ) {
    newPage(answer);
  } else if (showNext === true && lowerCaseAnswer === "n") {
    nextPage();
  } else if (showBack === true && lowerCaseAnswer === "b") {
    backPage();
  } else if (lowerCaseAnswer === "b") {
    console.log("Cannot go back a page. Stack is empty.");
  } else if (lowerCaseAnswer === "n") {
    console.log("Cannot go to the next page. Stack is empty.");
  } else if (lowerCaseAnswer === "q") {
    finish = true;
  }
}
