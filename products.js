// =========================
// KOOKV_KPOP Products
// =========================

let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {

    await loadProducts();

    document
        .getElementById("searchBox")
        ?.addEventListener("input", filterProducts);

    document
        .getElementById("categoryFilter")
        ?.addEventListener("change", filterProducts);

});

async function loadProducts(){

    const container =
        document.getElementById("productsContainer");

    container.innerHTML =
        "<div class='loading'>กำลังโหลดสินค้า...</div>";

    allProducts =
        await getSheet(CONFIG.SHEETS.PRODUCTS);

    if(!allProducts.length){

        container.innerHTML =
            "<div class='loading'>ยังไม่มีสินค้า</div>";

        return;
    }

    createCategory();

    renderProducts(allProducts);

}

function createCategory(){

    const select =
        document.getElementById("categoryFilter");

    if(!select) return;

    const category = [...new Set(

        allProducts.map(p => p.Category)

    )];

    category.forEach(cat=>{

        if(!cat) return;

        const option =
            document.createElement("option");

        option.value = cat;

        option.textContent = cat;

        select.appendChild(option);

    });

}
function filterProducts() {

    const keyword = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const category = document
        .getElementById("categoryFilter")
        .value;

    const result = allProducts.filter(item => {

        const matchName =
            (item.Product || "")
            .toLowerCase()
            .includes(keyword);

        const matchCategory =
            category === "" ||
            item.Category === category;

        return matchName && matchCategory;

    });

    renderProducts(result);

}

function renderProducts(products){

    const container =
        document.getElementById("productsContainer");

    if(!products.length){

        container.innerHTML =
        "<div class='loading'>ไม่พบสินค้า</div>";

        return;

    }

    container.innerHTML = "";

    products.forEach(item=>{

        let statusClass = "status-open";

        const status =
            (item.Status || "").toLowerCase();

        if(status.includes("ปิด")){
            statusClass = "status-close";
        }

        if(status.includes("รอ")){
            statusClass = "status-coming";
        }

        container.innerHTML += `

        <div class="product-card">

            <img
                src="${item.Image || 'https://placehold.co/600x600?text=KOOKV_KPOP'}"
                alt="${item.Product || ''}">

            <div class="product-info">

                <div class="product-name">
                    ${item.Product || "-"}
                </div>

                <div class="product-price">
                    ฿${Number(item.Price || 0).toLocaleString("th-TH")}
                </div>

                <span class="product-status ${statusClass}">
                    ${item.Status || "-"}
                </span>

            </div>

        </div>

        `;

    });

}

console.log("Products Page Loaded");
