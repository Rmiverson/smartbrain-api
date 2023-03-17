import express from 'express'

const app = express()

const db = {
  users: [
    {
      id: 123,
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: 124,
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
  return res.send(db.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
    return res.json('Successs')
  } else {
    return res.status(400).json('Error loggin in.')
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
  
  return res.json(db.users[db.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const id = parseInt(req.params.id)
  let found = false

  db.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    } 
  })

  if (!found) {
    return res.status(400).json('not found')
  }
})

app.post('/image', (req, res) => {
  const { id } = req.body
  let found = false

  db.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    } 
  })

  if (!found) {
    return res.status(400).json('not found')
  }
})

app.listen(3000, () => {
  console.log('all good')
})