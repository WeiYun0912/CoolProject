const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");
const submit = document.querySelector("#submit");
const sendTicket = document.querySelector("#sendTicket");
const clear = document.querySelector("#clear");
populateUI();

let ticketPrice = +movieSelect.value; //取得票價 轉成number
//儲存電影index 和 價格
function setMovieData(movieIndex) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
}

//更新總票價
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); //取得選取數量

  //複製被選擇的座位到一個陣列
  //map 這個陣列

  //複製selectedSeats 並找到該次點擊的座位 放到一個新陣列裡面

  const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function updateOccupiedCount() {
  const occupiedSeats = document.querySelectorAll(".row .seat.occupied");
  const seatIndex = [...occupiedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("occupiedSeats", JSON.stringify(seatIndex));
}

//從localStorage抓取資料 渲染在畫面
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const occupiedSeats = JSON.parse(localStorage.getItem("occupiedSeats"));

  // console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected"); //將該位置的class加上選擇
      }
    });
  }

  if (occupiedSeats !== null && occupiedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (occupiedSeats.indexOf(index) > -1) {
        seat.classList.add("occupied"); //將該位置的class加上選擇
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//電影選擇EVENT
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  //儲存電影 和 價錢
  setMovieData(e.target.selectedIndex);
  updateSelectedCount();
});

// 座位點擊EVENT
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied") //過濾掉已經被佔走的
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

submit.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); //取得選取數量
  const selectedSeatsCount = selectedSeats.length;
  if (
    confirm(`You choose ${selectedSeatsCount} seats , Click Yes to buy ticket`)
  ) {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.remove("selected"); //移除選取的selected 因為已經確定要訂位了
          seat.classList.add("occupied"); //將該位置的class加上確定選取
        }
      });
    }
  } else {
  }

  updateOccupiedCount();
});

//清空Storage
clear.addEventListener("click", () => {
  if (confirm("Cancel!!!")) {
    localStorage.clear();
    location.reload();
  }
});

//初始化 count 和 total
updateSelectedCount();
