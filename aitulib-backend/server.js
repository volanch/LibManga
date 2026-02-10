require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const connectToDB = require('./config/dbConfig')
const errorHandler = require('./middlewares/errorHandler')

const mangaRouter = require('./routes/mangaRoutes')
const userRouter = require('./routes/userRoutes')
const chapterRouter = require('./routes/chapterRoutes')
const commentRouter = require('./routes/commentRoutes')
const authRouter = require('./routes/authRoutes')
const mainRouteri = require('./routes/mainRouter')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/manga', mangaRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/chapters', chapterRouter)
app.use('/api/comments', commentRouter)
app.use('/', mainRouteri)

const VIEWS_DIR = path.join(__dirname, 'views')
app.get('/:page', (req, res, next) => {
  const page = req.params.page

  if (!page.endsWith('.html')) return next()

  const safeName = path.basename(page) // защита от ../
  const filePath = path.join(VIEWS_DIR, safeName)

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath)
  }

  return next()
})

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signin.html'))
})
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use(errorHandler)

connectToDB()

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})
