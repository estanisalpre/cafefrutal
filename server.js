import express from 'express';
import bodyParser from 'body-parser';
import mysql2 from 'mysql2';
import {dirname} from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

//Inicializamos
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const __dirname = dirname(fileURLToPath(import.meta.url));

//Conexión a la base de datos  
const pool = mysql2.createPool({    
    host: '82.197.82.73',  
    port: 3306,  
    user: 'u584871321_admin',  
    password: 'Cafefrutal1233#',   
    database: 'u584871321_stockProducts',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});   
         
//Verificamos que conecte a la BD 
if(pool){
    console.log('Conectado a la BD')
} else {
    console.log('No conectado a la BD')
}

app.get('/', (req, res) => {  
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/admin', (req, res) => {   
  res.sendFile(path.join(__dirname, 'public', 'views', 'admin.php'));
});
app.get('/productos', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'views', 'productos.php');
  console.log(`Intentando enviar archivo: ${filePath}`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error enviando archivo:', err);
      res.status(404).send('Archivo no encontrado');
    } else {
      console.log('Archivo enviado exitosamente:', filePath);
    }
  });
});
//Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

   
//Ruta para actualizar el stock
app.post('/update-stock', (req, res) => {
  let updateQueries = [];
  for (let key in req.body) {
    let status = req.body[key] === 'on' ? 1 : 0;
    updateQueries.push(`UPDATE products SET available=${status} WHERE productName='${key}'`);
  }
  pool.query(updateQueries.join(';'), (err, result) => {
    if (err) throw err;
    res.send('Stock actualizado');
  }); 
});

//Ruta para agregar un nuevo producto  
app.post('/add-product', (req, res) => { 
    const productName = req.body.prodName; 
    const price = req.body.price; 

    const query = 'INSERT INTO products (productName, productValue, available) VALUES (?, ?, 1)';

    pool.query(query, [productName, price], (err, result) => { 
        if (err) throw err; 
        res.send('Agregado exitosamente'); 
    }); 
}); 

//Ruta para llamar a los productos
app.get('/api/productos', (req, res) => { 
    const query = 'SELECT * FROM products'; 
    pool.query(query, (err, results) => { 
        if (err) throw err; 
        res.json(results); 
    }); 
});

//Ruta para llamar a los productos DISPONIBLES
app.get('/api/productos/available', (req, res) => { 
  console.log('consultamos bd')
  const query = 'SELECT * FROM products WHERE available = 1'; 
  pool.query(query, (err, results) => { 
      if (err) throw err; 
      res.json(results); 
  }); 
});

//Ruta para eliminar un producto
app.delete('/delete-product/:id', (req, res) => {
  const productId = req.params.id;
  
  const query = 'DELETE FROM products WHERE idProduct = ?';
  
  pool.query(query, [productId], (err, result) => {
      if (err) {
          res.status(500).json({ message: 'Error al eliminar el producto' });
      } else {
          res.json({ message: 'Producto eliminado con éxito' });
      }
  });
});

//Ejecutamos servidor
app.listen(65002, () => { //65002 es el puerto SSH que me brindó Hostinger
  console.log('Servidor iniciado en el puerto 65002');
});
