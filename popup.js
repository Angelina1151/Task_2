//Создание модального окна с помощь popup
const popupLinks = document.querySelectorAll(".popup-link"); //при нажатии на кнопку с классом popup-link будет открываться popup
const body = document.querySelector("body"); //  чтобы блокировать скролл внутри body
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true; //эта переменная нужна, чтобы не было двойных нажатий

const timeout = 800; //время задержки

if (popupLinks.length > 0) {
  //делаю проверку,существуют ли такие объекты вообще
  for (let index = 0; index < popupLinks.length; index++) {
    //проходим по всем ссылкам и вещаем на них события, чтобы при нажатии открывался popup
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName); //в переменную получаем элемент id которого
      //равен переменной popupName
      popupOpen(currentPopup); //полученную переменную отправляем в функцию которая будет открывать попап
      e.preventDefault(); //запрет на перезагрузку страницы, чтобы ссылка не открывалась в новом окне
    });
  }
}
const popupCloseIcon = document.querySelectorAll(".close-popup"); // закрытие попапа
if (popupCloseIcon.length > 0) {
  //проверяю если ли вообще закрывающие попап объекты

  for (let index = 0; index < popupCloseIcon.length; index++) {
    //перебираю их и на каждое вещаю событие закрытия попапа

    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      //при событии клик закрываю попап

      popupCloseIcon(el.closest(".popup")); // ищем ближайший родитель с классом попап, чтобы его закрыть
      e.preventDefault(); // запрет на дальнейшую работу ссылки
    });
  }
}

function popupOpen(currentPopup) {
  //передаем объект
  if (currentPopup && unlock) {
    //проверяем есть ли такой объект  и открыта ли переменная unlock
    const popupActive = document.querySelector(".popup.open"); //получаем открытый попап
    if (popupActive) {
      popupClose(popupActive, false); //если существует, то закрываем
    } else {
      bodyLock(); //блочим скролл у body
    }
    currentPopup.classList.add("open"); // к нашему попапу добавляем класс open
    currentPopup.addEventListener("click", function (e) {
      // добавляем попапу событие
      if (!e.target.closest(".popup__content")) {
        //отсекаем всё кроме темной области(если у нажатого объета нету в родителях popup__content, то мы закрываем попап)
        popupClose(e.target.closest(".popup")); //
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  // передаем открытый попап. эта функция нужна чтобы если мы открываем попап в попапе, то скролл у нас не разлочивался
  if (unlock) {
    // стоит ли нам блокировать скролл
    popupActive.classList.remove("open"); //убираем у открытого попапа класс open
    if (doUnlock) {
      bodyUnLock();
    }
  }
}
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  if (lockPadding.length > 0) {
    //проверяем есть ли такие объекты, которые могут сдвигаться при открытии
    for (let index = 0; index < lockPadding.length; index++) {
      // чтобы фиксированные объекты тоже не сдвигались, при открытии и закрытии попапа
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue; //это нужно чтобы когда у нас открывался попап он не сдвигал скролл и не было сдвига вправо, и чтобы когда он закрывался то не сдвигалось всё назад
  body.classList.add("lock"); // по этому классу мы будем убирать скролл

  unlock = false; // на время блокируем нашу переменную unlock, чтобы не было повторных нажатий
  setTimeout(function () {
    // в момент когда попап закрывается если мы нажмем на кнопку его открывающую, то выведется новый попап, но скролл не будет лочиться
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      //проверяем есть ли у нас такие объекты, которые требуют добавления padding
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px"; //убираем padding у body
    body.classList.remove("lock"); //у body убираем класс lock
  }, timeout); // ставим задержку, чтобы в момент закрытия попапа, он не дергался от того что скролл моментално разлочивается

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});
