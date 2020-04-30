const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["apple", "programming", "blockchain", "bitcoin"];

//隨機選一組字當作題目
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//顯示文字 一開始都是空的
function displayWord() {
  //要是在correctLetters 裡面 有題目的其中一個字 就顯示
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        letter => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
        </span>
    `
      )
      .join("")}
 `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "尼贏惹 😃";
    popup.style.display = "flex";
  }
}

//更新錯字
function updateWrongLettersEl() {
  //顯示錯誤的字
  wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "尼輸惹 :(";
    popup.style.display = "flex";
  }
}

//顯示提示
function showNotification() {
  //要是有輸入重複的字 就將提示顯示出來
  notification.classList.add("show");
  setTimeout(() => {
    //過兩秒後消失提示
    notification.classList.remove("show");
  }, 2000);
}

//按下按鍵後觸發
window.addEventListener("keydown", e => {
  //A~Z a~z 的 keycode
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      //把正確的字push到correctLeeters裡面 前提是這個字還沒有在correctLetters裡面 防止出現兩次
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      //輸入的字不再這道題目裡面 就push到wrongLetters 前提是這個字還沒有在wrongLetters裡面 防止出現兩次
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// 再玩一次
playAgainBtn.addEventListener("click", () => {
  //清空correctLetters 和 wrongLetters
  correctLetters.splice(0);
  wrongLetters.splice(0);

  //重新選一組字
  selectedWord = words[Math.floor(Math.random() * words.length)];
  //重新渲染
  displayWord();
  //更新錯字 因為wrongLetters被清空了 所以wrong也會被清空
  updateWrongLettersEl();
  popup.style.display = "none";
});

displayWord();
