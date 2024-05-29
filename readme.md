**Get all users**
_GET_
_Authorization required_
Authorization: `token`

`http://localhost:3000/auth/`

**Register New User**
_POST_
`http://localhost:3000/auth/register`

```json
{
  "username": "user2",
  "usermail": "user2@a.com",
  "password": "password"
}
```

**Login**
_POST_
`http://localhost:3000/auth/login`

```json
{
  "usermail": "user4@a.com",
  "password": "password"
}
```
