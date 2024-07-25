let apiKey = "388385d0ca524f1ea99dcae472880e06";
let newsBody = document.getElementById("newsBody");
let countrylinks = document.querySelectorAll(".countryList li a");
console.log(countrylinks);
let categoryLinks = document.querySelectorAll(".categoryLinks .nav-link");
let selectedCountry = "us";
let selectedCategory = "general";
let allNews = [];
// ------------------------
// fetch news
// -----------------------
async function fetchNews(country, category) {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=5dfc6cd2694647b28c81d8e21d643f3b`;
  const apiResponse = await fetch(url);
  const jsonResponse = await apiResponse.json();
  allNews = jsonResponse.articles;
  displayNews();
}

// -----------------
// display news
// ---------------------
function displayNews() {
  let cartona = ``;
  for (let i = 0; i < allNews.length; i++) {
    const newsImage = allNews[i].urlToImage || "../images/default2.jpg";
    const titleMaxWords = 4;
    const descriptionMaxWords = 5;
    let description = allNews[i].description;
    // Handling empty or "null" descriptions..
    if (!description || description.toLowerCase() === "null") {
      description = "No description available";
    }

    cartona += `
          <div class="col-md-4">
          <div class="newsBox">
            <div class="news-image">
              <img class="w-100" src="${newsImage}" alt="" />
            </div>
            <div class="news-info">
              <h2 id="title">${allNews[i].title
                .split(" ")
                .splice(0, titleMaxWords)
                .join(" ")}</h2>
              <p id="description">${description
                .split(" ")
                .splice(0, descriptionMaxWords)
                .join(" ")} </p>
                <button class="btn btn-danger change"><a  href="${
                  allNews[i].url
                }">See More</a></button>
               
            </div>
          </div>
        </div>
        
        
        `;
  }
  newsBody.innerHTML = cartona;
}
// --------------------------------------------
//add event listener to each country link..
// ---------------------------------------------
for (let i = 0; i < countrylinks.length; i++) {
  countrylinks[i].addEventListener("click", function (e) {
    selectedCountry = e.target.getAttribute("countryCode");
    fetchNews(selectedCountry, selectedCategory);
  });
}

// --------------------------------------------
//add event listener to each category link..
// ---------------------------------------------
for (let i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener("click", function (e) {
    selectedCategory = e.target.getAttribute("category");
    fetchNews(selectedCountry, selectedCategory);
  });
}

fetchNews(selectedCountry, selectedCategory);

$(document).ready(function () {
  $("#loading .loader").fadeOut(1000, function () {
    $("#loading").fadeOut(1000, function () {
      $("#loading").remove();
      $("body").css("overflow", "auto");
    });
  });
});
