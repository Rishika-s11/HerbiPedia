document.addEventListener("DOMContentLoaded", function () {

    console.log("Bookmark JS Loaded");

    const cards = document.querySelectorAll(".model-container");

    cards.forEach(card => {

        const model = card.querySelector("model-viewer");
        const infoButton = card.querySelector(".info-button");

        if (!model || !infoButton) return;

        const plantName = model.getAttribute("alt").trim();

        // Extract URL from onclick
        const onclickText = infoButton.getAttribute("onclick");
        const urlMatch = onclickText.match(/'(.*?)'/);
        const plantLink = urlMatch ? urlMatch[1] : "#";

        // Create action container
        const actionDiv = document.createElement("div");
        actionDiv.className = "plant-actions";

        actionDiv.innerHTML = `
            <button class="icon-btn bookmark-btn">
                <i class="fas fa-bookmark"></i>
            </button>
            <button class="icon-btn share-btn">
                <i class="fas fa-share-alt"></i>
            </button>
        `;

        card.style.position = "relative";
        card.appendChild(actionDiv);

        // Bookmark
        actionDiv.querySelector(".bookmark-btn")
            .addEventListener("click", function (e) {
                e.stopPropagation();
                toggleBookmark(plantName, plantLink);
            });

        // Share
        actionDiv.querySelector(".share-btn")
            .addEventListener("click", function (e) {
                e.stopPropagation();
                sharePlant(plantLink);
            });

    });

});

function toggleBookmark(name, url) {

    let bookmarks = JSON.parse(localStorage.getItem("herbBookmarks")) || [];

    const index = bookmarks.findIndex(item => item.name === name);

    if (index === -1) {
        bookmarks.push({ name, url });
        alert("Bookmarked!");
    } else {
        bookmarks.splice(index, 1);
        alert("Removed!");
    }

    localStorage.setItem("herbBookmarks", JSON.stringify(bookmarks));
}

function sharePlant(url) {
    const fullURL = window.location.origin + "/" + url;
    navigator.clipboard.writeText(fullURL);
    alert("Link copied!");
}
