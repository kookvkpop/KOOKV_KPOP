// ==========================================
// KOOKV_KPOP Main.js V2
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    init();
});

async function init() {
    await Promise.all([
        loadBanner(),
        loadAnnouncements(),
        loadProducts()
    ]);
}

// ==========================================
// Banner
// ==========================================

async function loadBanner() {

    const hero = document.getElementById("heroBanner");
    const title = document.getElementById("heroTitle");
    const description = document.getElementById("heroDescription");
    const button = document.getElementById("heroButton");

    if (!hero) return;

    try {

        const banners = await getBanner();

        if (!banners.length) return;

        const banner = banners[0];

        if (banner.Image) {

            hero.style.backgroundImage =
                `linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.65)),url('${banner.Image}')`;

            hero.style.backgroundSize = "cover";
            hero.style.backgroundPosition = "center";

        }

        title.textContent =
            banner.Title || CONFIG.SHOP_NAME;

        description.textContent =
            banner.Description || "";

        if (banner.Link) {

            button.href = banner.Link;

        }

        if (banner.Button) {

            button.textContent = banner.Button;

        }

    } catch (error) {

        console.error(error);

    }

}

// ==========================================
// Announcement
// ==========================================

async function loadAnnouncements() {

    const container = document.getElementById("announcementList");

    if (!container) return;

    try {

        const announcements = await getSheet(CONFIG.SHEETS.ANNOUNCEMENTS);

        if (!announcements.length) {

            container.innerHTML = `
                <div class="announcement-item">
                    ยังไม่มีประกาศ
                </div>
            `;

            return;

        }

        container.innerHTML = "";

        announcements.forEach(item => {

            container.innerHTML += `

                <div class="announcement-item">

                    <h3>${item.Title || ""}</h3>

                    <p>${item.Description || item.Detail || ""}</p>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="announcement-item">
                ไม่สามารถโหลดประกาศได้
            </div>
        `;

    }

}

// ==========================================
// Products
// ==========================================

async function loadProducts() {

    const home = document.getElementById("homeProducts");
    const newest = document.getElementById("newProducts");

    if (!home) return;

    try {

        const products = await getSheet(CONFIG.SHEETS.PRODUCTS);

        if (!products.length) {

            home.innerHTML =
                "<div class='loading'>ยังไม่มีสินค้า</div>";

            if (newest) {

                newest.innerHTML =
                    "<div class='loading'>ยังไม่มีสินค้า</div>";

            }

            return;

        }

        home.innerHTML = "";

        if (newest) {

            newest.innerHTML = "";

        }

        products.forEach((product, index) => {

            home.appendChild(createProductCard(product));

            if (newest && index < 4) {

                newest.appendChild(createProductCard(product));

            }

        });

    } catch (error) {

        console.error(error);

        home.innerHTML =
            "<div class='loading'>โหลดสินค้าไม่สำเร็จ</div>";

    }

}

// ==========================================
// Product Card
// ==========================================

function createProductCard(item) {

    const card = document.createElement("a");

    card.className = "product-card";

    card.href = `product.html?id=${encodeURIComponent(item.ProductID)}`;

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
            onerror="this.src='https://placehold.co/600x600?text=No+Image'">

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

            <p style="margin-top:14px;font-size:14px;">
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

// ==========================================
// Console
// ==========================================

console.log("KOOKV_KPOP Main.js V2 Loaded");
