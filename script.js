let checkingBalance = 56780;
let savingsBalance = 14200;

let chartLoaded = false;
let cardFrozen = true;

function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if(u && p){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("dashboard").classList.add("active");

    updateBalances();
    generateTransactions();

    if(!chartLoaded){
      setTimeout(loadChart,200);
      chartLoaded = true;
    }

    document.getElementById("cardStatus").innerText = "Frozen";
  }
}

function logout() {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("login").classList.add("active");
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function deposit() {
  checkingBalance += 500;
  updateBalances();
}

function withdraw() {
  checkingBalance -= 200;
  updateBalances();
}

function transferToSavings(){
  checkingBalance -= 300;
  savingsBalance += 300;
  updateBalances();
}

function transferToChecking(){
  savingsBalance -= 300;
  checkingBalance += 300;
  updateBalances();
}

function updateBalances() {
  let checking = document.getElementById("checkingBalance");
  let savings = document.getElementById("savingsBalance");

  if(checking) checking.innerText = "$" + checkingBalance.toLocaleString();
  if(savings) savings.innerText = "$" + savingsBalance.toLocaleString();
}

function freeze() {
  cardFrozen = !cardFrozen;
  document.getElementById("cardStatus").innerText = cardFrozen ? "Frozen" : "Active";
}

function togglePassword() {
  let pass = document.getElementById("pass");
  pass.type = pass.type === "password" ? "text" : "password";
}

function generateTransactions(){

  const merchants = [
    "Amazon","Uber","Groceries","Coffee Shop","Restaurant",
    "Fuel Station","Online Store","Electric Bill","Water Bill",
    "Pharmacy","Clothing Store","Gym Membership","Streaming Service",
    "Internet Provider","Supermarket","Ride Share"
  ];

  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  for(let i=0;i<35;i++){

    let merchant = merchants[Math.floor(Math.random()*merchants.length)];
    let amount = Math.floor(Math.random()*120)+5;
    let isCredit = Math.random() > 0.8;

    let div = document.createElement("div");
    div.className = "transaction";

    let left = document.createElement("span");
    left.innerText = merchant;

    let right = document.createElement("span");
    right.className = isCredit ? "credit" : "debit";
    right.innerText = (isCredit?"+":"-")+"$"+amount;

    div.appendChild(left);
    div.appendChild(right);

    list.appendChild(div);
  }
}

function loadChart() {
  new Chart(document.getElementById("chart"), {
    type: 'doughnut',
    data: {
      labels: ["Food","Shopping","Bills","Transport"],
      datasets: [{
        data: [400,600,300,200],
        backgroundColor: ["#2a63ff","#ff7a00","#ff3d3d","#00c49f"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
