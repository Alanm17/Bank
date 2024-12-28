'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollDown = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const h1 = document.querySelector('h1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const sections = document.querySelectorAll('.section'); //nodelist
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const maxSlide = slides.length;
const allImageN = document.querySelectorAll('img[data-src]');
const dotOwner = document.querySelector('.dots');
let curSlide = 0;

function callObserve(entries, _) {
  if (!entries[0].isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
// bu IntersectionObserver funksiyasi asosan sticky nav yoki bar larga ishlatiladi
// observer.observe(header); bu narsa headerni belgilab olp unga threshold: 0, shu narsa bilan tasir foizini belgilab nmanidir boshlash yoki boshlamaslikni buyuradi callback fnc bilan agar tasir bor bolsa isIntersecting true truda yoksa false ex:if (!entries[0].isIntersecting) nav.classList.add('sticky');

const observer = new IntersectionObserver(callObserve, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);

// nice scrolled textAll

const revealFunc = function (secHead) {
  secHead.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observerr.unobserve(entry.target); //For the revealFunc function, we want to reveal sections as they come into view. Once a section is revealed, we no longer need to monitor it, so we unobserve it to improve performance.
  });
};
const observerr = new IntersectionObserver(revealFunc, {
  root: null,
  threshold: 0.15,
  // rootMargin: `-50px`,
});
sections.forEach(section => {
  observerr.observe(section);
  section.classList.add('section--hidden'); // +++++++++++++++++++++++++++++++++++++++++togrila
});
// working with lazy loading images !important
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //importantpart bu joyda biz asosiy img yani 0.1mb lik img ni 1 mb lik imgga almashtryabmiz
  entry.target.src = entry.target.dataset.src;
  // addEventListener('load' vazifasi qachonki entry.target tayyor bolsa yani yangi rasmni joylagandan keyin blur classni remove qiladi
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target); //For the loadImg function, we want to load images when they come into view. Once an image is loaded, we unobserve it because it no longer needs to be monitored.
};
const lazyLoad = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
allImageN.forEach(img => lazyLoad.observe(img));

// working with slides

// slider.style.transform = 'scale(0.6) ';
// slider.style.overflow = 'visible';
// slider.style.width = '100rem';
// const visibleSlide = 2;
const dotActive = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const slideIt = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`; // eng muhum joyi shu ==========>
  }); // BU funksiya translateX(${100 * (i - slide) har bir elementga 100 * joyidan qozgalish foizini beradi va unga transiton berilgan
};

const prevSlide = function () {
  if (curSlide == 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  slideIt(curSlide);
  dotActive(curSlide);
};
slideIt(0);
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slideIt(curSlide);
  dotActive(curSlide);
};
btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

setInterval(() => {
  nextSlide();
  slideIt(curSlide);
  // dotActive(curSlide);
}, 9000);
// keyboard slideChange func event
document.addEventListener('keydown', function (e) {
  console.log(e);
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
// dots
const createDots = function () {
  slides.forEach(function (_, i) {
    dotOwner.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

dotOwner.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    // console.log(slide);
    console.log(e.target.dataset);
    slideIt(slide);
    dotActive(slide);
  }
}); // // adding an event listner to Learn More button
// // scroll function
scrollDown.addEventListener('click', function (e) {
  // const coordsS1 = section1.getBoundingClientRect();
  // console.log(coordsS1);
  // console.log(e.target.getBoundingClientRect()); // updated version of pageX/YOffset is scrollY/X
  // console.log('this is the data of X', window.scrollY, window.scrollX); //The window.pageXOffset property returns the number of pixels that the document has been horizontally scrolled from the left edge. Similarly, window.pageYOffset returns the number of pixels that the document has been vertically scrolled from the top edge.
  // console.log(document.documentElement.clientHeight); // bu ekran klentga qancha darajada ochiqligini px lda korsatadi
  // // window.scrollTo(
  //   window.scrollX + coordsS1.left,
  //   coordsS1.top + window.scrollY
  // );
  // window.scrollTo({
  //   left: coordsS1.left + window.scrollX,
  //   top: coordsS1.top + window.scrollY,
  //   behavior: 'smooth',
  // }); // we made function and object inside and specified each property and added behavior to our scroll function
  section1.scrollIntoView({ behavior: 'smooth' });
});
// so in order to make this function we needed first section1.getBoundingClientRect() to get coordinates/pixels of each sides and after window.scrollTo() function to use scroll window.scrollX + coordsS1.left, coordsS1.top + window.scrollY  scrollY/X
// vertical means '|' and horizontal '__'
//
//
// Info Bar Selection Page
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//NAV HOVERING

const hoverOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // this method called 'contains()' can be used to find class names
    const link = e.target;
    // const siblings = nav.querySelectorAll('.nav__link'); //const siblings = link.closest('.nav')// this closest method is used to find the more relative class name or parent element of the target which is clicked over mouseovered
    // console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');
    // console.log(logo);
    /// here we are simply selecting all html link elements named nav__link and adding funcion to each of them with the help of forEach method
    nav.querySelectorAll('.nav__link').forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = 1; // we selected logo seperately as it was the first child of parent nav so we made the value of 1 set
  }
};

nav.addEventListener('mouseover', hoverOver.bind(0.5)); // so we can use bind method to set value in function
nav.addEventListener('mouseout', hoverOver.bind(1)); // same here
// reminder bind method creates the same function with its this keyword to set the provided value or set value
// now the point is hoverOver.bind(0.5)) in this function as we could not just set values to the function because we could not use it in two functions we did so  we equaled the opacity to == this and with bind method we created the same function inside Event and set desired value inside bind . so the parent of this bind is the value entered value === this
//ex :
// hoverOver.bind(0.5) // output this==0.5

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//// here we are using for loop to run all elements named btn--show-modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// this btn 'keyword' listener helps us to remove model with "escape" key and !modal.classList.contains('hidden') is here to check if there is any hidden class available or not if yes closeModal() func runs ↓
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/// nav bar scrolling with using target and contains and matching strategy event deligation
// The event.target property can be used in order to implement event delegation.
// vent delegation is a powerful technique that simplifies event handling, improves performance, and enhances the flexibility of your code. By leveraging the event bubbling mechanism, you can efficiently manage events on a group of elements rather than dealing with each one individually.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// // selecting elementss
// const header = document.querySelector('.header');
// const allSelections = document.querySelectorAll('.section');
// console.log(allSelections);
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button'); // <button> <- this is called tag
// document.getElementsByClassName('btn');
// // creating elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies for better functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';
// //placing the div .
// // header.prepend(message);
// header.append(message);
// // header.after(message);
// // header.before(message);
// //delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// /// classlist Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// console.log(message.style.backgroundColor);
// console.log(message.style.width);
// console.log(getComputedStyle(message).backgroundColor);
// console.log(getComputedStyle(message).height);

// message.style.height = // the original height is 49px  and now it is becoming 79px as 30 is added with parseFloat
//   Number.parseFloat(getComputedStyle(message).height) + 30 + 'px'; // here with parseFloat we are taking the number out of string and adding to the original class
// console.log(getComputedStyle(message).height);
// // we use setProperty method to change values of variables in css :root and we need to select it using documentElement as it belongs to document
// document.documentElement.style.setProperty('--color-primary', '#fa8074');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo);
// console.log(logo.alt);
// console.log(logo.getAttribute('src'));
// console.log(logo.src);
// //non-standard
// console.log(logo.designer); // undefined
// // getAttribute = tegishli bo'lgan dep tarjima qilinib u bilan masalan classga id yoki bu joyda designer degan elementga tegishli bolgan value ni olish uchun yoki o'zgartrish uchun setAttribute() dan foydalansa boladi
// console.log(logo.getAttribute('designer')); //Alan
// console.log(logo.setAttribute('designer', 'Muhammadaziz'));
// //yoki yaratsa boladi
// logo.setAttribute('lives', 'Korea');
// console.log(logo.className);
// console.log(logo.id);
// console.log(document.querySelector('.nav__link--btn').getAttribute('href')); //link ni ham olsak boladi
// console.log(logo.dataset.versionN); //getting property named data-version-n

// logo.classList.add('b', 'a'); // output nav__logo itslef and then b a like class ='nav__logo b a'
// logo.classList.remove('b', 'a'); // removes
// logo.classList.toggle('c'); //adding class
// console.log(logo.classList.contains('c')); //true
// console.log(logo);
//
// rgb(255, 255, 255);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// //
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// //
// //
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

//
// DOm traversing

// const h11 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.parentNode);
// console.log(h11.parentElement);
h1.firstElementChild.style.color = '#ffff';
h1.lastElementChild.style.color = 'orangered';

/// going upward parents
h1.closest('.h2');
// h1.closest('.header').style.background = 'var(--gradient-primary)';
//The closest() method searches up the DOM tree for elements which matches a specified CSS selector.

//The closest() method starts at the element itself, then the anchestors (parent, grandparent, ...) until a match is found.

//The closest() method returns null() if no match is found.
// berilgan nom yani .header ni h1 ga eng yaqinini topadi va belgilaydi

// going sideways:siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement);
// console.log(h1.parentElement.children);
// console.log();

document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
});
window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

// displaySum(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// .innerHTML = innerHTML is an HTML element property that has two uses for web developers: 1) You can use it to get the internal HTML content of any HTML element as an HTML string. 2) You can also use it to set or change elements' innerHTML content
// .insertAdjacentHTML() method provides an efficient way to manipulate web page structure without replacing all the content of an element. It's also the go-to method for inserting HTML elements or text elements into a specific position.
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//======================== destrucitng for practice
// let arr = ['a', 'b', 'r', 'b', 'g'];
// const [a, b, ...r] = arr;
// console.log(a, b, r);
// const [...jake] = [a, b, r];
// console.log(jake);
// console.log(a, jake);
// jake[1] = 's';

// console.log(arr);
// console.log(jake);
//=============================================================== SPLICE ARRAY METHOD
// console.log(arr.slice(2, 3));
// console.log(arr);
// console.log(arr.splice(2, 2));
// console.log(arr.splice(1));

// console.log(arr);
// let arr2 = ['a', 'b', 'r', 'b', 'g'];
// console.log(arr2.reverse());
// console.log(arr2.reverse(2, 3));

// console.log(arr2.join(' '));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [index, value] of movements.entries()) {
//   value > 0
//     ? console.log(`The move ${index + 1} You have deposited ${value}`)
//     : console.log(
//         `The move ${index + 1} You have withdrawn ${Math.abs(value)}`
//       );
// }

// console.log(
//   'for each method!================================================='
// );

// movements.forEach(function (value, index, array) {
//   value > 0
//     ? console.log(
//         `The move ${index + 1} You have deposited ${value} with ${array}`
//       )
//     : console.log(
//         `The move ${index + 1} You have withdrawn ${Math.abs(
//           value
//         )} with ${array}`
//       );
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, [...map]) {
//   console.log(`${key}: ${value} ${map}`);
// });
// const newCurrencies = new Set(['USD', 'GBP', 'UZS', 'UZS']);
// console.log(newCurrencies);
// newCurrencies.forEach(function (value, key) {
//   console.log(`${key}: ${value}`); // there are no any keys in this Array so forEach method takes the value itself as key and logs it javaScript made this to avoid any confusions
// });

// challange
// function for age seppereation with forEach() method
// using shallow copying using slice() method to remove 2 ages from julia
// create one array with full corrected info of kate and julia
// For each remaining dog,log to the console whether it's an adult("Dog number 1 is an adult,and is 5 years old"') or a puppy ("Dog number 2 is still a puppy"）
// Julia = [3, 5, 2, 12, 71] , kate's data [4,2,15,8,3]
// julia = [9,16,6,8,3], kate's [10,5,6,1,4]
// const me = [3, 2, 1, 8];
// const createOne = function (julie, kate) {
//   const shallowCopy = julie.slice();
//   shallowCopy.splice(0, 1);
//   shallowCopy.splice(-2);
//   console.log(shallowCopy);
//   const fullData = shallowCopy.concat(kate);
//   fullData.forEach(function (value, i) {
//     value > 3
//       ? console.log(`Dog number ${i + 1} is an adult,and is ${value} years old`)
//       : console.log(`Dog number ${i + 1} is still a puppy`);
//   });
// };

// const julie = [3, 5, 2, 12, 71];
// const kate = [4, 2, 15, 8, 3];

// createOne(julie, kate);

// const usdCur = 1.1;
// const transferUSD = movements.map(value => value * usdCur);

// console.log(movements);
// console.log(transferUSD);

// const newTestArray = [];
// for (const value of movements) newTestArray.push(value * usdCur);
// console.log(newTestArray);

// movements.forEach(function (value, i) {
//   console.log(`${i + 1} of ${Math.abs(value)}`);
// });
// // console.log(james);
// console.log('=====map method below========');
// const newmove = movements.map(function (value, i) {
//   return `${i + 1} of ${Math.abs(value)}`;
// });
// console.log(newmove);

// const nameOf = 'Steven Thomas Williams';
// const user = nameOf
//   .toLowerCase()
//   .split(' ')
//   .map(value => value[0])
//   .join('');
// console.log(user);
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
// console.log(newFilter);

const wwithdrawals = movements.filter(value => value < 0);

// console.log(withdrawals);

// const reduceAr = movements.reduce(function (acc, curr, i, arr) {
//   console.log(`${acc + curr} <=== ${curr},<===${i + 1}`);
//   return acc + curr;
// }, 200); // initial value
// console.log(reduceAr);

let reduceB = 0; // variable with ' let '  not ' const ' as it is not changable
for (const mov of movements) reduceB += mov;
// console.log(reduceB);

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

// challenge
// calculate the dog age in human years using the followingformula = if the dog is < 2 years old,
// humanAge = 2 * dogAge.
// If the dog is › 2 years old,humanAge = 16 + dogAge * 4.

// console.log(dogs1);

const filtertheDogs = function (dogs) {
  const humanAge = dogs.map(ages => (ages <= 2 ? 2 * ages : 16 + ages * 4));
  const filtertheAGe = humanAge.filter(adult => adult >= 18);
  // console.log(humanAge);
  // console.log(filtertheAGe);
  // const gatherAll =
  //   filtertheAGe.reduce((acc, curr, i, arr) => acc + curr, 0) /
  //   filtertheAGe.length; // here we first calculated and reduced all values and after we are assigning divide operator to get AVG of them . what reduce method is doing here is only to add values as we ordered it to do and after it did it is becoming the single value like 23+23+23 = 69 . so this ' 69 ' is the value came from reduce method and all we need to do it is to devide it to get AVG so after the order is completed which is ) bracket we can use / divide operator and put the / array.length
  const gatherAll = filtertheAGe.reduce(
    (acc, curr, i, arr) => acc + curr / arr.length,
    0
  );
  return gatherAll;
};
const dogs1 = [5, 2, 4, 1, 15, 8, 3];
const dogs2 = [16, 6, 10, 5, 6, 1, 4];
const test1 = filtertheDogs(dogs2);
const test2 = filtertheDogs(dogs1);
// console.log(test1, test2);
// //
const humanAgefilterInDogs = datas =>
  datas
    .map(ages => (ages <= 2 ? 2 * ages : 16 + ages * 4))
    .filter(adult => adult >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
// console.log('the is new shit==============');
const withChainMethods = humanAgefilterInDogs(dogs1);
// console.log(withChainMethods);
// /
// /
// /
// //
// /

// /
// /
// /
// /

// /
// /
// /
// /
// /
// //
/////////====
// let humanAge = 0;
// const calcAvgHumanAge = function (ages) {
//   const humanAge = ages.map(dogage =>
//     dogage <= 2 ? 2 * dogage : 16 + dogage * 4
//   );
//   // return humanAge;
//   const adults = humanAge.filter(dogs => dogs >= 18);
//   // return adults;
//   const calcAvgHumanAgedDogs =
//     adults.reduce((sum, age) => sum + age, 0) / adults.length;
//   return calcAvgHumanAgedDogs;
// };

// console.log(calcAvgHumanAge(dogs1));
// console.log(dogs1);
// const usdCur = 1.1;
// const newArr = movements
//   .filter(value => value > 0)
//   .map(value => value * usdCur)
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(newArr);

//////////

// const firstWithdrawal = movements.find(value => value < 0);
// console.log(firstWithdrawal);

// const findData = accounts.find(object => object.owner === 'Jessica Davis');
// console.log(findData);

// let findDatas;
// for (const find of accounts) {
//   if (find.owner === 'Jessica Davis') {
//     findDatas = find;
//     break;
//   }
// }
// console.log(findDatas);
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
    // console.log(currentAcc);
    // clear input fields
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = ''; // to clear the value input
    inputLoginPin.blur(); // to hide selector(|) in pin
    // movements
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
// const arr = ['banana'];
// const ar = [arr, 'apple', 'sider', 'jake', 'jake', 'apple'];
// let fruits = ar.findIndex(acc => acc === arr);
// fruits('banana');

const array = [[[[2], 3], 4, 4], [4, 4, , 2], 3, 23, 2];
// console.log(array.flat(5));
// flat method The Javascript arr.flat() method was introduced in ES2019. The method in JavaScript creates a new array with all sub-array elements concatenated into it recursively up to the specified depth. If no depth is provided, it defaults to 1.
//flat

// console.log(resultOfAll);
//The flatMap() method of Array instances returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1 (arr.map(...args).flat()), but slightly more efficient than calling those two methods separately.

//flatMap
const newArr = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => acc + curr, 0);
// console.log(newArr);

// sort() method
const owners = ['Muhammadjon', 'Humoyun', 'Jahongir'];
owners.sort();
// console.log(owners);
// here these two values 👇 are values which should be returned they are like => a > b? '-1:1';
const movementss = [200, 450, -400, 3000, -650, -130, 70, 1300];
movementss.sort((a, b) => a - b);
// console.log(movementss);
movementss.sort((a, b) => b - a);
// console.log(movementss);

// movements.sort = (a, b) => {
//   if (a < b) return 1;
//   if (b < a) return -1;
// };

// fill method () similar to slice but mutates the original array
const arr = new Array(7);

console.log(arr.fill(4, 3, 6)); // output //empty × 3, 4, 4, 4, empty]
console.log(arr.fill(1));
console.log(arr);

const y = Array.from({ length: 7 }, () => 1);
console.log(y);
// looping like map() method
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const m = Array.from({ length: 100 }, (_, i) => i + 1);

function splitArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const splitM = splitArray(m, 23);
// console.log(splitM);
// const mm = Array.from({ length: 100 }, (_, i) => i + 1);
// m.split(23);
// console.log(m);

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
// console.log(convertLetters(''));
// console.log(convertLetters(''));
// console.log(convertLetters(''));
// console.log(convertLetters(''));

// challenge
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//1.
dogs.forEach(value => {
  value.recommendedFood = Math.trunc(value.weight ** 0.75 * 28);
});
console.log(dogs);
//2
let newArray;
const g = dogs.find(value => value.owners.includes('Sarah', 'John'));
if (
  g?.curFood > g.recommendedFood * 0.9 &&
  g?.curFood < g.recommendedFood * 1.1
) {
  newArray = ` Sarah's dog is eating as recommended ${
    g.recommendedFood * 0.9
  } and ${g.recommendedFood * 1.1}`;
}
// return newArray;
else {
  newArray = `Sarah's dog is not eating as recommended`;
}
console.log(newArray);

const ownersMuch = [];
const ownersLess = [];
// console.log(ownersMuch);
const ownersEatTooMucch = dogs
  .filter(value => value.curFood > value.recommendedFood)
  .map(dogs => ownersMuch.push(...dogs.owners));
const ownersEatToooLittle = dogs
  .filter(value => value.curFood < value.recommendedFood)
  .map(dogs => ownersLess.push(...dogs.owners));
//3
const ownersEatTooMuch = dogs
  .filter(value => value.curFood > value.recommendedFood)
  .flatMap(dogs => dogs.owners);
const ownersEatTooLittle = dogs
  .filter(value => value.curFood < value.recommendedFood)
  .flatMap(dogs => dogs.owners); // with flatMap we can take  two different arrays inside one variable into one array and make them together like  [['asas'],['asas']] <- before = after-> ['asas','asas']==================================================>flatMap

console.log(ownersEatTooLittle);
console.log(ownersEatTooMuch);

//4
console.log(
  `${ownersMuch.join(' and ')}'s dogs eat too much while ${ownersLess.join(
    ' and '
  )}'s dog's eat too little`
);

//5
const trueAmount = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(trueAmount); //false
//6
const okeyFoodCalc = dogs =>
  dogs.curFood > dogs.recommendedFood * 0.9 &&
  dogs.curFood < dogs.recommendedFood * 1.1;
//array function is recommended to use as callback yoki' return 'bilan ishlatish kerak yoksa ishlamedi .

//7
const anyokeyAmount = dogs.some(dogs => okeyFoodCalc);
console.log(anyokeyAmount); //true
const okeyAmountt = dogs.filter(okeyFoodCalc); // filter method array function bilan ishledi . it works with array functions well or do not forget to assign 'return '
console.log(okeyAmountt);
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsSorted);
console.log(dogs);
// movementss.sort((a, b) => a - b);
