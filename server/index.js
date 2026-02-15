const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');
const connectDB  = require("./connection")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



connectDB("mongodb://localhost:27017/club-event").then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.error("MongoDB connection error:", err);
})
// Routes (Placeholder)
app.get('/', (req, res) => {
    res.send('CampusPulse API Running');
});

// Import Routes
const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');


app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
