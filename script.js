// Get DOM elements
const form = document.getElementById('form');
const descriptionInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const balanceElement = document.getElementById('balance');
const transactionList = document.getElementById('list');

// Initialize the transactions array from local storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to save transactions to local storage
const saveTransactions = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Function to calculate and display inflow, outflow, and balance
const calculateSummary = () => {
  let inflow = 0;
  let outflow = 0;

  transactions.forEach((transaction) => {
    const amount = parseFloat(transaction.split(' ')[0]);
    if (amount >= 0) {
      inflow += amount;
    } else {
      outflow -= amount;
    }
  });

  const balance = inflow - outflow;

  incomeElement.textContent = `$${inflow.toFixed(2)}`;
  expenseElement.textContent = `$${outflow.toFixed(2)}`;
  balanceElement.textContent = `$${balance.toFixed(2)}`;
};

// Function to add a transaction
const addTransaction = (event) => {
  event.preventDefault();

  const description = descriptionInput.value.trim();//were getting its value then using trim. The trim() method is used to remove any leading or trailing whitespace characters (spaces, tabs, newlines) from the user input. It ensures that the description is clean and doesn't have unnecessary spaces.
  const amountText = amountInput.value.trim();

  const errorMsg = document.getElementById('error_msg');
  if (description == '' || amountText == '') {
    errorMsg.textContent = 'Please enter a valid description and amount.';
    setTimeout(() => {
      errorMsg.textContent =''
    }, 5000);
    return;
  }

  let sign;//we are declaring a variable named sign without assigning any initial value to it. When you declare a variable using let without assigning a value, the variable is initialized with the value undefined. In this case, the sign variable is declared but has no value until later in the code when its value is determined based on user input.
  let amount;
  //Both sign and amount are placeholders for the values that will be extracted from the user input. The actual values will be assigned to these variables within the addTransaction function based on the user's input and the logic for determining whether it's an inflow or outflow.

  if (amountText.startsWith('-')) {
    sign = '-';
    amount = parseFloat(amountText.substring(1));//If the amountText starts with "-", we want to extract the numeric value without the leading "-" sign. The substring(1) method is used to remove the first character (the "-") from the amountText. Then, parseFloat() is used to convert the resulting string to a floating-point number (a number with decimal places).
  } else if (amountText.startsWith('+')) {
    sign = '+';
    amount = parseFloat(amountText.substring(1));
  } else {
    sign = '+';
    amount = parseFloat(amountText);
  }

  const transaction = `${sign}${amount.toFixed(2)} (${description})`; 

  transactions.push(transaction);
  saveTransactions();
  displayTransactions();
  calculateSummary();

  descriptionInput.value = '';//emptying them out again
  amountInput.value = '';
};

// Function to remove a transaction
const removeTransaction = (index) => {
  transactions.splice(index, 1);
  saveTransactions();
  displayTransactions();
  calculateSummary();
};

// Function to create a remove button element
const createRemoveButton = (index) => {
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('delete-btn');
  removeBtn.textContent = 'X';
  removeBtn.addEventListener('click', () => removeTransaction(index));
  return removeBtn;
};

// Function to display transactions
const displayTransactions = () => {
  transactionList.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = transaction;
    listItem.appendChild(createRemoveButton(index));
    transactionList.appendChild(listItem);
  });
};

// Initialize the app
const initApp = () => {
  displayTransactions();
  calculateSummary();
};

// Event listeners
form.addEventListener('submit', addTransaction);

// Initialize the ap

initApp();
