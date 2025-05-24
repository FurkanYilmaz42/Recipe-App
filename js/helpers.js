import { uiElements } from "./ui.js";

const createIngredient = (ingredients) => {
  const ingredientHtml = ingredients
    .map(
      (ingredient) => `
              <li>
                <i class="bi bi-check-circle"></i>

                <span> ${ingredient} </span>
              </li>
              `
    ).join("");

  return ingredientHtml;
};

const setToLocalStorage = (ket, data) => {
  const strData = JSON.stringify(data);
  localStorage.setItem(ket, strData);
};

const getfromLocalStorage = (key) => {
  const strData = localStorage.getItem(key);

  const data = JSON.parse(strData);

  return data;
};

const controlBtn = (basket) => {

  if(basket.length>0){
    uiElements.clearBtn.computedStyleMap.display="block";
  } else {
    uiElements.clearBtn.computedStyleMap.display="none";
  }

}

export { createIngredient, setToLocalStorage, getfromLocalStorage, controlBtn };
