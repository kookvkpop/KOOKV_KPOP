// =======================================
// KOOKV_KPOP Track Order V2
// =======================================

let orders = [];

document.addEventListener("DOMContentLoaded", async () => {

    await loadOrders();

    document
        .getElementById("searchBtn")
        ?.addEventListener("click", searchOrder);

    document
        .getElementById("orderInput")
        ?.addEventListener("keypress", function (e) {

            if (e.key === "Enter") {

                searchOrder();

            }

        });

});

// =======================================
// โหลดข้อมูล Orders
// =======================================

async function loadOrders() {

    try {

        orders = await getSheet(CONFIG.SHEETS.ORDERS);

        console.log("Orders :", orders);

// โหลดข้อมูลสำเร็จ
        
    }

    catch (err) {

        console.error(err);

        orders = [];

    }

}

// =======================================
// ค้นหา
// OrderNo
// Customer
// Tracking
// =======================================

function searchOrder() {

    const keyword = document
        .getElementById("orderInput")
        .value
        .trim()
        .toUpperCase();

    const resultBox =
        document.getElementById("resultBox");

    if (!keyword) {

        resultBox.innerHTML = `

        <div class="announcement-item">

            กรุณากรอกเลขออเดอร์
            หรือชื่อลูกค้า
            หรือเลขพัสดุ

        </div>

        `;

        return;

    }

    const result = orders.filter(item => {

        const orderNo =
    String(item.OrderNo || "")
    .trim()
    .toUpperCase();

const customer =
    String(item.Customer || "")
    .trim()
    .toUpperCase();

const tracking =
    String(item.Tracking || "")
    .trim()
    .toUpperCase();

        return (

            orderNo.includes(keyword) ||

            customer.includes(keyword) ||

            tracking.includes(keyword)

        );

    });

    if (result.length === 0) {

        resultBox.innerHTML = `

        <div class="announcement-item">

            ❌ ไม่พบข้อมูล

        </div>

        `;

        return;

    }

    resultBox.innerHTML = "";

    result.forEach(order => {

        resultBox.innerHTML += createOrderCard(order);

    });

}

// =======================================
// Card
// =======================================

function createOrderCard(order) {

    let statusClass = "status-open";

    const status =
        String(order.Status || "").toLowerCase();

    if (status.includes("ถึงไทย")) {

        statusClass = "status-coming";

    }

    if (status.includes("รอ")) {

        statusClass = "status-coming";

    }

    if (status.includes("ยกเลิก")) {

        statusClass = "status-close";

    }

    let image = "";

    if (order.Image) {

        image = String(order.Image);

        if (image.includes("/file/d/")) {

            const id =
                image.split("/d/")[1].split("/")[0];

            image =
                `https://drive.google.com/thumbnail?id=${id}&sz=w800`;

        }

        else if (image.includes("uc?export=view&id=")) {

            const id =
                image.split("id=")[1];

            image =
                `https://drive.google.com/thumbnail?id=${id}&sz=w800`;

        }

    }

    if (!image) {

        image =
            "https://placehold.co/500x500?text=KOOKV_KPOP";

    }

    return `

    <div class="product-card">

        <img
            src="${image}"
            alt="${order.Product || ""}"
            loading="lazy"
            onerror="this.src='https://placehold.co/500x500?text=No+Image'">

        <div class="product-info">

            <h3 style="margin-bottom:20px;">
                📦 ${order.OrderNo || "-"}
            </h3>

            <p>
                <strong>👤 ลูกค้า</strong><br>
                ${order.Customer || "-"}
            </p>

            <br>

            <p>
                <strong>🛍 สินค้า</strong><br>
                ${order.Product || "-"}
            </p>

            <br>

            <p>
                <strong>📦 จำนวน</strong><br>
                ${order.Qty || "-"} ชิ้น
            </p>

            <br>

            <p>
                <strong>🏷 LOT</strong><br>
                ${order.LOT || "-"}
            </p>

            <br>

            <p>

                <strong>สถานะ</strong><br>

                <span class="product-status ${statusClass}">
                    ${order.Status || "-"}
                </span>

            </p>

            <br>

            <p>
                <strong>🚚 Tracking</strong><br>
                ${order.Tracking || "-"}
            </p>

            <br>

            <p>
                <strong>📅 อัปเดตล่าสุด</strong><br>
                ${order.Update || "-"}
            </p>

            <br>

            <p>
                <strong>📝 หมายเหตุ</strong><br>
                ${order.Remark || "-"}
            </p>

        
    `;

}

// =======================================
// Ready
// =======================================

console.log("KOOKV_KPOP Track V2 Loaded");
