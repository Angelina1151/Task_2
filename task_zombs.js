/*console.log(window.data);

const menuItems = [{
  label: "Sandwiches",
  "value": "...."
}]

const getMenuItemHTML = (item) => `<li>
    <a class="menu__link" href="#" data-value="${item.value}">${item.label}</a>
  </li>`;
*/
function loadCategory(category) {
  showData(window.data["menu"].filter((x) => x["category"] == category)); //вытаскиваем JSON
}

function showData(data) {
  // вывод на страницу
  let out = "";
  for (var key in data) {
    out += `
<div id ="element" class="food">
  <div class="emblems">
    <img class="size_emblems"
      src="img/103-removebg-preview.png"
      alt="Эмблема компании"
    />
  </div>

  <div class="food__img_food">
    <div class="photo">
      <img class="size"
        src="${
          data[key].image.startsWith("/")
            ? data[key].image.replace("/", "")
            : data[key].image
        }"
        alt="Фото ${data[key].name}"
      />
    </div>
  </div>
  
    <div class="text__name_food">
      <h3>${data[key].name}</h3>
    </div>
  
  <p class="food__component_food">  
      ${
        data[key].description.length > 0
          ? data[key].description
          : "Описание отсутствует"
      }
  </p>
  
  <div class="food_price">
    <h3>Цена: ${data[key].price} руб.</h3>
  </div>
  <div class="food__quantity_food">
    <div class="quantity_food"><h6>Количество</h6></div>
    
    <div class="quantity_button">
      <button class="button">
        <img class="minus"
          src="img/minus.png"
          width="12"
          height="12"
          alt="Знак минуса"
        />
      </button>
      <input class="counter" name="counter" type="text" value="1" />
      <button class="button">
        <img class="plus"
          src="img/plus.png"
          alt="Знак плюса"
        />
      </button>
    </div>
  </div>
  <div class="food__button_food" id="button" type="button">
  <button id="openDialog" class="button_food">В корзину</button>
</div>
</div>
`;
  }
  document.getElementById("goods-out").innerHTML = out;
}

window.onload = () => {
  //когда у нас загружается страница вызывается эта функция
  loadCategory("sandwiches"); //По умолчанию загружаются сендгвичи

  for (let el of document.getElementsByClassName("menu_link")) {
    //Получаем список всех ссылок на другие категории и перебираем его
    el.addEventListener("click", () => loadCategory(el.dataset.category));
  }
  var dialog = document.querySelector("dialog");
  document.querySelector("#openDialog").onclick = function () {
    dialog.show(); // Показываем диалоговое окно
  };
  document.querySelector("#closeDialog").onclick = function () {
    dialog.close(); // Прячем диалоговое окно
  };
};

//При нажатии на кнопку "В КОРЗИНУ", если категория сходится с "sandwiches",
//то мы выводим поверх новое окно, в котором можем бафнуть наш сэндвич, выбрать размер, хлебушек,соусы, доп. ингридиенты,
//когда наш сэндвич готов, то мы можем выбрать кол-во и добавить в  корзину, при добавлении ингридиентов цена возрастает,
// к основной цене добавляем цену ингридиентов
//При добавлении в корзину напитков, у которых есть параметр "volumes" мы должны вывести новое окно с выбором объема,
// т.к. от объема отличается цена, но этот параметр есть только у "Pepsi".

/*функция вывода нового окна*/
let new_window = "";
for (var key in data) {
  new_window += ``;
}
let windowObjectReference;
let windowFeatures =
  "left=100,top=100,width=814,height=615,location=no,directories=no,status=no,resizable=no,scrollbars=no,menubar=no,toolbar=no";

function openRequestedPopup() {
  windowObjectReference = window.open(
    "new_window.html",
    "new_window",
    windowFeatures
  );
}
//alert(openRequestedPopup());
/*конец ф-ии вывода нового окна*/

/*
/*функция вывода модального окна 
const updateButton = document.getElementById('buttonNew');
const newWindow = document.getElementById("newWindow");
const selectEl = newWindow.querySelector("nav_alignment");//Метод elem.querySelector(css) возвращает первый элемент,
//соответствующий данному CSS-селектору.

const confirmBtn = newWindow.querySelector("#confirmBtn");

// If a browser doesn't support the dialog, then hide the
// dialog contents by default.
if (typeof newWindow.showModal !== "function") {
  newWindow.hidden = true;
}
// "Update details" button opens the <dialog> modally
updateButton.addEventListener("click", function onOpen() {
  if (typeof newWindow.showModal === "function") {
    newWindow.showModal();
  } else {
    
  }
});
// "Favorite animal" input sets the value of the submit button
selectEl.addEventListener("change", function onSelect(e) {
  confirmBtn.value = selectEl.value;
});
// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
newWindow.addEventListener("close", function onClose() {
  outputBox.value =
    newWindow.returnValue + " button clicked - " + new Date().toString();
});

*/
