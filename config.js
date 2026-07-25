// ===============================
// KOOKV_KPOP Configuration
// ===============================

const CONFIG = {
    SHOP_NAME: "KOOKV_KPOP",

    API_URL: "https://script.google.com/macros/s/AKfycbwdXnekkPNNav1PbQMt8s01dReumZxkv3c34i6n_xUBjMAmjKSnm1NBtpFvzq7yJtcc/exec",

    SHEETS: {
        PRODUCTS: "Products",
        ORDERS: "Orders",
        BANNER: "Banner",
        ANNOUNCEMENTS: "Announcements"
    },

    SOCIAL: {
        LINE: "",
        INSTAGRAM: ""
    }
};

// ===============================
// API Helper
// ===============================

async function getSheet(sheetName) {

    try {

        const response = await fetch(
            `${CONFIG.API_URL}?sheet=${sheetName}`
        );

        return await response.json();

    } catch (error) {

        console.error(error);

        return [];

    }

}
