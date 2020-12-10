# WSS backend API documentation

## Map the old style (`Jinja2`) to `GET` requests:
- Primitive fields of WSS
    Fields:
    - `main_image_url`
    - `main_clip_url`
    - `booklet_url`
    - `staff_count`
    - `is_active`
    - `is_registration_open`
    - `participants_count`
    - `ical_link`
    - `year`
    - `start_date`
    - `proposal_link`
    - `show_stats`
    - `registration_fee`
    - `calendar_link`

    For getting the above fields, just send a `GET` request to URL `/api/<year>/wss`

- Model Lists of WSS
   Lists:
    - `workshops`
    - `seminars`
    - `postersessions`
    - `sponsors`
    - `sponsorships`
    - `clips`
    - `holding_teams`
    - `images`
    - `tags`
    - `announcements`
    - `venues`
    - `speakers`
    - `seminar_materials`
    - `workshop_materials`
    - `poster_materials`
    - `staff`

    Get the whole list:

    ```HTTP
    GET /api/<year>/<list_name>/
    ```

   Get an entity by primary key:

    ```HTTP
    GET /api/<year>/<list_name>/<pk>
    ```

    Get count of the list:

    ```HTTP
    GET /api/<year>/<list_name>/count
    ```

    ### Note
    
    - To get `keynote` and `non_keynote` seminars, just add a query parameter `keynote` as a flag at the end of the URL. example:
   
        Get `keynote` seminars:

        ```HTTP
        GET /api/<year>/seminars?keynote=1
        ```

       Get the count of `non_keynote` seminars:

        ```HTTP
        GET /api/<year>/seminars/count?keynote=0
        ```

    - To get `main` and `non_main` sponsorships, just add a query parameter `main` as a flag at the end of the URL. example:
   
        Get `non_main` sponsorships:

        ```HTTP
        GET /api/<year>/sponsorships?main=0
        ```

       Get the count of `main` sponsorships:

        ```HTTP
        GET /api/<year>/sponsorships/count?main=1
        ```

## Payment API:

Sending payment request:

```HTTP
GET /api/<year>/payment/request?callback=<callback_url>
```

- If request is not authorized, the response will be 403.
- If `<year>` is not valid, the response will be 404.
- If the registration for given `<year>` is closed, the response will be as shown bellow:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "Sorry, the registration has been ended."
    }
    ```
- If the `<callback_url>` parameter is not passed as query string, thr response will be as bellow:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "`callback` should be passed in query string"
    }
    ```
- If the user already has finished their payment for given `<year>`, the response will be as bellow:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "You already have finished your payment."
    }
    ```
- If user's profile does not finished its payment, the response will be as bellow:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "You must specify your grade in your profile before registration."
    }
    ```
- If the registration's capacity is full, the response will be as bellow:

    ```HTTP
    HTTP 403 Bad Request
    Content-Type: application/json

    {
        "message": "Sorry, WSS <year> has no more registration capacity."
    }
    ```
- If some error occurs in sending payment request, the response will be as bellow:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "An error occured!",
        "code": <code_of_error>
    }
    ```
- And finally, if there's no errors, The response will be as bellow:

    ```HTTP
    HTTP 200 OK
    Content-Type: application/json

    {
        "redirect_url": <redirect_url>
    }
    ```

    And the client should be redirected to given `<redirect_url>`.

Then, the user is redirected to payment page, and after payment, the given `<callback_url>` will be called as bellow (the values are just examples):

```HTTP
GET <callback_url>?Authority=00000167354&Status=OK
```

And the frontend should call verification API as bellow:
```HTTP
GET /api/<year>/payment/verify?Authority=00000167354&Status=OK
```

- If request is not authorized, the response will be 403.
- If `<year>` is not valid, the response will be 404.
- If the registration for given `<year>` is closed, the response will be as shown bellow:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "Sorry, the registration has been ended."
    }
    ```
- If the user already has finished their payment for given `<year>`, the response will be as bellow:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "You already have finished your payment."
    }
    ```
- If the verification is fine and there's no problem, the response will be as bellow:

    ```HTTP
    HTTP 200 OK
    Content-Type: application/json

    {
        "message": "OK",
        "RefID": <refID of transaction>
    }
    ```
- Else, the response may be one of below responses:

    This Transaction is already submitted by someone and is no more valid:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "status": "ALREADY SUBMITTED"
    }
    ```

    The trainsaction failed:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "FAILED",
        "status": <status_code>
    }
    ```

    The transaction is failed or cancelled:

    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json

    {
        "message": "FAILED|CANCELLED"
    }
    ```


### Note
- `<year>` is necessary for requests.

## Authentication API
### Register
Allows POST requests containing username, password and email (application/json)
  - Example:
  ```HTTP
  POST /api/register/
  {
    "username": "testUser",
    "password": "testUser",
    "email": "test@test.test"
  }
  ```
  - Success
    - If no field is malformatted or missing and the username isn't already used, the response will be like this:
    ```HTTP
    HTTP 200 OK
    {
    "user": {
        "id": 1,
        "username": "testUser",
        "email": "test@test.test"
    },
    "token": "a5bd6e4d524366b2b7952d68916725fe6f5f1cab5bc0bb0ccd20b077ca2d3d63"
    }
    ```
  - Failure
    - If username is already taken, the response will be something like this:
    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json
    {
        "username": [
            "A user with that username already exists."
        ]
    }
    ```
    - If a user with the email address already exists, the response will be something like this:
    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json
    {
        "email": [
            "user with this email address already exists."
        ]
    }
    ```
    - If the email isn't valid , the response will be as shown below:
    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json
    {
        "email": [
            "Enter a valid email address."
        ]
    }
    ```
    - If username isn't provided, the response will be like this:
    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json
    {
        "username": [
            "This field is required."
        ]
    }
    ```
    - If password isn't provided, the response will be like this:
    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json
    {
        "password": [
            "This field is required."
        ]
    }
    ```
### Login
Allows POST requests containing username and password (application/json)
  - Example:
  ```HTTP
  POST /api/login/
  {
    "username": "testUser",
    "password": "testUser"
  }
  ```
  - Success
    - If there's nothing wrong, the response will be like this:
    ```HTTP
    HTTP 200 OK
    Content-Type: application/json
    {
        "expiry": "2020-11-25T00:32:52.122115Z",
        "token": "306a694898caf75366777452edc91132b74663ad2065f9923d0f6cb9cc5c43de"
    }
    ```
  - Failure
    - If no user exists having the provided information, the response will be like this:
    ```HTTP
    HTTP 400 Bad Request
    Content-Type: application/json
    {
        "non_field_errors": [
            "Unable to log in with provided credentials."
        ]
    }
    ```
### Logout
Allows a POST request containing an Authorization header
  - Example
  ```HTTP
  POST /api/logout/
  Authorization: Token b236f6c76fd603712a57e56eeb71e20f59bac0e42e897bc913afcf46566ede4c
  ```
  - Success
  ```HTTP
  HTTP 204 No Content
  ```
  - Failure
      - If the header isn't provided:
      ```HTTP
      HTTP 401 Unauthorized
      {
          "detail": "Authentication credentials were not provided."
      }
      ```
      - If the token is invalid (doesn't match the client's login token) or has expired:
      ```HTTP
      HTTP 401 Unauthorized
      {
          "detail": "Invalid token."
      }
      ```
  - Note:
      - Tokens expire after 10 hours (which can be modified)
  


## User Profile APIs

These API set is authorized, i.e. the user should be logged in to use these APIs.

### Get Profile Info

Returns currently logged in user profile info.

```HTTP
GET /api/profile
```

Which returns:

```HTTP
HTTP 200 OK
Content-Type: application/json
{
    "username": "the_user",
    "email": "the_user@gmail.com",
    "first_name": "The",
    "last_name": "User",
    "phone_number": "09123456789",
    "age": 22,
    "job": "The Job",
    "university": "The University",
    "introduction_method": "poster",
    "gender": "male",
    "city": "Tehran",
    "country": "Iran",
    "field_of_interest": "",
    "grade": "bsOrOther",
    "is_student": true,
    "favorite_tags": [
        "Tag1",
        "Tag2"
    ]
}
```

### Update User Profile

This API updates currently logged in profile info. **Note that only fields that need to be changed should be sent.**

Modifiable fields:

- `first_name`
- `last_name`
- `phone_number`
- `age`
- `job`
- `university`
- `introduction_method`
- `gender`
- `city`
- `country`
- `field_of_interest`
- `grade`
- `is_student`

An Example to change the user name and last name:

```HTTP
PUT /api/profile/edit
{
    "first_name": "The First Name",
    "last_name": "The Last Name"
}
```

Which returns the updated user profile as shown bellow:

```HTTP
HTTP 200 OK
Content-Type: application/json
{
    "username": "the_user",
    "email": "the_user@gmail.com",
    "first_name": "The First Name",
    "last_name": "The Last Name",
    "phone_number": "09123456789",
    "age": 22,
    "job": "The Job",
    "university": "The University",
    "introduction_method": "poster",
    "gender": "male",
    "city": "Tehran",
    "country": "Iran",
    "field_of_interest": "",
    "grade": "bsOrOther",
    "is_student": true,
    "favorite_tags": [
        "Tag1",
        "Tag2"
    ]
}
```

### Add a favourite tag

This API adds the given tag to user's favourite tags.

```HTTP
POST /api/profile/add_favorite_tag?year=2020&tag=Tag3
```

If the given tag is already in user's list, the response will be:

```HTTP
HTTP 400 Bad Request
Content-Type: application/json
{
    "message": "this tag is already in your list!"
}
```

Otherwize, returns the updated user profile as shown bellow:
```HTTP
HTTP 200 OK
{
    "username": "the_user",
    "email": "the_user@gmail.com",
    "first_name": "The First Name",
    "last_name": "The Last Name",
    "phone_number": "09123456789",
    "age": 22,
    "job": "The Job",
    "university": "The University",
    "introduction_method": "poster",
    "gender": "male",
    "city": "Tehran",
    "country": "Iran",
    "field_of_interest": "",
    "grade": "bsOrOther",
    "is_student": true,
    "favorite_tags": [
        "Tag1",
        "Tag2",
        "Tag3"
    ]
}
```

### Remove a favourite tag

Removes the given tag from user's list

```HTTP
DELETE /api/profile/remove_favorite_tag?tag=Tag3
```

Which returns the updated user profile as shown bellow:
```HTTP
HTTP 200 OK
{
    "username": "the_user",
    "email": "the_user@gmail.com",
    "first_name": "The First Name",
    "last_name": "The Last Name",
    "phone_number": "09123456789",
    "age": 22,
    "job": "The Job",
    "university": "The University",
    "introduction_method": "poster",
    "gender": "male",
    "city": "Tehran",
    "country": "Iran",
    "field_of_interest": "",
    "grade": "bsOrOther",
    "is_student": true,
    "favorite_tags": [
        "Tag1",
        "Tag2"
    ]
}
```

### Check if user is participant of a WSS

```HTTP
GET /api/profile/is_registered/?year=<year>
```

If year is null, response is:

```HTTP
HTTP 400 Bad Request
{
    'message': '`year` should be passed in query string.'
}
```

else:
```HTTP
HTTP 200 OK
{
    'is_registered': true
}
```