'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Humoyun Rustamov',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Muhammadjon Komilov',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Muhammadaziz Xoldarov',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Jahongir Pulatov',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// console.log(accounts);
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMove = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${Math.abs(mov)}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMove(account1.movements);
//chain methods
const displaySum = function (account) {
  const sumIncome = account?.movements
    .filter(value => value > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const sumSpent = account.movements
    .filter(value => value < 0)
    .reduce((acc, curr) => acc + curr, 0);
  const sumInterest = account.movements
    .filter(value => value > 0)
    .map(value => (value * account.interestRate) / 100)
    .filter(inter => inter >= 1)
    .reduce((acc, inter) => acc + inter, 0);
  labelSumIn.textContent = `${sumIncome}€`;
  labelSumOut.textContent = `${Math.abs(sumSpent)}€`;
  labelSumInterest.textContent = `${sumInterest}€`;
};

////////// ==========USING forEach() METHOD WITH MAP TO CREATE USERNAME ========================
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(value => value[0])
      .join('');
  });
};

createUserNames(accounts);
// console.log(accounts);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const newFilter = movements.filter(function (value) {
  const age = value > 0 ? 45 : 43;
  return age;
});

const wwithdrawals = movements.filter(value => value < 0);

let reduceB = 0;
for (const mov of movements) reduceB += mov;

//for balance
const CalcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur);
  labelBalance.textContent = `${acc.balance}€`;
};

const accChalMAx = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
// console.log(accChalMAx);

const updateUI = function (acc) {
  displayMove(acc.movements);
  // curBalance
  CalcDisplayBalance(currentAcc);
  //sum
  displaySum(currentAcc);
};
let currentAcc;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    // welcoming
    labelWelcome.textContent = `Welcome back ${currentAcc.owner.split(' ')[0]}`;

    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = ''; // to clear the value input
    inputLoginPin.blur();
    updateUI(currentAcc);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    currentAcc.balance >= amount &&
    recieverAcc?.username !== currentAcc.username
  ) {
    recieverAcc.movements.push(amount);
    currentAcc.movements.push(-amount);
    updateUI(currentAcc);
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcc.movements.some(mov => mov >= amount * 0.1)) {
    // Add positive movement to current account
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
  }
  inputLoanAmount.value = '';
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcc.movements.some(mov => mov >= amount * 0.1)) {
    // Add positive movement to current account
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
  }
  inputLoanAmount.value = '';
});
// console.log(accounts);

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');
  if (
    inputCloseUsername.value === currentAcc.username &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    const indexF = accounts.findIndex(
      acc => acc.username === currentAcc.username
    );
    console.log(indexF);
    accounts.splice(indexF, 1);
    containerApp.style.opacity = 0;
  } else {
  }
  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = `Login in to get started`;
});

const array = [[[[2], 3], 4, 4], [4, 4, , 2], 3, 23, 2];

//flatMap
const newArr = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => acc + curr, 0);
// console.log(newArr);

// sort() method
const owners = ['Muhammadjon', 'Humoyun', 'Jahongir'];
owners.sort();

const movementss = [200, 450, -400, 3000, -650, -130, 70, 1300];
movementss.sort((a, b) => a - b);
// console.log(movementss);
movementss.sort((a, b) => b - a);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});
// practices to review all array methods:
//1.
const DepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(value => value > 0)
  .reduce((acc, curr) => acc + curr, 0);
console.log(DepositSum);
//2. how to know how many deposits over 1000
const numDepositOv1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(value => value >= 1000).length;
console.log(numDepositOv1000);
// 2. how to know how many deposits over 1000
const numbDepositOv1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);
console.log(numbDepositOv1000);

//3. how to use accumilator reduce method to create an object and make two properties with deposits and withdrawals in the account

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, curr) => {
      // acc[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
      curr > 0 ? (acc.deposits += curr) : (acc.withdrawals += curr);
      return acc;
    },
    { deposits: 0, withdrawals: 0 } // does not work without manually creating these =
    // { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

//4. to convert some letters to uppercase : jame has big airplanes  -> Jame Has Big Airplanes

const convertLetters = function (titles) {
  const capitilize = str => str[0].toUpperCase() + str.slice(1);
  const exeptions = ['a', 'an', 'and', 'the', 'but', 'with', 'or', 'on', 'in'];
  const titlesCapitil = titles
    .toLowerCase()
    .split(' ')
    .map(fWord => (exeptions.includes(fWord) ? fWord : capitilize(fWord)))
    .join(' ');

  return capitilize(titlesCapitil);
};
console.log(convertLetters('A jame has big airplanes'));
