document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("bookmarkList");
    if (!container) return;

    let bookmarks = JSON.parse(localStorage.getItem("herbBookmarks")) || [];

    if (bookmarks.length === 0) {
        container.innerHTML = "<p>No bookmarks yet.</p>";
        return;
    }

    container.innerHTML = "";

    bookmarks.forEach((plant, index) => {

        const card = document.createElement("div");
        card.classList.add("bookmark-card");

        card.innerHTML = `
            <div class="bookmark-left">
                <a href="${plant.url}" class="bookmark-link">
                    ${plant.name}
                </a>
            </div>

            <div class="bookmark-right">
                <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        card.querySelector(".delete-btn").addEventListener("click", function () {
            removeBookmark(index);
        });

        container.appendChild(card);
    });

});

function removeBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem("herbBookmarks")) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem("herbBookmarks", JSON.stringify(bookmarks));
    location.reload();
}
