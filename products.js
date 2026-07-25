const API_URL =
"https://script.google.com/macros/s/AKfycbwdXnekkPNNav1PbQMt8s01dReumZxkv3c34i6n_xUBjMAmjKSnm1NBtpFvzq7yJtcc/exec?sheet=Products";

const productList = document.getElementById("productList");

async function loadProducts() {

    try {

        const res = await fetch(API_URL);
        const products = await res.json();

        productList.innerHTML = "";

        products.forEach(product => {

            productList.innerHTML += `

            <div class="product-card">

                <img src="${product.Image}" alt="${product.Product}">

                <h2>${product.Product}</h2>

                <p class="price">฿${product.Price}</p>

                <span class="status">${product.Status}</span>

                <button onclick="buyProduct('${product.ProductID}')">
                    สั่งซื้อ
                </button>

            </div>

            `;

        });

    } catch (err) {

        productList.innerHTML =
        "<p>โหลดสินค้าไม่สำเร็จ</p>";

    }

}

function buyProduct(id){

    window.location.href =
    "order.html?id=" + id;

}

loadProducts();
