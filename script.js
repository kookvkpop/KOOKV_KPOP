const API_URL =
"https://script.google.com/macros/s/AKfycbymgbu7Y8lK5I9rtMpkqsMofY_1STPvrHSlrRnHTXhxWrq8JyrQvpq1P7-FECMrCrFW/exec";

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

searchBtn.addEventListener("click", searchOrder);

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchOrder();
    }
});

copyBtn.addEventListener("click", () => {
    if (tracking.textContent && tracking.textContent !== "-") {
        navigator.clipboard.writeText(tracking.textContent);
        alert("คัดลอกเลข Tracking แล้ว");
    }
});

async function searchOrder() {

    const keyword = searchInput.value.trim();

    if (!keyword) {
        alert("กรุณากรอกข้อมูล");
        return;
    }

    result.classList.add("hidden");

    searchBtn.disabled = true;
    searchBtn.innerText = "กำลังค้นหา...";

    try {

        const res = await fetch(API_URL);
        const data = await res.json();

        const order = data.find(item =>

            item.OrderNo?.toLowerCase() === keyword.toLowerCase()

            ||

            item.Tracking?.toLowerCase() === keyword.toLowerCase()

            ||

            item.Customer?.toLowerCase().includes(keyword.toLowerCase())

        );

        if (!order) {

            alert("ไม่พบข้อมูล");

            searchBtn.disabled = false;
            searchBtn.innerText = "ค้นหา";

            return;
        }

        showOrder(order);

    } catch (error) {

        console.error(error);
        alert("ไม่สามารถเชื่อมต่อระบบได้");

    }

    searchBtn.disabled = false;
    searchBtn.innerText = "ค้นหา";

}

function showOrder(order) {

    result.classList.remove("hidden");

    productImage.src =
        order.Image || "https://via.placeholder.com/300x300?text=No+Image";

    productName.textContent = order.Product || "-";

    orderNo.textContent = order.OrderNo || "-";
    customer.textContent = order.Customer || "-";
    tracking.textContent = order.Tracking || "-";
    lot.textContent = order.LOT || "-";
    qty.textContent = order.Qty || "-";
    update.textContent = order.Update || "-";
    remark.textContent = order.Remark || "-";

    statusBadge.textContent = order.Status || "-";

}

document.getElementById("thBtn").addEventListener("click", () => {

    document.querySelector(".subtitle").innerText =
        "ระบบเช็กสถานะสินค้า";

});

document.getElementById("enBtn").addEventListener("click", () => {

    document.querySelector(".subtitle").innerText =
        "Order Tracking System";

});
