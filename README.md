School Locator API
==================

This is a **Node.js** and **Express** based backend API that allows users to add schools and retrieve a list of nearby schools based on their geographical location.

Features
--------

-   🌍 **Add a school** with name, address, latitude, and longitude.

-   📍 **List all schools** sorted by distance from the given coordinates.

-   ⚡ **Fast and efficient** location-based filtering using the Haversine formula.

-   🛠️ Built with **Express.js**, **MongoDB (or another DB for storage)**, and **CORS support**.

Installation
------------

1.  Clone the repository:

    ```
    git clone https://github.com/ChetanSingh14/Edu-Assignment
    cd school-management-api
    ```

2.  Install dependencies:

    ```
    npm install
    ```

3.  Create a `.env` file and set the following environment variable:

    ```
    PORT=6100
    ```

4.  Start the server:

    ```
    npm start
    ```

* * * * *

API Endpoints
-------------

### 1️⃣ Add a School

**Endpoint:**

```
POST /api/schools/addSchool
```

**Request Body (JSON):**

```
{
    "name": "Greenwood High School",
    "address": "123 Main Street, Cityville",
    "latitude": 12.9716,
    "longitude": 77.5946
}
```

**Response (201 Created):**

```
{
    "message": "School added successfully",
    "schoolId": 1
}
```

**Possible Errors:**

-   **400 Bad Request**: Missing or invalid input fields.

* * * * *

### 2️⃣ List Schools Near a Location

**Endpoint:**

```
GET /api/schools/listSchools?latitude=12.9716&longitude=77.5946
```

**Response (200 OK):**

```
[
    {
        "id": 1,
        "name": "Greenwood High School",
        "address": "123 Main Street, Cityville",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "distance": 0.0
    },
    {
        "id": 2,
        "name": "Blue Ridge School",
        "address": "456 Hill Road, Cityville",
        "latitude": 12.9750,
        "longitude": 77.6000,
        "distance": 1.2
    }
]
```

**Possible Errors:**

-   **400 Bad Request**: Missing or invalid query parameters.

-   **404 Not Found**: No schools found.

* * * * *

Test Data for API
-----------------

Use the following data to test the **Add School** API:

```
{
    "name": "Blue Ridge School",
    "address": "456 Hill Road, Cityville",
    "latitude": 12.9750,
    "longitude": 77.6000
}
```

Then, test the **List Schools** API with:

```
GET /api/schools/listSchools?latitude=12.9716&longitude=77.5946
```

* * * * *

Tech Stack
----------

-   **Node.js** - Backend runtime environment

-   **Express.js** - Web framework for Node.js

-   **MongoDB / SQL** - Database to store school details

-   **CORS** - Cross-Origin Resource Sharing support

* * * * *

Running in Development Mode
---------------------------

You can run the server in **watch mode** using **nodemon**:

```
npm install -g nodemon
nodemon index.js
```

* * * * *

License
-------

This project is licensed under the **MIT License**. Feel free to use and modify it!