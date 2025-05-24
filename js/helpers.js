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
    )
    .join("");

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
  if (basket.length > 0) {
    uiElements.clearBtn.style.display = "block";
  } else {
    uiElements.clearBtn.style.display = "none";
  }
};

const isRecipeLiked = (id) => {
  const likes = getfromLocalStorage("likes") || [];

  for (let i = 0; i < likes.length; i++) {
    if (likes[i].id === id) return true;
  }

  return false;
};

const addLike = (recipe) => {
  const likes = getfromLocalStorage("likes") || [];

  likes.push({
    id: recipe.recipe_id,
    title: recipe.title,
    image_url: recipe.image_url,
  });

  setToLocalStorage("likes", likes);
};

const removeLike = (id) => {
  const likes = getfromLocalStorage("likes") || [];
  const newLikes = [];

  for (let i = 0; i < likes.length; i++) {
    if (likes[i].id !== id) {
      newLikes.push(likes[i]);
    }
  }

  setToLocalStorage("likes", newLikes);
};

export {
  createIngredient,
  setToLocalStorage,
  getfromLocalStorage,
  controlBtn,
  isRecipeLiked,
  addLike,
  removeLike,
};
