// ==========================================
// KOOKV_KPOP Main.js V3
// ==========================================

document.addEventListener("DOMContentLoaded", init);

async function init() {

    try {

        await Promise.all([
            loadBanner(),
            loadAnnouncements(),
            loadProducts()
        ]);

    } catch (err) {

        console.error(err);

    }

}

// ==========================================
// Banner
// ==========================================

async function loadBanner() {

    const heroImage = document.getElementById("heroImage");
    const heroTitle = document.getElementById("heroTitle");
    const heroDescription = document.getElementById("heroDescription");
    const heroButton = document.getElementById("heroButton");

    if (!heroImage) return;

    try {

        const banners = await getBanner();

        if (!banners.length) return;

        const banner =
            banners.find(item => String(item.Status).trim() === "Active")
            || banners[0];

        let image = "";

        if (banner.Image) {

            image = String(banner.Image).trim();

            // Google Drive file link
            if (image.includes("/file/d/")) {

                const id = image.split("/d/")[1].split("/")[0];

                image =
                    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

            }

            // Google Drive uc link
            else if (image.includes("uc?export=view&id=")) {

                const id = image.split("id=")[1];

                image =
                    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

            }

        }

        heroImage.src = image;

        heroImage.alt = banner.Title || "Banner";

        heroImage.onerror = function () {

            this.src =
                "https://placehold.co/1600x700?text=KOOKV_KPOP";

        };

        heroTitle.textContent =
            banner.Title || CONFIG.SHOP_NAME;

        heroDescription.textContent =
            banner.Description || "";

        heroButton.textContent =
            banner.Button || "ดูสินค้า";

        heroButton.href =
            banner.Link || "products.html";

    } catch (err) {

        console.error("Banner :", err);

    }

}

// ==========================================
// Announcement
// ==========================================

async function loadAnnouncements() {

    const container =
        document.getElementById("announcementList");

    if (!container) return;

    try {

        const announcements =
            await getAnnouncements();

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

                    <p>
                        ${item.Description || item.Detail || ""}
                    </p>

                </div>
            `;

        });

    } catch (err) {

        console.error(err);

        container.innerHTML = `
            <div class="announcement-item">
                โหลดประกาศไม่สำเร็จ
            </div>
        `;

    }

}

// ==========================================
// Products
// ==========================================

async function loadProducts() {

    const home =
        document.getElementById("homeProducts");

    const newest =
        document.getElementById("newProducts");

    if (!home) return;

    try {

        const products =
            await getProducts();

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
            .filter(item => item.ProductID)
            .forEach((item, index) => {

                home.appendChild(
                    createProductCard(item)
                );

                if (newest && index < 4) {

                    newest.appendChild(
                        createProductCard(item)
                    );

                }

            });

    } catch (err) {

        console.error(err);

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

    card.href =
        `product.html?id=${encodeURIComponent(item.ProductID)}`;

    let statusClass = "status-open";

    const status =
        String(item.Status || "").toLowerCase();

    if (status.includes("ปิด")) {

        statusClass = "status-close";

    } else if (status.includes("รอ")) {

        statusClass = "status-coming";

    }

    let image = "";

    if (item.Image) {

        image = String(item.Image).trim();

        if (image.includes("/file/d/")) {

            const id =
                image.split("/d/")[1].split("/")[0];

            image =
                `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;

        }

        else if (image.includes("uc?export=view&id=")) {

            const id =
                image.split("id=")[1];

            image =
                `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;

        }

    }

    if (!image) {

        image =
            "https://placehold.co/600x600?text=KOOKV_KPOP";

    }

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

console.log("KOOKV_KPOP Main.js V3 Loaded");
