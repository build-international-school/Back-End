# API
base URL: https://issw.herokuapp.com/api

## Authentication
### Registration:
POST "/auth/register"

Request Body:
```
    {
        "password": string (8 char min - required),
        "email": string (must include '@' and '.' - required),
        "first_name": string (required),
        "last_name": string (required),
        "type": string ('admin' or 'worker' - required)
    }
```

Response Body:
```
    {
        "id": integer (primary key for 'users' table),
        "first_name": string,
        "last_name": string,
        "email": string,
        "phone": string,
        "organization": string,
        "token": string (will be required for protected routes)
    }
  
```

### Login
POST "/auth/login"

Request Body:
```
    {
        "email": string
        "password": string,
    }
```

Response Body:
```
    {
        "id": integer (primary key for 'users' table),
        "first_name": string,
        "last_name": string,
        "email": string,
        "password": string (hashed),
        "phone": string,
        "organization": string,
        "token": string
    }
```

## Admins
 
 ### Create Student:
 POST to ``` https://issw.herokuapp.com/api/admins/:id/students```
 where id is the admin's user id.

 Request Body:
 ```
    {
        "first_name": string,
        "last_name": "string,
        "grade": "First",
        "address": string,
        "img_url": string,
        "background": string,
        "status": string,
        "age": string,
        "insurance": true/false,
        "exp_date": string,
        "birth_certificate": true/false,
        "special_needs": string,
        "representative_name": string,
        "representative_contact": string,
    }
 ```

 Response Body:
 
    {
        "id": (student id)
        "first_name": string,
        "last_name": "string,
        "grade": "First",
        "address": string,
        "img_url": string,
        "background": string,
        "status": string,
        "age": string,
        "insurance": true/false,
        "exp_date": string,
        "birth_certificate": true/false,
        "special_needs": string,
        "representative_name": string,
        "representative_contact": string,
        "admin_id": (admin id)
    }

### Update Student
PUT to ```https://issw.herokuapp.com/api/admins/:id/students```

Request Body:
```
    {
        "first_name": string,
        "last_name": "string,
        "grade": "First",
        "address": string,
        "img_url": string,
        "background": string,
        "status": string,
        "age": string,
        "insurance": true/false,
        "exp_date": string,
        "birth_certificate": true/false,
        "special_needs": string,
        "representative_name": string,
        "representative_contact": string,
    }
```
 
## Workers
### Get List of workers:
GET to ```https://issw.herokuapp.com/api/workers```


Response Body:
```
[
  {

  },
  ...
]
```

### Get List of workers by id:
GET to ```https://issw.herokuapp.com/api/workers/:id```
where id is worker id

Response Body:
```
[
  {

  },
  ...
]
```

## Students
### Get List of students:
GET to ```https://issw.herokuapp.com/api/students```


Response Body:
```
[
  {
      
  },
  ...
]
```
### Get List of students by id:
GET to ```https://issw.herokuapp.com/api/students/:id```
where id is student id

Response Body:
```
[
  {

  },
  ...
]
```