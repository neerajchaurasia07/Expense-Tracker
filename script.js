const form = document.getElementById("form");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((a, b) => a + b, 0).toFixed(2);
  const inc = amounts.filter(v => v > 0).reduce((a, b) => a + b, 0).toFixed(2);
  const exp = (amounts.filter(v => v < 0).reduce((a, b) => a + b, 0) * -1).toFixed(2);

  balance.textContent = ₹${total};
  income.textContent = ₹${inc};
  expense.textContent = ₹${exp};
}

function addTransactionDOM(transaction) {
  const item = document.createElement("li");
  item.classList.add(transaction.amount > 0 ? "income" : "expense");
  item.innerHTML = `
    ${transaction.desc} <span>${transaction.amount > 0 ? "+" : ""}₹${transaction.amount}</span>
    <button onclick="removeTransaction(${transaction.id})">❌</button>
  `;
  list.appendChild(item);
}

function updateDOM() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateDOM();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const transaction = {
    id: Date.now(),
    desc: desc.value,
    amount: +amount.value
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  desc.value = "";
  amount.value = "";
  updateDOM();
});

updateDOM();
