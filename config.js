// ======================================
// KOOKV_KPOP V3
// Configuration
// ======================================

const CONFIG = {

    // ชื่อร้าน
    SHOP_NAME: "KOOKV_KPOP",

    // Google Apps Script Web App URL
    API_URL: "https://script.google.com/macros/s/AKfycbwdXnekkPNNav1PbQMt8s01dReumZxkv3c34i6n_xUBjMAmjKSnm1NBtpFvzq7yJtcc/exec",

    // Google Sheets
    SHEETS: {

        PRODUCTS: "Products",

        ORDERS: "Orders",

        BANNER: "Banner",

        ANNOUNCEMENTS: "Announcements"

    },

    // Social
    SOCIAL: {

        LINE: "",

        FACEBOOK: "",

        INSTAGRAM: "",

        TIKTOK: ""

    }

};

// ======================================
// Generic API
// ======================================

async function getSheet(sheetName){

    try{

        const response = await fetch(

            `${CONFIG.API_URL}?sheet=${encodeURIComponent(sheetName)}`

        );

        if(!response.ok){

            throw new Error("Network Error");

        }

        const data = await response.json();

        return Array.isArray(data) ? data : [];

    }catch(error){

        console.error("getSheet :", error);

        return [];

    }

}

// ======================================
// Product
// ======================================

async function getProducts(){

    return await getSheet(CONFIG.SHEETS.PRODUCTS);

}

// ======================================
// Banner
// ======================================

async function getBanner(){

    return await getSheet(CONFIG.SHEETS.BANNER);

}

// ======================================
// Announcement
// ======================================

async function getAnnouncements(){

    return await getSheet(CONFIG.SHEETS.ANNOUNCEMENTS);

}

// ======================================
// Orders
// ======================================

async function getOrders(){

    return await getSheet(CONFIG.SHEETS.ORDERS);

}

// ======================================
// Find Product
// ======================================

async function getProductById(id){

    const products = await getProducts();

    return products.find(

        item => String(item.ProductID) === String(id)

    );

}

// ======================================
// Find Order
// ======================================

async function getOrder(orderId){

    const orders = await getOrders();

    return orders.find(item =>

        String(item.OrderID).trim() ===

        String(orderId).trim()

    );

}

console.log("CONFIG V3 Loaded");
