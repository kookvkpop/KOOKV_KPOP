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

        if (!banners || banners.length === 0) {
            console.log("No Banner");
            return;
        }

        const banner =
            banners.find(item => String(item.Status).trim() === "Active")
            || banners[0];

        let image = "";

        if (banner.Image) {

            image = String(banner.Image).trim();

            // ถ้ายังเป็นลิงก์ Google Drive แบบ file/d/
            if (image.includes("/file/d/")) {

                const id = image.split("/d/")[1].split("/")[0];

                image =
                    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

            }

        }

        if (image !== "") {

            hero.style.background =
                `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url("${image}") center center / cover no-repeat`;

        }

        title.textContent =
            banner.Title || CONFIG.SHOP_NAME;

        description.textContent =
            banner.Description || "";

        button.textContent =
            banner.Button || "ดูสินค้า";

        button.href =
            banner.Link || "products.html";

    } catch (err) {

        console.error("Banner Error :", err);

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

        products
.filter(product => product.ProductID)
.forEach((product, index) => {

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

    let image = "";

if (item.Image) {

    image = String(item.Image).trim();

    image = image.replace("/view?usp=sharing", "");

    if (image.includes("/file/d/")) {

        const id = image.split("/d/")[1].split("/")[0];

        image = `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;

    }

} else {

    image = "https://placehold.co/600x600?text=KOOKV_KPOP";

}

    card.innerHTML = `

        <img
    src="${image}"
    alt="${item.Product || ""}"
    loading="lazy"
    referrerpolicy="no-referrer"
    onerror="
        const id=(this.src.match(/id=([^&]+)/)||[])[1];
        if(id){
            this.src='https://drive.google.com/thumbnail?id='+id+'&sz=w1200';
        }else{
            this.src='https://placehold.co/600x600?text=No+Image';
        }
    ">

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
