const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("productDetail");

async function loadProduct() {

    try {

        const response = await fetch(`${API_URL}?sheet=Products`);
        const products = await response.json();

        const product = products.find(item => item.ProductID == productId);

        if (!product) {

            container.innerHTML = `
                <div class="loading">
                    ไม่พบข้อมูลสินค้า
                </div>
            `;
            return;

        }

        let statusClass = "status-coming";

        if (product.Status === "เปิดพรี")
            statusClass = "status-open";

        if (product.Status === "ปิดพรี")
            statusClass = "status-close";

        container.innerHTML = `

            <div class="product-detail">

                <img
                    src="${product.Image}"
                    alt="${product.Product}"
                    class="detail-image">

                <div class="detail-info">

                    <h1>${product.Product}</h1>

                    <div class="product-price">
                        ฿${Number(product.Price).toLocaleString()}
                    </div>

                    <span class="product-status ${statusClass}">
                        ${product.Status}
                    </span>

                    <p style="margin-top:25px;">
                        ${product.Description || "-"}
                    </p>

                    <p>
                        <strong>คงเหลือ :</strong>
                        ${product.Stock || "-"}
                    </p>

                    <p>
                        <strong>ปิดพรี :</strong>
                        ${product.PreorderEnd || "-"}
                    </p>

                    <br>

                    <a
                        href="https://lin.ee/"
                        class="btn"
                        target="_blank">

                        สั่งซื้อสินค้า

                    </a>

                </div>

            </div>

        `;

    } catch (err) {

        container.innerHTML = `
            <div class="loading">
                โหลดข้อมูลไม่สำเร็จ
            </div>
        `;

        console.error(err);

    }

}

loadProduct();
