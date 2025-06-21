const accessKey = "Y0X04zxjuXIboyAX7ql_jc6ifAnAT0jYWkxaNtPfnVk";

const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector("#searchInput");
const imageResults = document.querySelector("#image-results");
const showMoreBtn = document.querySelector("#show-more-btn");


let keyWord = "";
let page = 1;


async function searchImages() {
    keyWord = searchInput.value.trim();
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        imageResults.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
        const imageCard = document.createElement("div");
        imageCard.classList.add("image-card");
        imageCard.innerHTML = `
            <img src="${result.urls.small}" alt="">
            <div class="image-info">
                <a href="${result.links.html}" target="_blank">View HD Image</a>
            </div>
        `;
        imageResults.appendChild(imageCard);
    });
    showMoreBtn.style.display = "block";
    
}

searchContainer.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", () =>{
    page++;
    searchImages();
})