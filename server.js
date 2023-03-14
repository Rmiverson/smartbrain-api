import express from 'express'

const app = express()

const db = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '123',
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send(db.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
    res.json('Successs')
  } else {
    res.status(400).json('Error loggin in.')
  }
  
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  db.users.push({
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
  })
  res.json(db.users[db.users.length - 1])
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