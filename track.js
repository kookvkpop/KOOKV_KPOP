// =========================
// KOOKV_KPOP Track Order
// =========================

let orders = [];

document.addEventListener("DOMContentLoaded", async () => {

    await loadOrders();

    document
        .getElementById("searchBtn")
        ?.addEventListener("click", searchOrder);

    document
        .getElementById("orderInput")
        ?.addEventListener("keypress", (e) => {

            if (e.key === "Enter") {

                searchOrder();

            }

        });

});

// โหลดข้อมูลออเดอร์จาก Google Sheets
async function loadOrders() {

    orders = await getSheet(CONFIG.SHEETS.ORDERS);

    console.log("Orders Loaded :", orders);

}

// ค้นหาออเดอร์
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
            </div>
        `;

        return;

    }

    const order = orders.find(item =>
        (item.OrderID || "")
        .toUpperCase()
        .trim() === keyword
    );

    if (!order) {

        resultBox.innerHTML = `
            <div class="announcement-item">
                ❌ ไม่พบเลขออเดอร์นี้
            </div>
        `;

        return;

    }

    showOrder(order);

}
// =========================
// แสดงผลออเดอร์
// =========================

function showOrder(order) {

    const resultBox =
        document.getElementById("resultBox");

    let statusClass = "status-open";

    const status =
        (order.Status || "").toLowerCase();

    if (status.includes("จัดส่ง")) {
        statusClass = "status-open";
    }

    if (status.includes("ถึงไทย")) {
        statusClass = "status-coming";
    }

    if (status.includes("รอ")) {
        statusClass = "status-coming";
    }

    if (status.includes("ยกเลิก")) {
        statusClass = "status-close";
    }

    resultBox.innerHTML = `

    <div class="product-card">

        <div class="product-info">

            <h3 style="margin-bottom:20px;">
                📦 รายละเอียดออเดอร์
            </h3>

            <p>
                <strong>Order ID :</strong><br>
                ${order.OrderID || "-"}
            </p>

            <br>

            <p>
                <strong>ชื่อลูกค้า :</strong><br>
                ${order.Customer || "-"}
            </p>

            <br>

            <p>
                <strong>สถานะ :</strong><br>

                <span class="product-status ${statusClass}">
                    ${order.Status || "-"}
                </span>

            </p>

            <br>

            <p>
                <strong>Tracking :</strong><br>
                ${order.Tracking || "-"}
            </p>

            <br>

            <p>
                <strong>อัปเดตล่าสุด :</strong><br>
                ${order.UpdateDate || "-"}
            </p>

        </div>

    </div>

    `;

}

console.log("Track Page Loaded");
