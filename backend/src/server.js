import express from 'express'
import router from './route/router.js'
import dotenv from 'dotenv'
import Database from './configuration/database.js'
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/notes', router)
Database().then(() => {
    app.listen(PORT, () => {
        `server is running on PORT ${PORT}`
    })
})
