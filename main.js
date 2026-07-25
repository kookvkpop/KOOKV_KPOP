// =========================
// KOOKV_KPOP Main Script
// =========================

document.addEventListener("DOMContentLoaded", () => {
    loadAnnouncements();
    loadProducts();
});

// โหลดประกาศ
async function loadAnnouncements() {

    const list = document.getElementById("announcementList");

    if (!list) return;

    const data = await getSheet(CONFIG.SHEETS.ANNOUNCEMENTS);

    if (!data.length) {
        list.innerHTML = "<div class='announcement-item'>ยังไม่มีประกาศ</div>";
        return;
    }

    list.innerHTML = "";

    data.forEach(item => {

        const div = document.createElement("div");

        div.className = "announcement-item";

        div.innerHTML = `
            <h3>${item.Title || ""}</h3>
            <p>${item.Detail || ""}</p>
        `;

        list.appendChild(div);

    });

}

// โหลดสินค้า
async function loadProducts(){

    const container = document.getElementById("homeProducts");
    const newContainer = document.getElementById("newProducts");

    if(!container) return;

    const products = await getSheet(CONFIG.SHEETS.PRODUCTS);

    if(!products.length){

        container.innerHTML =
        "<div class='loading'>ยังไม่มีสินค้า</div>";

        if(newContainer){
            newContainer.innerHTML =
            "<div class='loading'>ยังไม่มีสินค้า</div>";
        }

        return;
    }

    container.innerHTML="";

    if(newContainer){
        newContainer.innerHTML="";
    }

    products.forEach((item,index)=>{

        const card=createProductCard(item);

        container.appendChild(card);

        if(newContainer && index<4){

            newContainer.appendChild(
                createProductCard(item)
            );

        }

    });

}
// =========================
// สร้างการ์ดสินค้า
// =========================

function createProductCard(item){

    const card = document.createElement("div");

    card.className = "product-card";

    const status = (item.Status || "").toLowerCase();

    let statusClass = "status-open";

    if(status.includes("ปิด")){
        statusClass = "status-close";
    }

    if(status.includes("รอ")){
        statusClass = "status-coming";
    }

    card.innerHTML = `

        <img src="${item.Image || 'https://placehold.co/600x600?text=KOOKV_KPOP'}"
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

    `;

    return card;

}

// =========================
// Banner (สำหรับใช้งานในอนาคต)
// =========================

async function loadBanner(){

    const banners = await getSheet(CONFIG.SHEETS.BANNER);

    console.log("Banner :", banners);

}

// =========================
// Console
// =========================

console.log("KOOKV_KPOP Website Loaded");
