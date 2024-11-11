//Funcionalidad del admin.html
export function allButtons(){
    //Admin button
    adminButton();
    //Hacia el panel de admin
    toAdminPanel();
    //Volver al index
    toIndex();
    //Todos los productos
    allProducts();
    //Agregar producto nuevo
    addProductSection();
    //Mostrar lista
    showProductsList();
}

//Boton admin
function adminButton(){
    const adminButton = document.getElementById('adminButton')
        
    if(adminButton){
        const sectionForm = document.getElementById('sectionForm')

        adminButton.addEventListener('click', () => {
            sectionForm.style.display = 'flex'
        })
    }
}

//Hacia index.html
function toIndex(){
    const toIndex = document.getElementById('toIndex')
    
    if(toIndex){
        toIndex.addEventListener('click', () => {
            location.href = 'index.html'
        })
    }
}
//Hacia panel administrativo
function toAdminPanel(){
    const userName = document.getElementById('userName')
    const password = document.getElementById('password')
    const submitLogin = document.getElementById('submitLogin')
    const backButton = document.getElementById('backButton')

    if(submitLogin){
        submitLogin.addEventListener('click', (e) => {
            e.preventDefault();

            const usernameValue = userName.value 
            const passwordValue = password.value 

            if(usernameValue === "armando2024" && passwordValue === "armando1233"){
                location.href = './admin'
            } else {
                alert('Credenciales incorrectas')
            }
        })
    }

    //Para cerrar modal de login
    if(backButton){
        const sectionForm = document.getElementById('sectionForm')
        backButton.addEventListener('click', () => {
            sectionForm.style.display = 'none'
        })
    }
}

//Agregar producto nuevo
function addProductSection(){
    const addButton = document.getElementById('addButton')
    const newProductSection = document.getElementById('newProductSection')
    const productListSection = document.getElementById('productListSection')

    if(addButton){
        addButton.addEventListener('click', () => {
            closeTitles();
            productListSection.style.display = 'none'
            newProductSection.style.display = 'flex'
        })
    }
}

//Ver Lista
function showProductsList(){
    const listButton = document.getElementById('listButton')
    const productListSection = document.getElementById('productListSection')
    const newProductSection = document.getElementById('newProductSection')

    if(listButton){
        listButton.addEventListener('click', () => {
            closeTitles();
            showList();
            newProductSection.style.display = 'none'
            productListSection.style.display = 'flex'
        })
    }
}

//Ver lista productos
function showList(){
    fetch('/api/productos')
        .then(response => response.json())
        .then(data => {
            const productListSection = document.getElementById('productListSection');
 
            let html = `
                <h1>Lista de Productos</h1>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Disponible</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                `;

            data.forEach(product => {
                html += `
                <tr>
                    <td>${product.idProduct}</td>
                    <td>${product.productName}</td>
                    <td>${product.productValue}</td>
                    <td>${product.available ? 'Sí' : 'No'}</td>
                    <td>
                        <button class="edit-btn" data-id="${product.idProduct}" data-name="${product.productName}" data-available="${product.available}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10A.5.5 0 0 1 4.5 14h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .146-.354l10-10zM11.207 2L5 8.207V9h.793L13 3.207 11.207 2zM4 10v1h1L11 5l-1-1L4 10zm-1 1.5V14h2.5l.5-.5h-3v-2.5H2.5zm9-11.5l1 1H15v-1H13.5z"/>
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="delete-btn" data-id="${product.idProduct}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zM2.5 1a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1H15a1 1 0 0 1 1 1v1H0V2a1 1 0 0 1 1-1h1.5zM1 3h14v1H1V3zm2 1h10v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                `;
            });

            html += '</table>'; 
            productListSection.innerHTML = html;

            //Asigna el evento a los botones de eliminar después de que el contenido se haya cargado
            const deleteButtons = document.querySelectorAll('.delete-btn');
            const editButtons = document.querySelectorAll('.edit-btn')

            //Eliminar
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productId = button.getAttribute('data-id');
                    deleteProduct(productId);
                });
            });

            //Editar
            editButtons.forEach(edit => {
                edit.addEventListener('click', function(){
                    console.log('entramos al boton editar')
                    const editProductId = edit.getAttribute('data-id');
                    const productName = edit.getAttribute('data-name');
                    const available = edit.getAttribute('data-available');
                    openEditForm(editProductId, productName, available);
                })
            })
    })
    .catch(error => console.error('Error:', error));
}

//Cerrar titulos del panel
function closeTitles(){
    document.getElementById('titlePanel').style.display = 'none'
    document.getElementById('infoPanel').style.display = 'none'
}

//Productos
function allProducts(){
    const firstDiv = document.getElementById('firstDiv')
    const secondDiv = document.getElementById('secondDiv')
    const thirdDiv = document.getElementById('thirdDiv')
    const fourthDiv = document.getElementById('fourthDiv')
    const moreProducts = document.getElementById('moreProductsButton')

    if(firstDiv || secondDiv || thirdDiv || fourthDiv || moreProducts){
        firstDiv.addEventListener('click', () => {location.href = './productos'})
        secondDiv.addEventListener('click', () => {location.href = './productos'})
        thirdDiv.addEventListener('click', () => {location.href = './productos'})
        fourthDiv.addEventListener('click', () => {location.href = './productos'})
        moreProducts.addEventListener('click', () => {location.href = './productos'})
    }
}

//Eliminar producto
function deleteProduct(productId) {
    // Confirmación antes de eliminar
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        // Solicitud DELETE al servidor
        fetch(`/delete-product/${productId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message); 
            // Actualizar la lista de productos después de eliminar
            showList();
        })
        .catch(error => console.error('Error:', error));
    }
}

//Formulario para editar
function openEditForm(editProductId, productName, available) {
    console.log('entramos a openeditform')
    const editForm = document.getElementById('editForm');
    const productNameInput = document.getElementById('editProductName');
    const productAvailableInput = document.getElementById('editProductAvailable');
    const submitEditButton = document.getElementById('submitEditButton');

    console.log(editForm)
    console.log(productAvailableInput)
    console.log(submitEditButton)
    console.log(productNameInput)
    //Rellenar el formulario con los valores del producto
    productNameInput.value = productName;
    productAvailableInput.checked = available === '1'; // Si está disponible, marcarlo como 'checked'

    // Mostrar el formulario
    editForm.style.display = 'block';

    // Al hacer clic en el botón para guardar los cambios
    submitEditButton.onclick = function() {
        const updatedAvailable = productAvailableInput.checked ? 'on' : 'off';

        // Enviar la actualización al servidor
        fetch('/update-stock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [productName]: updatedAvailable })
        })
        .then(response => response.text())
        .then(message => {
            alert(message); // Mostrar mensaje de éxito
            closeEditForm(); // Cerrar el formulario
            showList(); // Refrescar la lista de productos
        })
        .catch(error => console.error('Error:', error));
    };
}

// Cerrar el formulario de edición
function closeEditForm() {
    const editForm = document.getElementById('editForm');
    editForm.style.display = 'none';
}
  