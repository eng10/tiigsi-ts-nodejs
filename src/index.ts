import express, { Request, Response } from 'express'

const app = express()
const port = 5000
app.use(express.json())

interface Data {
  id: number
  userName: string
  email: string
  password: string
  Role: string
}

const data: Data[] = [
  {
    id: 3,
    userName: 'cumar',
    email: 'cumar@cumar.com',
    password: 'user',
    Role: '1234',
  },
  {
    id: 2,
    userName: 'cabdi',
    email: 'cabdi@cabdi.com',
    password: '1234',
    Role: 'User',
  },
  {
    id: 1,
    userName: 'cali',
    email: 'cali@cali.com',
    password: 'admin',
    Role: 'Admin',
  },
]

app.get('/all', async (req: Request, res: Response) => {
  res.json({
    isSuccess: true,
    result: [...data],
  })
})

app.post('/add', (req: Request, res: Response) => {
  const newData: Data = req.body

  const { Role, email, id, password, userName } = newData

  if (!Role || !email || !id || !password || !userName) {
    return res.status(400).json({
      message: 'please provide info!!',
      isSuccess: false,
    })
  }

  const isEmailTaken = (email: string) => {
    return data.some((user) => user.email === email)
  }

  if (isEmailTaken(email)) {
    return res.status(401).json({
      message: 'email is already taken',
      isSuccess: false,
    })
  }
  const isIdTaken = (id: number) => {
    return data.some((user) => user.id === id)
  }

  if (isIdTaken(id)) {
    return res.status(401).json({
      message: 'ID is already taken',
      isSuccess: false,
    })
  }

  res.json({
    result: data.push(newData),
    data: newData,
    isSuccess: true,
  })
})

app.put('/update/:id', (req: Request, res: Response) => {
  try {
    const id = +req.params.id
    const { userName, email } = req.body

    const user = data.find((u) => u.id === id)

    if (!user) {
      return res.status(400).json({
        message: 'user not found',
        isSuccess: false,
      })
    }

    const checkEmail = (email: string) => {
      return data.some((user) => user.email === email)
    }

    if (checkEmail(email)) {
      return res.json({
        message: 'user email is already exist!!',
        isSuccess: false,
      })
    }

    if (userName) user.userName = userName
    if (email) user.email = email

    // data.push(user)

    res.json({
      result: { ...user },
      isSuccess: true,
    })
  } catch (error) {
    error
  }
})

app.delete('/delete/:id', (req: Request, res: Response) => {
  const id = +req.params.id
  const user = data.findIndex((user) => user.id)
  if (user === -1) {
    return res.status(400).json({
      
      message: `${id} user is not found!!`,
      isSuccess: false,
    })
  }
  const deleteUser = data.splice(+user, 1)[0]
  res.json({
    result: {
      ...deleteUser,
    },
    isSuccess: false,
  })
})

app.listen(port, () => console.log(`server is running on port ${port}`))
