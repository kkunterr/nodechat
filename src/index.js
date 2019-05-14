const path = require('path');
const express = require('express');
const chat = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');

chat.use(express.static(publicDirectory));
chat.listen(port, () => {
    console.log(`Server jookseb port ${port} peal`);
});





