import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('this is working')
})

app.listen(3000, () => {
  console.log('all good')
})

/* 

/ ~~> res = this is working

ideally we always want to have passwords sent in a POST
/signin ~~> POST = success/fail
/register ~~> POST = new user
/profile/:userid ~~> GET = user
/image ~~> PUT = user  

*/