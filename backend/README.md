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
    - `calendar_link`

    For getting the above fields, just send a `GET` request to URL `/api/<year>/wss`

- Model Lists of WSS
   Lists:
    - `workshops`
    - `seminars`
    - `postersessions`
    - `sponsorships`
    - `clips`
    - `holding_teams`
    - `images`

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
        "message": "`callback_url` should be passed in query string"
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