FORMAT: 1A

# Habit App Documentation
An example of API documentation using [API Blueprint](https://apiblueprint.org).

#Group Habit App

## Habits [/habitaction/{_id}]

### Retrieve a list of Habits [GET]

| Property | Type | Description |
|----------|------|-------------|
| title | String | Title of the habit |
| description | String | Description of the habit |
| date | Datetime | Date of the habit added |
| streakcounter | Number | days of consecutive habit performed |
| startdate | String | Title of the habit starting |
| habitBy: _id | String | ID of the user who created habit |
| habitBy: firstname | String | First name of the user who created habit |
| habitBy: lastname | String | Last name of the user who created habit |
| habitBy: email | String | Email of the user who created habit |

+ Response 200 (application/json)
    + Body

            [{
              "habitBy": [{
                "_id": "5ac457345a5dbf572ca1862d",
                "firstname": "firstname",
                "lastname": "lastname",
                "email": "test1@gmail.com"
              }],
            "streakcounter": 1,
            "startdate": "2018-04-02T22:45:23.653Z",
            "date": "2018-04-02T22:45:23.653Z",
            "_id": "5ac2b283d3925266ecedcd08",
            "title": "This would be your habit",
            "description": "More details about habit",
            "createdAt": "2018-04-02T22:45:23.658Z",
            "__v": 0
                }]

### Retrieve list of Habits by User [GET]
+ Parameters
  + _id: 58209f22dd0707323f0f092e (string) - The User's Unique ID.

+ Response 200 (application/json)
    + Body

            [{
              "habitBy": [{
                "_id": "5ac457345a5dbf572ca1862d",
                "firstname": "firstname",
                "lastname": "lastname",
                "email": "test1@gmail.com"
              }],
            "streakcounter": 1,
            "startdate": "2018-04-02T22:45:23.653Z",
            "date": "2018-04-02T22:45:23.653Z",
            "_id": "5ac2b283d3925266ecedcd08",
            "title": "This would be your habit",
            "description": "More details about habit",
            "createdAt": "2018-04-02T22:45:23.658Z",
            "__v": 0
                }]
            [{
              "habitBy": [{
                "_id": "5ac457345a5dbf572ca1862d",
                "firstname": "firstname",
                "lastname": "lastname",
                "email": "test1@gmail.com"
              }],
            "streakcounter": 1,
            "startdate": "2018-04-02T22:45:23.653Z",
            "date": "2018-04-02T22:45:23.653Z",
            "_id": "5ac2b283d3925266ecedcd08",
            "title": "This would be your habit 2",
            "description": "More details about habit 2",
            "createdAt": "2018-04-02T22:45:23.658Z",
            "__v": 0
                }]


### Create a Habit [POST]

| Property | Type | Description |
|----------|------|-------------|
| title | String | Title of the habit |
| description | String | Description of the habit |
| date | Datetime | Date of the habit added |
| streakcounter | Number | days of consecutive habit performed |
| startdate | String | Title of the habit starting |
| habitBy | String | ID of the user who created habit |

+ Request (application/json)

            {
              "title": "New Habit",
              "description": "Lorem Ipsum",
            }

+ Response 201

### Update a Habit [PUT]
+ Parameters

  + _id: 58209f22dd0707323f0f092e (string) - An unique identifier of the thing.

+ Request (application/json)

            {
              "title": "New Habit",
              "description": "Lorem Ipsum"
            }

+ Response 200
+ Response 404

### Remove a Habit [DELETE]
+ Parameters

  + _id: 58209f22dd0707323f0f092e (string) - An unique identifier of the thing.

+ Response 200
