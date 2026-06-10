require('dotenv').config();
const connectDB = require('../src/db/db.js');

const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.listen(PORT, () =>{
        console.log(`Server is running on PORT ${PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection Failed !!",error)
})