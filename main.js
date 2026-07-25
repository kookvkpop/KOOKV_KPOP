// =========================
// KOOKV_KPOP Main Script
// =========================

document.addEventListener("DOMContentLoaded", () => {
    loadAnnouncements();
    loadProducts();
    loadBanner();
});

// =========================
// โหลดประกาศ
// =========================
async function loadAnnouncements() {

    const list = document.getElementById("announcementList");

    if (!list) return;

    const data = await getSheet(CONFIG.SHEETS.ANNOUNCEMENTS);

    if (!data || data.length === 0) {
        list.innerHTML = `
            <div class="announcement-item">
                ยังไม่มีประกาศ
            </div>
        `;
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

// =========================
// โหลดสินค้า
// =========================
async function loadProducts() {

    const homeContainer = document.getElementById("homeProducts");
    const newContainer = document.getElementById("newProducts");

    if (!homeContainer) return;

    const products = await getSheet(CONFIG.SHEETS.PRODUCTS);

    if (!products || products.length === 0) {

        homeContainer.innerHTML = `
            <div class="loading">
                ยังไม่มีสินค้า
            </div>
        `;

        if (newContainer) {

            newContainer.innerHTML = `
                <div class="loading">
                    ยังไม่มีสินค้า
                </div>
            `;

        }

        return;
    }

    homeContainer.innerHTML = "";

    if (newContainer) {
        newContainer.innerHTML = "";
    }

    products.forEach((item, index) => {

        homeContainer.appendChild(createProductCard(item));

        if (newContainer && index < 4) {
            newContainer.appendChild(createProductCard(item));
        }

    });

}

// =========================
// สร้างการ์ดสินค้า
// =========================
function createProductCard(item) {

    const card = document.createElement("div");

    card.className = "product-card";

    let statusClass = "status-open";

    const status = (item.Status || "").toLowerCase();

    if (status.includes("ปิด")) {
        statusClass = "status-close";
    } else if (status.includes("รอ")) {
        statusClass = "status-coming";
    }

    const image =
        item.Image && item.Image !== ""
            ? item.Image
            : "https://placehold.co/600x600?text=KOOKV_KPOP";

    card.innerHTML = `

        <img
            src="${image}"
            alt="${item.Product || ""}"
            loading="lazy"
            onerror="this.src='https://placehold.co/600x600?text=KOOKV_KPOP'">

        <div class="product-info">

            <div class="product-name">
                ${item.Product || "-"}
            </div>

            <div class="product-price">
                ฿${Number(item.Price || 0).toLocaleString("th-TH")}
            </div>

            <p style="margin:12px 0;color:#cccccc;font-size:14px;line-height:1.6;">
                ${item.Description || ""}
            </p>

            <span class="product-status ${statusClass}">
                ${item.Status || "-"}
            </span>

            <p style="margin-top:15px;font-size:14px;">
                📦 <strong>สต็อก :</strong>
                ${item.Stock || "-"}
            </p>

            <p style="font-size:14px;">
                ⏰ <strong>ปิดพรี :</strong>
                ${item.PreorderEnd || "-"}
            </p>

        </div>

    `;

    return card;

}

// =========================
// โหลด Banner
// =========================
async function loadBanner() {

    const banners = await getSheet(CONFIG.SHEETS.BANNER);

    console.log("Banner :", banners);

}

// =========================
// เริ่มต้นเว็บไซต์
// =========================

console.log("KOOKV_KPOP Website Loaded");
