import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'

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
    },
  ],
  login: [
    {
      id: 234,
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  return res.send(db.users)
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body

  if (email === db.users[2].email) {
    bcrypt.compare(password, db.users[2].password, function(err, result) {
      if (!err && result) {
        return res.json(db.users[2])
      } else {
        return res.status(400).json('Failed logging in with password')
      }
    })
  } else {
    return res.status(400).json('Failed getting email.')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  const saltRounds = 10

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (!err) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (!err) {
          db.users.push({
              id: '125',
              name: name,
              email: email,
              password: hash,
              entries: 0,
              joined: new Date()
          })
          
          return res.json(db.users[db.users.length - 1])
        } else {
          return res.status(500).json({error: "Failed to process Password."})
        }
      })
    } else {
      return res.status(500).json({error: "Failed to process Password."})
    }
  })
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