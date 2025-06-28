const app = require('./app')
const connectDB = require('./configs/db')

const PORT = process.env.PORT;

// connect to DB
connectDB()

app.listen(PORT, () => {
    console.log(`server is running on Port : ${PORT}`)
})
 