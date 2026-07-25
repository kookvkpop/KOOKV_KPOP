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

    if (tracking.textContent === "-" || tracking.textContent === "") return;

    navigator.clipboard.writeText(tracking.textContent);

    alert("คัดลอกเลข Tracking แล้ว");

});

async function searchOrder() {

    const keyword = searchInput.value.trim();

    if (!keyword) {

        alert("กรุณากรอกเลขออเดอร์ หรือ Tracking");

        return;

    }

    result.classList.add("hidden");

    searchBtn.disabled = true;
    searchBtn.textContent = "กำลังค้นหา...";

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

            return;

        }

        showOrder(order);

    } catch (err) {

        console.error(err);

        alert("เชื่อมต่อระบบไม่สำเร็จ");

    }

    searchBtn.disabled = false;
    searchBtn.textContent = "ค้นหา";

}

function showOrder(order){

    result.classList.remove("hidden");

    productImage.src =
        order.Image ||
        "https://via.placeholder.com/500x500?text=NO+IMAGE";

    productName.textContent = order.Product || "-";

    orderNo.textContent = order.OrderNo || "-";

    customer.textContent = order.Customer || "-";

    tracking.textContent = order.Tracking || "-";

    lot.textContent = order.LOT || "-";

    qty.textContent = order.Qty || "-";

    update.textContent = order.Update || "-";

    remark.textContent = order.Remark || "-";

    statusBadge.textContent = order.Status || "-";

    setStatusColor(order.Status);

    if(order.Tracking){

        copyBtn.style.display="inline-block";

    }else{

        copyBtn.style.display="none";

    }

}

function setStatusColor(status){

    statusBadge.style.background="#666";

    switch(status){

        case "เปิดรับพรีออเดอร์":
            statusBadge.style.background="#f4b400";
            break;

        case "ดำเนินการสั่งซื้อแล้ว":
            statusBadge.style.background="#fb8c00";
            break;

        case "รอเว็บจัดส่ง":
            statusBadge.style.background="#2196f3";
            break;

        case "ดำเนินการส่งกลับไทย":
            statusBadge.style.background="#7b1fa2";
            break;

        case "ถึงไทยแล้ว":
            statusBadge.style.background="#1565c0";
            break;

        case "กำลังแพ็กสินค้า":
            statusBadge.style.background="#795548";
            break;

        case "ส่งแล้ว":
            statusBadge.style.background="#2e7d32";
            break;

        case "จัดส่งสำเร็จ":
            statusBadge.style.background="#00897b";
            break;
    }

}

document.getElementById("thBtn").addEventListener("click",()=>{

    document.querySelector(".subtitle").innerText="ระบบเช็กสถานะสินค้า";

});

document.getElementById("enBtn").addEventListener("click",()=>{

    document.querySelector(".subtitle").innerText="Order Tracking System";

});
