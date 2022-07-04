/*console.log(window.data);

const menuItems = [{
  label: "Sandwiches",
  "value": "...."
}]

const getMenuItemHTML = (item) => `<li>
    <a class="menu__link" href="#" data-value="${item.value}">${item.label}</a>
  </li>`;
*/
    



var cart = {}; // корзина

function loadCategory(category) {
  //файл goods.json
  showData(window.data["menu"].filter((x) => x["category"] == category));//вытаскиваем JSON
  //$.getJSON("goods.json", goodsOut);
}

function showData(data) {
  // вывод на страницу
  let out = ""
  for (var key in data) {
    out += `
<div id ="element" class="food">
  <div class="emblems">
    <img
      src="img/103-removebg-preview.png"
      width="210"
      height="70"
      alt="Эмблема компании"
    />
  </div>

  <div class="food__img_food">
    <div class="photo">
      <img
        src="${
          data[key].image.startsWith("/")
            ? data[key].image.substr(1)
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
      ${data[key].description}
  </p>
  
  <div class="food_price">
    <h3>Цена: ${data[key].price} руб.</h3>
  </div>
  <div class="food__quantity_food">
    <div class="quantity_food"><h6>Количество</h6></div>
    <div class="quantity_button">
      <button class="button">
        <img
          src="img/minus.png"
          width="12"
          height="12"
          alt="Знак минуса"
        />
      </button>
      <input class="counter" name="counter" type="text" value="1" />
      <button class="button">
        <img
          src="img/plus.png"
          width="15"
          height="14"
          alt="Знак минуса"
        />
      </button>
    </div>
  </div>
  <div class="food__button_food">
  <button class="button_food">В корзину</button>
</div>
</div>
`;
  }
  document.getElementById("goods-out").innerHTML = out;
}

window.onload = () => {//когда у нас загружается страница вызывается эта функция
  loadCategory("sandwiches");//По умолчанию загружаются сендгвичи

  for (let el of document.getElementsByClassName("menu_link")) { //Получаем список всех ссылок на другие категории и перебираем его
    el.addEventListener("click", () => loadCategory(el.dataset.category));
  }
};
