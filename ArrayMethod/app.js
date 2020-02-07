const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionBtn = document.querySelector("#show-million");
const sortBtn = document.querySelector("#sort");
const calculateBtn = document.querySelector("#calculate");

let data = [];

//fetch 隨機用戶和$$
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

//新增物件 到 data陣列
function addData(obj) {
  data.push(obj);
  updateDOM();
}
//兩倍的錢!
function doubleMoney() {
  data = data.map(person => {
    return { ...person, money: person.money * 2 };
  });
  updateDOM();
}
//排序錢錢
function sortMoney() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//只顯示百萬以上
function showMillion() {
  data = data.filter(person => {
    return person.money > 1000000; //一行可以不用{}
  });
  updateDOM();
}

//計算總財富
function calculateWealth() {
  const wealth = data.reduce((acc, person) => (acc += person.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
    wealth
  )}<strong/></h3>`;
  main.appendChild(wealthEl);
}

function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
  //   console.log(providedData);
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//增加一個隨機用戶
addUserBtn.addEventListener("click", getRandomUser);
//把所有人的錢*2
doubleBtn.addEventListener("click", doubleMoney);
//排序錢錢
sortBtn.addEventListener("click", sortMoney);
//只顯示百萬富翁拉
showMillionBtn.addEventListener("click", showMillion);
//計算總財富
calculateBtn.addEventListener("click", calculateWealth);
