import API from "./api.js";
import {
  getfromLocalStorage,
  setToLocalStorage,
  controlBtn,
  removeLike,
  isRecipeLiked,
  addLike,
} from "./helpers.js";
import {
  uiElements,
  renderResults,
  renderRecipes,
  renderLoader,
  renderLikes,
  renderBasketItem,
} from "./ui.js";

const api = new API();

let basket = getfromLocalStorage("basket") || [];

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

  if (id) {
    renderLoader(uiElements.recipeArea);

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

    Toastify({
      text: "Ürünler sepete eklendi",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        borderRadius: "5px",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }

  else if (e.target.id === "like-btn") {

    const id = api.recipe.recipe_id;
    const isLiked = isRecipeLiked(id);

    if (isLiked) {
      removeLike(id);
    } else {
      addLike(api.recipe);
    }

    renderRecipes(api.recipe);

    renderLikes();
  }
};

const deleteItem = (e) => {
  if (e.target.classList.contains("bi-x")) {
    const parentElement = e.target.parentElement;
    const parentId = parentElement.dataset.id;

    basket = basket.filter((i) => i.id != parentId);

    setToLocalStorage("basket", basket);

    parentElement.remove();

    controlBtn(basket);
  }
};

const clearBasket = () => {
  const res = confirm("Butun sepet silinecek!! Emin misiniz ??");

  if(res){
    
    setToLocalStorage("basket", null);

    basket = [];

    uiElements.basketList.innerHTML = "";

    controlBtn(basket);
  }
};

["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, contolUrl);

  renderBasketItem(basket);

  controlBtn(basket);

  renderLikes();
});

uiElements.form.addEventListener("submit", handleSubmit);

uiElements.recipeArea.addEventListener("click", handleClick);

uiElements.basketList.addEventListener("click", deleteItem);

uiElements.clearBtn.addEventListener("click", clearBasket);

