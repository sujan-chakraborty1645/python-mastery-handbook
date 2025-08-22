# Web APIs with Python

Building and consuming web APIs using Python

## Introduction to Web APIs

Web APIs (Application Programming Interfaces) allow applications to communicate with each other over the internet. Python offers several libraries for both consuming external APIs and creating your own API services.

```python
# Simple API request using the requests library
import requests

response = requests.get("https://api.github.com/users/python")
user_data = response.json()

print(f"GitHub User: {user_data['login']}")
print(f"Name: {user_data.get('name', 'N/A')}")
print(f"Followers: {user_data['followers']}")
```

### JavaScript Comparison

```javascript
// JavaScript equivalent using fetch
async function getGitHubUser() {
    const response = await fetch("https://api.github.com/users/python");
    const userData = await response.json();
    
    console.log(`GitHub User: ${userData.login}`);
    console.log(`Name: ${userData.name || 'N/A'}`);
    console.log(`Followers: ${userData.followers}`);
}

getGitHubUser();
```

## Consuming RESTful APIs

Python's `requests` library makes it easy to work with RESTful APIs:

```python
import requests

# GET request (retrieve data)
def get_todos():
    response = requests.get("https://jsonplaceholder.typicode.com/todos")
    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}"

# POST request (create data)
def create_todo(title, completed=False):
    new_todo = {
        "title": title,
        "completed": completed,
        "userId": 1  # Example user ID
    }
    response = requests.post(
        "https://jsonplaceholder.typicode.com/todos",
        json=new_todo
    )
    return response.json()

# PUT request (update data)
def update_todo(todo_id, title, completed):
    updated_todo = {
        "title": title,
        "completed": completed,
        "userId": 1
    }
    response = requests.put(
        f"https://jsonplaceholder.typicode.com/todos/{todo_id}",
        json=updated_todo
    )
    return response.json()

# DELETE request (delete data)
def delete_todo(todo_id):
    response = requests.delete(
        f"https://jsonplaceholder.typicode.com/todos/{todo_id}"
    )
    return response.status_code == 200

# Example usage
todos = get_todos()
print(f"Total todos: {len(todos)}")

new_todo = create_todo("Learn Python API development")
print(f"Created todo: {new_todo}")

updated_todo = update_todo(1, "Updated todo", True)
print(f"Updated todo: {updated_todo}")

success = delete_todo(1)
print(f"Delete successful: {success}")
```

### JavaScript Comparison

```javascript
// JavaScript equivalent using fetch
async function getTodos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (response.ok) {
        return await response.json();
    } else {
        return `Error: ${response.status}`;
    }
}

async function createTodo(title, completed = false) {
    const newTodo = {
        title,
        completed,
        userId: 1
    };
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo)
    });
    return await response.json();
}

async function updateTodo(todoId, title, completed) {
    const updatedTodo = {
        title,
        completed,
        userId: 1
    };
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo)
    });
    return await response.json();
}

async function deleteTodo(todoId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: "DELETE"
    });
    return response.ok;
}
```

## Working with Authentication

Many APIs require authentication. Here's how to handle common auth methods:

```python
import requests
from requests.auth import HTTPBasicAuth

# Basic Authentication
def basic_auth_example():
    response = requests.get(
        "https://api.example.com/data",
        auth=HTTPBasicAuth("username", "password")
    )
    return response.json()

# API Key Authentication
def api_key_example():
    # API key in query parameter
    response = requests.get(
        "https://api.example.com/data",
        params={"api_key": "your_api_key"}
    )
    
    # API key in header (more common)
    headers = {"X-API-Key": "your_api_key"}
    response = requests.get(
        "https://api.example.com/data",
        headers=headers
    )
    
    return response.json()

# OAuth 2.0 (Token-based Authentication)
def oauth_example(access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(
        "https://api.example.com/user/profile",
        headers=headers
    )
    return response.json()
```

### JavaScript Comparison

```javascript
// JavaScript equivalent
async function basicAuthExample() {
    const credentials = btoa("username:password");
    const response = await fetch("https://api.example.com/data", {
        headers: { "Authorization": `Basic ${credentials}` }
    });
    return await response.json();
}

async function apiKeyExample() {
    // API key in header
    const response = await fetch("https://api.example.com/data", {
        headers: { "X-API-Key": "your_api_key" }
    });
    return await response.json();
}

async function oauthExample(accessToken) {
    const response = await fetch("https://api.example.com/user/profile", {
        headers: { "Authorization": `Bearer ${accessToken}` }
    });
    return await response.json();
}
```

## Handling API Responses

API responses need proper error handling and parsing:

```python
import requests

def safe_api_call(url, method="GET", **kwargs):
    """Make an API call with proper error handling"""
    try:
        if method.upper() == "GET":
            response = requests.get(url, **kwargs)
        elif method.upper() == "POST":
            response = requests.post(url, **kwargs)
        elif method.upper() == "PUT":
            response = requests.put(url, **kwargs)
        elif method.upper() == "DELETE":
            response = requests.delete(url, **kwargs)
        else:
            return {"error": "Unsupported HTTP method"}
        
        # Check if the request was successful
        response.raise_for_status()
        
        # Check if response is JSON
        try:
            return response.json()
        except ValueError:
            # Not JSON, return text content
            return response.text
            
    except requests.exceptions.HTTPError as err:
        return {"error": f"HTTP Error: {err}"}
    except requests.exceptions.ConnectionError:
        return {"error": "Connection Error"}
    except requests.exceptions.Timeout:
        return {"error": "Timeout Error"}
    except requests.exceptions.RequestException as err:
        return {"error": f"Request Error: {err}"}

# Example usage
result = safe_api_call("https://api.github.com/users/python")
if "error" in result:
    print(f"API call failed: {result['error']}")
else:
    print(f"API call succeeded: {result['name']}")
```

### JavaScript Comparison

```javascript
// JavaScript equivalent
async function safeApiFetch(url, method = "GET", options = {}) {
    try {
        const fetchOptions = {
            method: method.toUpperCase(),
            ...options
        };
        
        const response = await fetch(url, fetchOptions);
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        return { error: error.message };
    }
}
```

## Creating a RESTful API with Flask

Let's create a simple RESTful API using Flask:

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory database (replace with a real database in production)
todos = [
    {"id": 1, "title": "Learn Python", "completed": False},
    {"id": 2, "title": "Build API", "completed": False}
]

# GET all todos
@app.route("/todos", methods=["GET"])
def get_all_todos():
    return jsonify(todos)

# GET a specific todo
@app.route("/todos/<int:todo_id>", methods=["GET"])
def get_todo(todo_id):
    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo:
        return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404

# POST a new todo
@app.route("/todos", methods=["POST"])
def create_todo():
    if not request.json or "title" not in request.json:
        return jsonify({"error": "Title is required"}), 400
    
    new_id = max(todo["id"] for todo in todos) + 1 if todos else 1
    todo = {
        "id": new_id,
        "title": request.json["title"],
        "completed": request.json.get("completed", False)
    }
    todos.append(todo)
    return jsonify(todo), 201

# PUT (update) a todo
@app.route("/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if not todo:
        return jsonify({"error": "Todo not found"}), 404
    
    if not request.json:
        return jsonify({"error": "No data provided"}), 400
    
    todo["title"] = request.json.get("title", todo["title"])
    todo["completed"] = request.json.get("completed", todo["completed"])
    return jsonify(todo)

# DELETE a todo
@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    original_length = len(todos)
    todos = [todo for todo in todos if todo["id"] != todo_id]
    
    if len(todos) < original_length:
        return jsonify({"result": "Todo deleted"}), 200
    return jsonify({"error": "Todo not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
```

### JavaScript Comparison (Express.js)

```javascript
// JavaScript equivalent using Express.js
const express = require('express');
const app = express();
app.use(express.json());

// In-memory database
let todos = [
    {id: 1, title: "Learn JavaScript", completed: false},
    {id: 2, title: "Build API", completed: false}
];

// GET all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET a specific todo
app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({error: "Todo not found"});
    }
});

// POST a new todo
app.post('/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({error: "Title is required"});
    }
    
    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const todo = {
        id: newId,
        title: req.body.title,
        completed: req.body.completed || false
    };
    
    todos.push(todo);
    res.status(201).json(todo);
});

// Similar implementation for PUT and DELETE...
```

## Creating APIs with FastAPI

FastAPI is a modern, high-performance framework for building APIs:

```python
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

# Data model with type hints
class Todo(BaseModel):
    id: Optional[int] = None
    title: str
    completed: bool = False

# In-memory database
todos = [
    Todo(id=1, title="Learn Python", completed=False),
    Todo(id=2, title="Build API with FastAPI", completed=False)
]

@app.get("/todos", response_model=List[Todo])
def get_todos():
    return todos

@app.get("/todos/{todo_id}", response_model=Todo)
def get_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.post("/todos", response_model=Todo, status_code=status.HTTP_201_CREATED)
def create_todo(todo: Todo):
    # Generate new ID
    new_id = max(t.id for t in todos) + 1 if todos else 1
    new_todo = Todo(id=new_id, title=todo.title, completed=todo.completed)
    todos.append(new_todo)
    return new_todo

@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, updated_todo: Todo):
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            # Update but keep the same ID
            updated_todo.id = todo_id
            todos[i] = updated_todo
            return todos[i]
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int):
    global todos
    original_length = len(todos)
    todos = [t for t in todos if t.id != todo_id]
    
    if len(todos) == original_length:
        raise HTTPException(status_code=404, detail="Todo not found")

# Run with: uvicorn main:app --reload
```

## Working with Async APIs

Python's `asyncio` with `aiohttp` allows efficient async API requests:

```python
import asyncio
import aiohttp
import time

async def fetch_data(session, url):
    """Fetch data from a URL asynchronously"""
    async with session.get(url) as response:
        return await response.json()

async def fetch_multiple_urls(urls):
    """Fetch multiple URLs concurrently"""
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_data(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Example usage
async def main():
    # List of URLs to fetch
    urls = [
        f"https://jsonplaceholder.typicode.com/todos/{i}" 
        for i in range(1, 11)
    ]
    
    # Measure time for async requests
    start_time = time.time()
    results = await fetch_multiple_urls(urls)
    end_time = time.time()
    
    print(f"Fetched {len(results)} URLs in {end_time - start_time:.2f} seconds")
    
    # Print the titles of the first 3 todos
    for i, result in enumerate(results[:3]):
        print(f"Todo {i+1}: {result['title']}")

# Run the async function
if __name__ == "__main__":
    asyncio.run(main())
```

### JavaScript Comparison

```javascript
// JavaScript already has built-in async capabilities
async function fetchMultipleUrls(urls) {
    const promises = urls.map(url => 
        fetch(url).then(response => response.json())
    );
    return await Promise.all(promises);
}

async function main() {
    // List of URLs to fetch
    const urls = Array.from({length: 10}, (_, i) => 
        `https://jsonplaceholder.typicode.com/todos/${i+1}`
    );
    
    // Measure time for async requests
    const startTime = performance.now();
    const results = await fetchMultipleUrls(urls);
    const endTime = performance.now();
    
    console.log(`Fetched ${results.length} URLs in ${((endTime - startTime)/1000).toFixed(2)} seconds`);
    
    // Print the titles of the first 3 todos
    results.slice(0, 3).forEach((result, i) => {
        console.log(`Todo ${i+1}: ${result.title}`);
    });
}

main();
```

## API Testing with pytest

Testing your APIs is crucial. Here's how to test with pytest:

```python
import pytest
import requests
import json
from unittest import mock

# Function to test
def get_user_data(user_id):
    response = requests.get(f"https://jsonplaceholder.typicode.com/users/{user_id}")
    if response.status_code == 200:
        return response.json()
    return None

# Mock test using pytest and monkeypatch
def test_get_user_data(monkeypatch):
    # Mock response data
    mock_data = {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
    }
    
    # Create a mock response
    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code
            
        def json(self):
            return self.json_data
    
    # Define the mock get function
    def mock_get(*args, **kwargs):
        return MockResponse(mock_data, 200)
    
    # Apply the monkeypatch
    monkeypatch.setattr(requests, "get", mock_get)
    
    # Test the function with our mock
    result = get_user_data(1)
    assert result["name"] == "Leanne Graham"
    assert result["email"] == "Sincere@april.biz"

# Testing a real API (integration test)
def test_api_integration():
    # Make an actual API call (could be flaky if API is down)
    response = requests.get("https://jsonplaceholder.typicode.com/users/1")
    assert response.status_code == 200
    
    user = response.json()
    assert user["id"] == 1
    assert "name" in user
    assert "email" in user
```

## API Documentation with Swagger/OpenAPI

FastAPI automatically generates interactive API documentation:

```python
from fastapi import FastAPI, Path, Query, Body
from pydantic import BaseModel, Field
from typing import Optional, List

app = FastAPI(
    title="Todo API",
    description="A simple API for managing todos",
    version="1.0.0"
)

class TodoCreate(BaseModel):
    title: str = Field(..., description="The title of the todo", example="Learn FastAPI")
    completed: bool = Field(False, description="Whether the todo is completed")

class Todo(TodoCreate):
    id: int = Field(..., description="The unique identifier")

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "title": "Learn FastAPI",
                "completed": False
            }
        }

todos = []

@app.post(
    "/todos",
    response_model=Todo,
    status_code=201,
    summary="Create a new todo",
    description="Create a new todo item with the provided title and completion status"
)
def create_todo(todo: TodoCreate = Body(...)):
    """
    Create a new todo:
    
    - **title**: required string
    - **completed**: optional boolean, defaults to False
    
    Returns the created todo with a generated ID.
    """
    new_id = len(todos) + 1
    new_todo = Todo(id=new_id, title=todo.title, completed=todo.completed)
    todos.append(new_todo)
    return new_todo

@app.get(
    "/todos",
    response_model=List[Todo],
    summary="Get all todos",
    description="Retrieve a list of all todo items"
)
def get_todos(
    skip: int = Query(0, description="Number of items to skip"),
    limit: int = Query(10, description="Maximum number of items to return")
):
    return todos[skip:skip + limit]

# Access documentation at /docs or /redoc
```

## Rate Limiting and Throttling

Implementing rate limiting to protect your API:

```python
import time
from functools import wraps
from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory rate limiting store (use Redis in production)
rate_limits = {}

def rate_limit(limit=10, period=60):
    """
    Limit requests per client IP to `limit` per `period` seconds
    """
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            ip = request.remote_addr
            current_time = time.time()
            
            # Initialize or clean up old entries
            if ip not in rate_limits:
                rate_limits[ip] = []
            
            # Remove timestamps older than 'period'
            rate_limits[ip] = [
                timestamp for timestamp in rate_limits[ip]
                if current_time - timestamp < period
            ]
            
            # Check if limit is exceeded
            if len(rate_limits[ip]) >= limit:
                return jsonify({
                    "error": "Rate limit exceeded",
                    "retry_after": period - (current_time - rate_limits[ip][0])
                }), 429
            
            # Add timestamp for this request
            rate_limits[ip].append(current_time)
            
            # Process the request
            return f(*args, **kwargs)
        return wrapper
    return decorator

@app.route("/api/resource")
@rate_limit(limit=5, period=60)
def get_resource():
    return jsonify({"message": "API resource accessed"})

if __name__ == "__main__":
    app.run(debug=True)
```

## API Authentication with JWT

Implementing JWT (JSON Web Token) authentication:

```python
from flask import Flask, request, jsonify
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
app.config["SECRET_KEY"] = "your-secret-key"  # Use a secure key in production

# User database (replace with a real database in production)
users = {
    "user1": "password1",
    "user2": "password2"
}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        
        try:
            # Remove "Bearer " prefix if present
            if token.startswith("Bearer "):
                token = token[7:]
                
            # Decode the token
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = data["username"]
        except:
            return jsonify({"error": "Token is invalid"}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

@app.route("/login", methods=["POST"])
def login():
    auth = request.authorization
    
    if not auth or not auth.username or not auth.password:
        return jsonify({"error": "Authentication required"}), 401
        
    if auth.username not in users or users[auth.username] != auth.password:
        return jsonify({"error": "Invalid credentials"}), 401
    
    # Generate token
    token = jwt.encode({
        "username": auth.username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config["SECRET_KEY"], algorithm="HS256")
    
    return jsonify({"token": token})

@app.route("/protected", methods=["GET"])
@token_required
def protected(current_user):
    return jsonify({
        "message": f"Hello {current_user}, this is a protected endpoint",
        "timestamp": datetime.datetime.utcnow()
    })

if __name__ == "__main__":
    app.run(debug=True)
```

## GraphQL with Python

GraphQL provides a more flexible alternative to REST:

```python
import graphene
from flask import Flask
from flask_graphql import GraphQLView

# Example data
authors = [
    {"id": "1", "name": "J.K. Rowling", "country": "UK"},
    {"id": "2", "name": "George R.R. Martin", "country": "USA"}
]

books = [
    {"id": "1", "title": "Harry Potter", "author_id": "1", "year": 1997},
    {"id": "2", "title": "Game of Thrones", "author_id": "2", "year": 1996},
    {"id": "3", "title": "Fantastic Beasts", "author_id": "1", "year": 2016}
]

# Define GraphQL types
class Book(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    year = graphene.Int()
    author = graphene.Field(lambda: Author)
    
    def resolve_author(self, info):
        for author in authors:
            if author["id"] == self.author_id:
                return Author(**author)
        return None

class Author(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    country = graphene.String()
    books = graphene.List(Book)
    
    def resolve_books(self, info):
        return [Book(**book) for book in books if book["author_id"] == self.id]

# Define queries
class Query(graphene.ObjectType):
    book = graphene.Field(Book, id=graphene.ID(required=True))
    books = graphene.List(Book)
    author = graphene.Field(Author, id=graphene.ID(required=True))
    authors = graphene.List(Author)
    
    def resolve_book(self, info, id):
        for book in books:
            if book["id"] == id:
                return Book(**book)
        return None
    
    def resolve_books(self, info):
        return [Book(**book) for book in books]
    
    def resolve_author(self, info, id):
        for author in authors:
            if author["id"] == id:
                return Author(**author)
        return None
    
    def resolve_authors(self, info):
        return [Author(**author) for author in authors]

# Create schema
schema = graphene.Schema(query=Query)

# Set up Flask application
app = Flask(__name__)
app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True  # Enable GraphiQL interface
    )
)

if __name__ == '__main__':
    app.run(debug=True)
```

## Microservices with Python

Building microservices architectures:

```python
# Service 1: User Service (app.py)
from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# In-memory user database
users = {
    "1": {"id": "1", "name": "Alice", "email": "alice@example.com"},
    "2": {"id": "2", "name": "Bob", "email": "bob@example.com"}
}

@app.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    if user_id in users:
        # Get orders from Order Service
        try:
            order_response = requests.get(f"http://order-service:5001/users/{user_id}/orders")
            if order_response.status_code == 200:
                user_data = users[user_id].copy()
                user_data["orders"] = order_response.json()
                return jsonify(user_data)
        except requests.exceptions.RequestException:
            # Fallback if Order Service is unavailable
            return jsonify(users[user_id])
    return jsonify({"error": "User not found"}), 404

@app.route("/users", methods=["GET"])
def get_all_users():
    return jsonify(list(users.values()))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

```python
# Service 2: Order Service (app.py)
from flask import Flask, jsonify

app = Flask(__name__)

# In-memory order database
orders = {
    "1": [
        {"id": "101", "product": "Python Book", "amount": 29.99},
        {"id": "102", "product": "Programming Course", "amount": 149.99}
    ],
    "2": [
        {"id": "103", "product": "Laptop", "amount": 1299.99}
    ]
}

@app.route("/users/<user_id>/orders", methods=["GET"])
def get_user_orders(user_id):
    if user_id in orders:
        return jsonify(orders[user_id])
    return jsonify([])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
```

## API Best Practices

1. **Use HTTPS**: Always use HTTPS for security.

2. **Versioning**: Version your APIs (e.g., `/api/v1/resource`).

3. **Use proper HTTP status codes**: 200 for success, 400 for client errors, 500 for server errors.

4. **Consistent error responses**:
   ```python
   {
       "error": {
           "code": "VALIDATION_ERROR",
           "message": "Invalid input data",
           "details": ["Field 'email' is required"]
       }
   }
   ```

5. **Rate limiting**: Protect your API from abuse.

6. **Documentation**: Provide clear documentation.

7. **Filtering, sorting, and pagination**:
   ```
   GET /api/products?category=books&sort=price&page=2&limit=10
   ```

8. **HATEOAS (Hypermedia as the Engine of Application State)**:
   ```python
   {
       "id": 1,
       "name": "Product Name",
       "links": {
           "self": "/api/products/1",
           "reviews": "/api/products/1/reviews",
           "related": "/api/products/1/related"
       }
   }
   ```

9. **Caching**: Use HTTP caching headers.

10. **Use JSON**: Prefer JSON for request and response bodies.

## Using API SDKs

Many APIs provide Python SDKs for easier integration:

```python
# Example: Using the Requests library with GitHub API
import requests

# Using GitHub API directly
def get_github_repo(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    response = requests.get(url)
    return response.json()

# Example: Using the PyGithub SDK
from github import Github

# Using PyGithub SDK
def get_github_repo_with_sdk(owner, repo):
    g = Github()  # Or Github("access_token") for authenticated requests
    repository = g.get_repo(f"{owner}/{repo}")
    
    return {
        "name": repository.name,
        "stars": repository.stargazers_count,
        "forks": repository.forks_count,
        "description": repository.description
    }

# Get repository information
repo_info = get_github_repo("python", "cpython")
print(f"Repository: {repo_info['name']}")
print(f"Stars: {repo_info['stargazers_count']}")

# Using SDK for the same purpose
repo_info_sdk = get_github_repo_with_sdk("python", "cpython")
print(f"Repository (SDK): {repo_info_sdk['name']}")
print(f"Stars (SDK): {repo_info_sdk['stars']}")
```

## Conclusion

Python offers a rich ecosystem for both consuming and creating web APIs. The choice of framework (Flask, FastAPI, Django REST) depends on your specific needs, but all of them provide powerful tools for building robust API solutions.

When consuming APIs, the `requests` library is your go-to tool, while for creating APIs, the choice between REST and GraphQL depends on your application's requirements for flexibility and complexity.

Always remember to follow API best practices, implement proper authentication and rate limiting, and thoroughly test your API endpoints.
