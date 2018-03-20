import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import 'dotenv/config'
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDp9XFBAVwxTBarTwXat_5NL5y24qXAuG4",
  authDomain: "select-topic-db.firebaseapp.com",
  databaseURL: "https://select-topic-db.firebaseio.com",
  projectId: "select-topic-db",
  storageBucket: "select-topic-db.appspot.com",
  messagingSenderId: "610379384643"
}

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

firebase.initializeApp(config)

router.get('/', async function (context) {
  let database = firebase.database()
  let data = []
  await database.ref('traffic').once('value')
  .then( snapshot => {
    data = snapshot.val()
  })
  context.body = data
})

app.use(router.routes())
app.use(router.allowedMethods())

console.log('App listen at PORT '+process.env.PORT)
app.listen(process.env.PORT)
