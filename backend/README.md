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

If request is not authorized, the response will be 403.


**Note: `<callback_url>` is a URL that the verification request is sent to. Suppose this URL refers to a page in frontend with url `/2020/payment/verify`. Then, after **


### Note
- `<year>` is necessary for requests.