const API_URL =
"https://script.google.com/macros/s/AKfycbwdXnekkPNNav1PbQMt8s01dReumZxkv3c34i6n_xUBjMAmjKSnm1NBtpFvzq7yJtcc/exec?sheet=Products";

const productList = document.getElementById("productList");

async function loadProducts() {

    productList.innerHTML = "<p style='text-align:center'>กำลังโหลดสินค้า...</p>";

    try {

        const res = await fetch(API_URL);
        const products = await res.json();

        productList.innerHTML = "";

        products.forEach(product => {

            productList.innerHTML += `
                <div class="product-card">

                    <img
                        src="${product.Image}"
                        alt="${product.Product}"
                        onerror="this.src='https://via.placeholder.com/500x500?text=NO+IMAGE'">

                    <h2>${product.Product}</h2>

                    <div class="price">
                        ฿${product.Price}
                    </div>

                    <div class="status">
                        ${product.Status}
                    </div>

                    <button onclick="buyProduct('${product.ProductID}')">
                        🛒 สั่งซื้อ
                    </button>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

        productList.innerHTML =
        "<p style='text-align:center'>โหลดสินค้าไม่สำเร็จ</p>";

    }

}

function buyProduct(productID){

    window.location.href =
    "order.html?id=" + productID;

}

loadProducts();
