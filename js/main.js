import API from "./api.js";
import { getfromLocalStorage, setToLocalStorage,controlBtn } from "./helpers.js";
import {
  uiElements,
  renderResults,
  renderRecipes,
  renderLoader,
  renderBasketItem,
} from "./ui.js";

const api = new API();

getfromLocalStorage("basket") || [];

const handleSubmit = (e) => {
  e.preventDefault();

  const query = e.target[0].value;

  renderLoader(uiElements.resultList);

  api.getResults(query).then(() => {
    renderResults(api.results);
  });
};

const contolUrl = () => {
  const id = window.location.hash.replace("#", "");

  renderLoader(uiElements.recipeArea);

  if (id) {
    api.getRecipe(id).then(() => {
      renderRecipes(api.recipe);
    });
  }
};

const handleClick = (e) => {

  if (e.target.id === "add-to-basket") {
    api.ingredients.forEach((title) => {
      const newItem = {
        id: uuid.v4(),
        title,
      };

      basket.push(newItem);

      setToLocalStorage("basket", basket);

      renderBasketItem(basket);
      
      controlBtn(basket);

    });
  }
};

["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, contolUrl);
  
  renderBasketItem(basket);

  controlBtn(basket);
});

uiElements.form.addEventListener("submit", handleSubmit);

uiElements.recipeArea.addEventListener("click", handleClick);
