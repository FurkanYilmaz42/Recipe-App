import {
  createIngredient,
  getfromLocalStorage,
  isRecipeLiked,
} from "./helpers.js";

const uiElements = {
    form: document.querySelector("form"),
    resultList: document.querySelector(".results"),
    recipeArea: document.querySelector(".recipe"),
    basketList: document.querySelector(".basket ul"),
    clearBtn: document.querySelector("#clear"),
    likeList: document.querySelector(".likes-list"),
};

const renderResults = (recipes) => {

    uiElements.resultList.innerHTML = "";

    recipes.slice(0, 12).forEach((recipe) => {
       
        const markup = ` <a href='#${recipe.recipe_id}' class="result-link">
            <img
              src="${recipe.image_url}"
              alt="result-link-image"
            />
            <div class="data">
              <h4>${recipe.title}</h4>
              <p>${recipe.publisher}</p>
            </div>
          </a>`;

        uiElements.resultList.insertAdjacentHTML("beforeend", markup);
    });
};

const renderRecipes = (recipe) => {
  console.log(recipe);

    const isLiked = isRecipeLiked(recipe.recipe_id);

    const recipeMarkup = ` <figure>
            <img
              src="${recipe.image_url}"
              alt="recipe-image"
            />

            <h1>${recipe.title}</h1>

            <div class="like-area">
              <i id='like-btn' class="bi ${
                isLiked ? "bi-heart-fill" : "bi-heart"
              }  "></i>
            </div>
          </figure>

          <div class="ingredients">
            <ul>
            ${createIngredient(recipe.ingredients.slice(0, 15))}
            
             
            </ul>
          </div>

          <div class="button">
          <button id="add-to-basket">
            <i class="bi bi-cart"></i>
            <span>Alisveris Sepetine Ekle</span>
          </button>
        </div>

          <div class="directions">
            <h2>Nasil Pisirilir?</h2>
            <p>
              Bu tarif dikkatlice <span>${recipe.publisher}</span> tarafindan
              hazirlanmis ve test edilmistir. Diger detaylara onlarin websitesi
              uzerinden erisebilirsiniz.
            </p>

            <a href="${recipe.publisher}" target="_blank">Yönerge</a>
          </div>`;

    uiElements.recipeArea.innerHTML = recipeMarkup;
};

const renderLoader = (outlet) => {
  const loader = `
              <div class='loader'>
              <img src='../assets/food-load.gif'/>
              </div>
              `;

    outlet.innerHTML = loader;
};

const renderBasketItem = (items) => {
  const markup = items.map((item) => `<li data-id=${item.id}>
              <i class="bi bi-x"></i>
              <span>${item.title}</span>
            </li>`).join("");

    uiElements.basketList.innerHTML = markup;
};

const renderLikes = () => {

  const likes = getfromLocalStorage("likes") || [];

  const likesHtml = likes.map((item) => `      <a href="#">
              <img
                src="${item.image_url}"
                width="50"
                alt="list-image"
              />
              <p>${item.title}</p>
            </a>`
    )
    .join("");

    uiElements.likeList.innerHTML = likesHtml;
};

export { uiElements, renderResults, renderRecipes, renderLoader, renderBasketItem, renderLikes};