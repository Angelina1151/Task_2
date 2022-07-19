function loadCategory(category) {
  showData(window.data["menu"].filter((x) => x["category"] == category));
}
function deleteScroll(dialog) {
  if (dialog.open) {
    document.querySelector("body").style.overflowY = "hidden";
    document.body.style.paddingRight = "17px";
  } else {
    document.querySelector("body").style.overflowY = "scroll";
    document.body.style.paddingRight = "0px";
  }
}
function showData(data) {
  // вывод на страницу
  let out = "";
  for (var key in data) {
    out += `
<div  class="food">
  <div class="emblems">
    <img class="size_emblems"
      src="img/103-remove-preview.png"
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
      <button class="button" id="minus" type="button"  data-id ="${
        data[key].name
      }">
        <img class="minus"
          src="img/minus.png"
          alt="Знак минуса"
        />
      </button>
      <input class="counter" name="counter" type="text" value="1" id="input" />
      <button class="button" id="plus" type="button" data-id ="${
        data[key].name
      }">
        <img class="plus"
          src="img/plus.png"
          alt="Знак плюса"
        />
      </button>
    </div>
  </div>
  <button  data-name="${
    data[key].name
  }"  class="button_food" type ="button">В корзину</button>
</div>
`;
  }
  let dialog = document.querySelector("dialog");
  let parent = document.getElementById("goods-out");
  parent.innerHTML = out;

  for (let btn of parent.getElementsByClassName("button_food")) {
    btn.addEventListener("click", () => {
      menuOutput("sizes");
      dialog.show(); // Показываем диалоговое окно
      deleteScroll(dialog);
    });
  }
  let counterBtns = parent.getElementsByClassName("button");
  let counterInputs = parent.getElementsByClassName("counter");
  for (let k = 0; k < counterInputs.length; k++) {
    let minusbtn = counterBtns[k * 2];// так как у нас две кнопки с классом button
    let plusbtn = counterBtns[k * 2 + 1];
    let input = counterInputs[k];

    minusbtn.addEventListener("click", () => {
      if (input.value > 1) {
        input.value--;
      }
    });
    plusbtn.addEventListener("click", () => {
      input.value++;
    });
  }
   const cancelButton = document.getElementById("closeDialog");
   cancelButton.addEventListener("click", function () {
     dialog.close();
     deleteScroll(dialog); //при закрытии модального окна возвращает scroll у body
   });
}

function showWindowData(data) {
  let out = "";
  for (var key in data) {
    out += ` 
    <button class="food_window" type="button">
          <span class="food__img_food">
            <div class="photo">
              <img
                class="size"
                src="${
                  data[key].image.startsWith("/")
                    ? data[key].image.replace("/", "")
                    : data[key].image
                }"
                alt="Фото ${data[key].name}"
              />
            </div>
          </span>
          <p class="size_text">${data[key].name}</p>

          <div class="food_price_window">
            <h3>Цена: ${data[key].price} руб.</h3>
          </div>
        </button>
      </div>
      `;
  }
  document.getElementById("new-elem-window").innerHTML = out;
}

function menuOutput(category) {
  showWindowData(window.data[category]);
}
// function done() {
//   showWindowDone(window.data[category]);
// }
// function showWindowDone() {
//   let out = "";
//   for (var key in data) {
//     out += `
//      <span class="food__img_food">
//             <div class="photo">
//               <img
//                 class="size"
//                 src="i/result_sandwich.jpg"
//                 alt="Фото ${data[key].name}"
//               />
//             </div>
//           </span>
//            <div>
//                 <p>Ваш сэндвич готов!</p>
//                 <p>Размер:${data[key].sizes}</p>
//                 <p>Хлеб:${data[key].breads}</p>
//                 <p>Овощи:${data[key].vegetables}</p>
//                 <p>Соусы:${data[key].sauces}</p>
//                 <p>Начинка:${data[key].fillings}</p>
//           </div>
//           <div>
//              <p class="size_text">${data[key].name}</p>
//           </div> `;
//   }
//   document.getElementById("result_window").innerHTML = out;
// }

// function toCart(){
//   let out = "";
//   for (var key in data) {
//     out += `
//  <div class="body_text"><h5>Название Количество</h5></div>

//           <div class="body_sum"><h5>Итого:${data[key].price} руб.</h5></div>
//           <div class="button_basket">
//             <button class="button_text">Оформить заказ</button>
//           </div>`;
//   }
//   document.getElementById("cart").innerHTML = out;
// }
// function saveData() {
//   localStorage.setItem();
// }
window.onload = () => {
  //когда у нас загружается страница вызывается эта функция
  loadCategory("sandwiches"); //По умолчанию загружаются сендвичи

  for (let el of document.getElementsByClassName("menu_link")) {
    //Получаем список всех ссылок на другие категории и перебираем его
    el.addEventListener("click", () => loadCategory(el.dataset.category));
  }

  // при нажатии на кнопки будут отрисовываться элементы из data.js
  for (let el of document.getElementsByClassName("menu_window_link")) {
    el.addEventListener("click", () => menuOutput(el.dataset.category));
  }
};
//При нажатии на кнопку "В КОРЗИНУ", если категория сходится с "sandwiches",
//то мы выводим модальное окно, в котором можем бафнуть наш сэндвич, выбрать размер, хлебушек,соусы, доп. ингридиенты,
//когда наш сэндвич готов, то мы можем выбрать кол-во и добавить в  корзину, при добавлении ингридиентов цена возрастает,
// к основной цене добавляем цену ингридиентов
//При добавлении в корзину напитков, у которых есть параметр "volumes" мы должны вывести новое окно с выбором объема,
// т.к. от объема отличается цена, но этот параметр есть только у "Pepsi"
