const API_URL = "https://script.google.com/macros/s/AKfycbymgbu7Y8lK5I9rtMpkqsMofY_1STPvrHSlrRnHTXhxWrq8JyrQvpq1P7-FECMrCrFW/exec";

// ===== Elements =====

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

const result = document.getElementById("result");

const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");

const orderNo = document.getElementById("orderNo");
const customer = document.getElementById("customer");
const tracking = document.getElementById("tracking");
const lot = document.getElementById("lot");
const qty = document.getElementById("qty");
const statusBadge = document.getElementById("statusBadge");
const update = document.getElementById("update");
const remark = document.getElementById("remark");

const copyBtn = document.getElementById("copyBtn");

// ==========================

searchBtn.addEventListener("click", searchOrder);

searchInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        searchOrder();

    }

});

copyBtn.addEventListener("click", copyTracking);

// ==========================

async function searchOrder() {

    const keyword = searchInput.value.trim();

    if (!keyword) {

        alert("กรุณากรอกเลขออเดอร์ หรือเลข Tracking");

        searchInput.focus();

        return;

    }

    result.classList.add("hidden");

    searchBtn.disabled = true;
    searchBtn.textContent = "กำลังค้นหา...";

    try {

        const response = await fetch(API_URL);

        const orders = await response.json();

        const order = orders.find(item =>

            item.OrderNo?.toLowerCase() === keyword.toLowerCase()

            ||

            item.Tracking?.toLowerCase() === keyword.toLowerCase()

            ||

            item.Customer?.toLowerCase().includes(keyword.toLowerCase())

        );

        if (!order) {

            alert("ไม่พบข้อมูล");

            return;

        }

        showOrder(order);

    } catch (error) {

        console.error(error);

        alert("ไม่สามารถเชื่อมต่อระบบได้");

    } finally {

        searchBtn.disabled = false;
        searchBtn.textContent = "ค้นหา";

    }

}

// ==========================

function showOrder(order) {

    result.classList.remove("hidden");

    productImage.src = order.Image || "https://via.placeholder.com/500x500?text=NO+IMAGE";

    productName.textContent = order.Product || "-";

    orderNo.textContent = order.OrderNo || "-";

    customer.textContent = order.Customer || "-";

    tracking.textContent = order.Tracking || "ยังไม่มีเลข Tracking";

    qty.textContent = order.Qty || "-";

    remark.textContent = order.Remark || "-";

    statusBadge.textContent = order.Status || "-";

    // LOT

    if (order.LOT) {

        lot.textContent = order.LOT.replace("LOT", "LOT ");

    } else {

        lot.textContent = "-";

    }

    // วันที่

    if (order.Update) {

        const d = new Date(order.Update);

        update.textContent = d.toLocaleDateString("th-TH", {

            day: "numeric",

            month: "short",

            year: "numeric"

        });

    } else {

        update.textContent = "-";

    }

    // สีสถานะ

    setStatusColor(order.Status);

    // ปุ่ม Copy

    if (order.Tracking) {

        copyBtn.style.display = "inline-block";

    } else {

        copyBtn.style.display = "none";

    }

}

// ==========================

function copyTracking() {

    if (!tracking.textContent || tracking.textContent === "ยังไม่มีเลข Tracking") {

        return;

    }

    navigator.clipboard.writeText(tracking.textContent);

    alert("คัดลอกเลข Tracking แล้ว");

}

// ==========================

function setStatusColor(status) {

    const colors = {

        "เปิดรับพรีออเดอร์": "#F4B400",

        "ดำเนินการสั่งซื้อแล้ว": "#FB8C00",

        "รอเว็บจัดส่ง": "#2196F3",

        "ดำเนินการส่งกลับไทย": "#7B1FA2",

        "ถึงไทยแล้ว": "#1565C0",

        "กำลังแพ็กสินค้า": "#8D6E63",

        "ส่งแล้ว": "#2E7D32",

        "จัดส่งสำเร็จ": "#00897B"

    };

    statusBadge.style.background = colors[status] || "#666";

}

// ==========================

document.getElementById("thBtn").addEventListener("click", () => {

    document.querySelector(".subtitle").textContent = "ระบบเช็กสถานะสินค้า";

});

document.getElementById("enBtn").addEventListener("click", () => {

    document.querySelector(".subtitle").textContent = "Order Tracking System";

});
