const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')

app.db = router.db

app.use(auth)
app.use(router)
app.listen(30124, () => {
  console.log('JSON Server is running on', 30124)
})
