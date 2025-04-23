const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist/3-dprinting-store')));

// Manejar todas las rutas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/3-dprinting-store', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));