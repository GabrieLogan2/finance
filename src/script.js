const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

// Array para armazenar as transações
let transactions = [];

// Função para adicionar uma nova transação
function addTransaction(event) {
  event.preventDefault();

  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (description.trim() === '' || isNaN(amount)) {
    alert('Por favor, preencha todos os campos corretamente');
    return;
  }

  const transaction = {
    id: generateID(),
    description,
    amount
  };

  transactions.push(transaction);

  descriptionInput.value = '';
  amountInput.value = '';

  saveTransactions();
  renderTransactions();
}

// Função para gerar um ID único para a transação
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// Função para remover uma transação
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  saveTransactions();
  renderTransactions();
}

// Função para salvar as transações no localStorage
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Função para carregar as transações do localStorage
function loadTransactions() {
  const transactionsData = localStorage.getItem('transactions');
  if (transactionsData) {
    transactions = JSON.parse(transactionsData);
    renderTransactions();
  }
}

// ...

// Função para renderizar as transações na tela
function renderTransactions() {
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const item = document.createElement('div');
    item.classList.add('transaction-item');

    const text = document.createElement('span');
    text.innerText = `${transaction.description} - R$ ${transaction.amount.toFixed(2)}`;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Pago'; // Alterado para "Pago"
    removeButton.addEventListener('click', () => removeTransaction(transaction.id));

    item.appendChild(text);
    item.appendChild(removeButton);

    transactionList.appendChild(item);
  });
}

// ...

transactionForm.addEventListener('submit', addTransaction);

// Carrega as transações do localStorage ao carregar a página
loadTransactions();
