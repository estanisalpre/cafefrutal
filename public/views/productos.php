<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo - Café Frutal</title>
    <!--CSS-->
    <link rel="stylesheet" href="/public/styles/products.css">
    <!--FAVICON-->
    <link rel="shortcut icon" href="/public/assets/img/logo/logo_planta.png" type="image/x-icon">
    <!--FUENTES GOOGLE-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
</head>
<body>
    <!--NAV-->
    <nav>
        <button id="toMyIndex"><img src="/public/assets/img/icons/back.png" alt="Icon Back to the Index">Regresar</button>
        <img src="/public/assets/img/logo/logo_horizontal.png" alt="Logo Café Frutal">
    </nav>
    <!--BOTON WHATSAPP-->
    <figure class="whatsappContainer" id="whatsappContainer">
        <a href="https://wa.me/573206214348?text=¡Hola!%20Quiero%20contactarme%20con%20Café%20frutal"><img src="/public/assets/img/icons/whatsapp.png" alt="Logo whatsapp"></a>
    </figure>
    <!--MAIN-->
    <main>
        <section class="availableSection">
            <h3>Todos nuestros productos</h3>
            <div id="emptyProducts"><h2>No hay productos aún</h2></div>
            <div id="products"></div>
        </section>
        <p>Si tienes dudas o consultas por alguno de nuestros productos, ¡pulsa en whatsapp para comunicarte!</p>
    </main>
    <!--FOOTER-->
    <footer>
        <img src="/public/assets/img/logo/logo_horizontal_light.png" alt="Logo Claro Horizontal Cafe Frutal">
        <article class="info_footer">
            <p class="primer_p">Web Desarrollada por</p>
            <p class="segundo_p">Estanislao Salinas Previte - estanisprevite@hotmail.com</p>
        </article>
    </footer>
    <!--SCRIPTS-->
    <script type="module" src="/public/js/products.js"></script>
</body>
</html>