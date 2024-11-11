//Funcionalidad de productos.html

document.addEventListener('DOMContentLoaded', () => {
    availableProducts();
    backToIndex();
})

//Fetch para capturar productos disponibles
function availableProducts(){
    fetch('/api/productos/available')
        .then(response => response.json())
        .then(data => {
            const products = document.getElementById('products');
            const emptyProducts = document.getElementById('emptyProducts')

            let html = '';
            if(data.length === 0){
                emptyProducts.style.display = 'flex'
            } else {
                emptyProducts.style.display = 'none'
                data.forEach(product => {
                    html += `
                    <div class="card">
                        <span>${product.productName}</span>
                        <span>$${product.productValue}</span>
                    </div>
                    `;
                });
                products.innerHTML = html;
            }
    })
    .catch(error => console.error('Error:', error));
}

//Back to index
function backToIndex(){
    const backToIndexButton = document.getElementById('toMyIndex')

    if(backToIndexButton){
        backToIndexButton.addEventListener('click', () => {
            location.href = './index.html'
        })
    }
}