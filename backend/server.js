const fs = require('fs');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors());

const dbUrl = "mongodb+srv://sreeharsha:u1pfUuAvuP9zm4eR@cluster0.dwdyork.mongodb.net/api_visualization";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(dbUrl, connectionParams).then(()=>{
    console.log("connected to db")
}).catch((e)=>{
    console.log("Error", e);
});

const collection_name = "Processors";

/* Original code */

// app.get("/api", (req, res) => {
//     fs.readFile('/Users/saisreeharsha/Desktop/CUDA/Coding Assessment - Data Visualization/API_DATA.json', (err, data) => {
//         if (err) {
//             console.error('Error reading JSON file:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         try {
//             const jsonData = JSON.parse(data);
//             return res.json(jsonData);
//         } catch (error) {
//             console.error('Error parsing JSON:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//     });
// });

app.get("/api", async (req, res) => {
    try {
        // Fetch data from MongoDB using Mongoose
        const data = await mongoose.connection.db.collection(collection_name).find({}).toArray();
        return res.json(data[0]);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// app.get('/api/data', (req, res) => {
//     const page = parseInt(req.query.page) || 1; 
//     const pageSize = 100;
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;

//     fs.readFile('/Users/saisreeharsha/Desktop/CUDA/Coding Assessment - Data Visualization/API_DATA.json', (err, data) => {
//         if (err) {
//             console.error('Error reading JSON file:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         try {
//             const jsonData = JSON.parse(data);
//             const paginatedData = Object.values(jsonData).slice(startIndex, endIndex);
//             res.json(paginatedData);
//         } catch (error) {
//             console.error('Error parsing JSON:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//     });
// });



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
