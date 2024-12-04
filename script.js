const BASE_API_URL = "https://api.tvmaze.com/search/shows?q=";

document.getElementById("triggerSearchAction").addEventListener("click", () => {
  const searchQueryInput = document.getElementById("inputSearchQuery").value.trim();
  if (searchQueryInput) {
    fetchShowsData(searchQueryInput);
  }
});

async function fetchShowsData(userSearchInput) {
  try {
    const fetchAPIResponse = await fetch(BASE_API_URL + userSearchInput);
    const apiResultantData = await fetchAPIResponse.json();
    populateShowCards(apiResultantData);
  } catch (apiError) {
    console.error("Error occurred while fetching data:", apiError);
  }
}

function populateShowCards(showObjectsArray) {
  const showCardsContainer = document.getElementById("renderedShowCards");
  showCardsContainer.innerHTML = "";

  if (showObjectsArray.length === 0) {
    showCardsContainer.innerHTML = "<p style='text-align: center; color: #ffd700;'>No results found.</p>";
    return;
  }

  showObjectsArray.forEach((individualShowObject) => {
    const { show } = individualShowObject;
    const { name, image, summary } = show;

    const createCardElement = document.createElement("div");
    createCardElement.className = "card-wrapper";

    createCardElement.innerHTML = `
      <img src="${image?.medium || 'https://via.placeholder.com/300x200'}" alt="${name}" />
      <div class="card-details">
        <h3>${name}</h3>
        <p>${summary ? summary.replace(/<[^>]+>/g, "") : "Description not available."}</p>
      </div>
    `;

    showCardsContainer.appendChild(createCardElement);
  });
}
