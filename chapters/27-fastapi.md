# FastAPI Web Development

In this chapter, we'll explore FastAPI, a modern, high-performance web framework for building APIs with Python. FastAPI combines the simplicity of Flask with the performance of Node.js, making it an excellent choice for building web APIs.

## Introduction to FastAPI

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It was created by Sebastián Ramírez and first released in 2018.

### Key Features of FastAPI

- **Fast**: Very high performance, on par with NodeJS and Go
- **Fast to code**: Increases development speed by about 200-300%
- **Fewer bugs**: Reduces about 40% of human-induced errors
- **Intuitive**: Great editor support with auto-completion
- **Easy**: Designed to be easy to use and learn
- **Short**: Minimizes code duplication
- **Robust**: Production-ready code with automatic interactive documentation
- **Standards-based**: Based on (and fully compatible with) the open standards for APIs: OpenAPI and JSON Schema

### FastAPI vs Flask vs Django REST Framework vs Express.js (Node.js)

| Feature | FastAPI | Flask | Django REST Framework | Express.js |
|---------|---------|-------|----------------------|------------|
| Performance | Very Fast | Moderate | Moderate | Fast |
| Type Checking | Built-in | External (mypy) | External | TypeScript (optional) |
| Auto Documentation | Built-in | External | Built-in | External |
| Async Support | Built-in | Limited | Limited | Built-in |
| Learning Curve | Low | Low | High | Low |
| Community Size | Growing | Large | Large | Very Large |
| Database Integration | Any via ORM | Any via ORM | Django ORM | Any |

## Setting Up FastAPI

### Installation

First, let's set up our environment and install FastAPI:

```bash
# Create a virtual environment
python -m venv fastapi_env

# Activate the environment
source fastapi_env/bin/activate  # On Windows: fastapi_env\Scripts\activate

# Install FastAPI and Uvicorn (ASGI server)
pip install fastapi uvicorn[standard]
```

### Your First FastAPI Application

Let's create a simple FastAPI application:

```python
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

Run the application:

```bash
uvicorn main:app --reload
```

Visit `http://localhost:8000` in your browser, and you should see:

```json
{"Hello": "World"}
```

Visit `http://localhost:8000/items/5?q=test` to see:

```json
{"item_id": 5, "q": "test"}
```

### Automatic Interactive Documentation

One of FastAPI's best features is automatic interactive documentation. Visit:

- `http://localhost:8000/docs` for Swagger UI documentation
- `http://localhost:8000/redoc` for ReDoc documentation

These are generated automatically based on your API definition.

## Request Validation with Pydantic Models

FastAPI uses Pydantic for data validation, serialization, and documentation:

```python
from fastapi import FastAPI
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

app = FastAPI()

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    tax: Optional[float] = None
    tags: List[str] = []

@app.post("/items/")
async def create_item(item: Item):
    return item
```

This code:
- Validates the request body against the `Item` model
- Converts the input data to Python types
- Generates OpenAPI schema for the API documentation
- Provides editor support with auto-completion

## Path Parameters and Query Parameters

### Path Parameters

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

@app.get("/users/{user_id}/items/{item_id}")
async def read_user_item(
    user_id: int, item_id: int, q: str = None, short: bool = False
):
    item = {"item_id": item_id, "owner_id": user_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item
```

### Query Parameters

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/")
async def read_items(skip: int = 0, limit: int = 10):
    fake_items_db = [{"item_name": f"Item {i}"} for i in range(100)]
    return fake_items_db[skip : skip + limit]
```

### Request Body

```python
from fastapi import FastAPI
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

app = FastAPI()

@app.post("/items/")
async def create_item(item: Item):
    item_dict = item.dict()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({"price_with_tax": price_with_tax})
    return item_dict
```

## Response Models

You can use Pydantic models to define response models:

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None
    tags: List[str] = []

class ItemOut(BaseModel):
    name: str
    price: float
    price_with_tax: float

app = FastAPI()

@app.post("/items/", response_model=ItemOut)
async def create_item(item: Item):
    return {
        "name": item.name, 
        "price": item.price,
        "price_with_tax": item.price * 1.1
    }
```

This defines what data will be returned to the client, regardless of what your function returns.

## Form Data and File Uploads

### Form Data

```python
from fastapi import FastAPI, Form

app = FastAPI()

@app.post("/login/")
async def login(username: str = Form(...), password: str = Form(...)):
    return {"username": username}
```

To use forms, install:

```bash
pip install python-multipart
```

### File Uploads

```python
from fastapi import FastAPI, File, UploadFile
from typing import List

app = FastAPI()

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    contents = await file.read()
    # Process the file contents
    return {"filename": file.filename}

@app.post("/uploadfiles/")
async def create_upload_files(files: List[UploadFile]):
    return {"filenames": [file.filename for file in files]}
```

## HTTP Status Codes and Error Handling

### Status Codes

```python
from fastapi import FastAPI, status

app = FastAPI()

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(name: str):
    return {"name": name}
```

### Handling Errors

```python
from fastapi import FastAPI, HTTPException, status

app = FastAPI()

items = {"foo": "The Foo Item"}

@app.get("/items/{item_id}")
async def read_item(item_id: str):
    if item_id not in items:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
            headers={"X-Error": "Item not found"},
        )
    return {"item": items[item_id]}
```

### Custom Exception Handlers

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name

app = FastAPI()

@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={"message": f"Oops! {exc.name} did something. There goes a rainbow..."},
    )

@app.get("/unicorns/{name}")
async def read_unicorn(name: str):
    if name == "yolo":
        raise UnicornException(name=name)
    return {"unicorn_name": name}
```

## Dependency Injection

FastAPI has a powerful dependency injection system:

```python
from fastapi import Depends, FastAPI, Header, HTTPException

app = FastAPI()

async def verify_token(x_token: str = Header(...)):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")
    return x_token

async def verify_key(x_key: str = Header(...)):
    if x_key != "fake-super-secret-key":
        raise HTTPException(status_code=400, detail="X-Key header invalid")
    return x_key

@app.get("/items/", dependencies=[Depends(verify_token), Depends(verify_key)])
async def read_items():
    return [{"item": "Foo"}, {"item": "Bar"}]
```

### Dependencies with yield

You can use `yield` in dependencies for cleanup operations:

```python
from fastapi import Depends, FastAPI
from typing import Generator

app = FastAPI()

async def get_db() -> Generator:
    db = DBSession()
    try:
        yield db
    finally:
        db.close()

@app.get("/items/")
async def read_items(db: DBSession = Depends(get_db)):
    items = db.query(Item).all()
    return items
```

## Security and Authentication

FastAPI supports various security schemes:

### Basic Authentication

```python
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets

app = FastAPI()

security = HTTPBasic()

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "user")
    correct_password = secrets.compare_digest(credentials.password, "password")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@app.get("/users/me")
def read_current_user(username: str = Depends(get_current_username)):
    return {"username": username}
```

### OAuth2 with Password and Bearer

```python
from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.get("/users/me/items/")
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": "Foo", "owner": current_user.username}]
```

## Middleware

Middleware allows you to add custom code to be executed before or after each request:

```python
from fastapi import FastAPI
import time

app = FastAPI()

@app.middleware("http")
async def add_process_time_header(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## Background Tasks

FastAPI allows you to run tasks in the background:

```python
from fastapi import BackgroundTasks, FastAPI

app = FastAPI()

def write_notification(email: str, message=""):
    with open("log.txt", mode="w") as email_file:
        content = f"notification for {email}: {message}"
        email_file.write(content)

@app.post("/send-notification/{email}")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_notification, email, message="some notification")
    return {"message": "Notification sent in the background"}
```

## Project: URL Shortener API

Now let's build a simple URL shortener API with FastAPI:

```python
# main.py
from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime
import random
import string
import validators
from fastapi.middleware.cors import CORSMiddleware

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./shortener.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class URL(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True, index=True)
    original_url = Column(String, index=True)
    short_code = Column(String, unique=True, index=True)
    visits = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)

# Create the database tables
Base.metadata.create_all(bind=engine)

# Schemas
class URLBase(BaseModel):
    original_url: str

class URLCreate(URLBase):
    pass

class URLResponse(URLBase):
    short_code: str
    visits: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True

class URLList(BaseModel):
    urls: List[URLResponse]

# FastAPI app
app = FastAPI(title="URL Shortener API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper functions
def generate_short_code(length=6):
    """Generate a random short code."""
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

def is_valid_url(url: str) -> bool:
    """Check if the URL is valid."""
    return validators.url(url)

# Routes
@app.post("/urls/", response_model=URLResponse, status_code=status.HTTP_201_CREATED)
def create_url(url: URLCreate, db: Session = Depends(get_db)):
    """Create a new shortened URL."""
    if not is_valid_url(url.original_url):
        raise HTTPException(status_code=400, detail="Invalid URL format")
    
    # Generate a unique short code
    while True:
        short_code = generate_short_code()
        db_url = db.query(URL).filter(URL.short_code == short_code).first()
        if not db_url:
            break
    
    db_url = URL(original_url=url.original_url, short_code=short_code)
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

@app.get("/urls/", response_model=URLList)
def read_urls(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get a list of all URLs."""
    urls = db.query(URL).offset(skip).limit(limit).all()
    return {"urls": urls}

@app.get("/urls/{short_code}", response_model=URLResponse)
def read_url(short_code: str, db: Session = Depends(get_db)):
    """Get details about a specific shortened URL."""
    db_url = db.query(URL).filter(URL.short_code == short_code).first()
    if db_url is None:
        raise HTTPException(status_code=404, detail="URL not found")
    return db_url

@app.get("/{short_code}")
def redirect_to_url(short_code: str, db: Session = Depends(get_db)):
    """Redirect to the original URL and increment the visit counter."""
    db_url = db.query(URL).filter(URL.short_code == short_code).first()
    if db_url is None:
        raise HTTPException(status_code=404, detail="URL not found")
    
    if not db_url.is_active:
        raise HTTPException(status_code=400, detail="URL is inactive")
    
    # Increment visit counter
    db_url.visits += 1
    db.commit()
    
    # In a real API, we would redirect, but for this example we'll just return the URL
    return {"url": db_url.original_url}

@app.put("/urls/{short_code}/deactivate", response_model=URLResponse)
def deactivate_url(short_code: str, db: Session = Depends(get_db)):
    """Deactivate a shortened URL."""
    db_url = db.query(URL).filter(URL.short_code == short_code).first()
    if db_url is None:
        raise HTTPException(status_code=404, detail="URL not found")
    
    db_url.is_active = False
    db.commit()
    db.refresh(db_url)
    return db_url

@app.put("/urls/{short_code}/activate", response_model=URLResponse)
def activate_url(short_code: str, db: Session = Depends(get_db)):
    """Activate a shortened URL."""
    db_url = db.query(URL).filter(URL.short_code == short_code).first()
    if db_url is None:
        raise HTTPException(status_code=404, detail="URL not found")
    
    db_url.is_active = True
    db.commit()
    db.refresh(db_url)
    return db_url

@app.delete("/urls/{short_code}", status_code=status.HTTP_204_NO_CONTENT)
def delete_url(short_code: str, db: Session = Depends(get_db)):
    """Delete a shortened URL."""
    db_url = db.query(URL).filter(URL.short_code == short_code).first()
    if db_url is None:
        raise HTTPException(status_code=404, detail="URL not found")
    
    db.delete(db_url)
    db.commit()
    return {"message": "URL deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

To run this project, you need to install these dependencies:

```bash
pip install fastapi uvicorn sqlalchemy validators
```

Then run the server:

```bash
uvicorn main:app --reload
```

## Testing FastAPI Applications

FastAPI makes testing extremely straightforward with its built-in `TestClient`, which is based on `requests` library. This allows you to write tests that closely resemble how clients interact with your API.

### Using TestClient for API Testing

The `TestClient` allows you to make HTTP requests to your application without actually running a server:

```python
# test_main.py
from fastapi.testclient import TestClient
from main import app  # Import your FastAPI app

# Create a test client using your app
client = TestClient(app)

def test_read_main():
    """Test the root endpoint returns the correct response"""
    # Make a GET request to the root endpoint
    response = client.get("/")
    
    # Assert the status code is 200 (OK)
    assert response.status_code == 200
    
    # Assert the JSON response matches what we expect
    assert response.json() == {"Hello": "World"}

def test_read_item():
    """Test retrieving an item works correctly"""
    # Test with a specific item ID
    item_id = 42
    
    # Make a GET request to the items endpoint
    response = client.get(f"/items/{item_id}")
    
    # Validate response status and content
    assert response.status_code == 200
    assert response.json() == {"item_id": item_id, "q": None}
    
    # Test with query parameter
    response = client.get(f"/items/{item_id}?q=test")
    assert response.status_code == 200
    assert response.json() == {"item_id": item_id, "q": "test"}
```

### Testing Our CRUD API

Let's add some tests for our CRUD operations:

```python
# test_crud.py
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from .main import app, get_db
from .models import Base
from .schemas import UserCreate

# Create in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,  # Ensures the same connection is used
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables in the test database
Base.metadata.create_all(bind=engine)

# Override the get_db dependency for testing
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Apply the override for testing
app.dependency_overrides[get_db] = override_get_db

# Create test client
client = TestClient(app)

# Test user creation and retrieval
def test_create_user():
    """Test creating a new user"""
    # Define test data
    user_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "password123"
    }
    
    # Send POST request to create user
    response = client.post("/users/", json=user_data)
    
    # Assert response
    assert response.status_code == 201  # Created
    data = response.json()
    assert data["email"] == user_data["email"]
    assert data["username"] == user_data["username"]
    assert "id" in data
    assert "hashed_password" not in data  # Password should not be returned
    
    # Get the user by ID to verify it was created
    user_id = data["id"]
    response = client.get(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["id"] == user_id
```

### Running Tests with pytest

To run your tests, you can use pytest:

```bash
# Install pytest
pip install pytest

# Run tests
pytest
```

pytest will automatically discover and run any functions that start with `test_` in files that start with `test_`.

## Deploying FastAPI Applications

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

And a `requirements.txt` file:

```
fastapi>=0.68.0
uvicorn>=0.15.0
sqlalchemy>=1.4.23
validators>=0.18.2
```

Build and run the Docker container:

```bash
docker build -t url-shortener .
docker run -p 8000:8000 url-shortener
```

### Cloud Deployment

FastAPI applications can be deployed to various cloud platforms:

- **Heroku**: Uses a `Procfile` with `web: uvicorn main:app --host=0.0.0.0 --port=${PORT:-8000}`
- **AWS Lambda**: Can use Mangum to handle API Gateway events
- **Google Cloud Run**: Containerized deployment
- **Azure App Service**: Supports Python web apps

## Best Practices for FastAPI

1. **Use Pydantic models**: For request and response validation
2. **Structure your application**: Use modules and routers for larger applications
3. **Document your API**: Add descriptions and examples to your endpoints
4. **Handle errors gracefully**: Use exception handlers
5. **Use async when appropriate**: For I/O-bound operations
6. **Implement rate limiting**: To prevent abuse
7. **Add logging**: For debugging and monitoring
8. **Write tests**: For ensuring reliability

## Complete CRUD Operations with FastAPI and SQLAlchemy

CRUD (Create, Read, Update, Delete) operations form the backbone of most web applications. Let's implement a comprehensive CRUD API with FastAPI and SQLAlchemy.

### Setting Up the Database Models

First, let's set up our SQLAlchemy models:

```python
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

# Create SQLAlchemy engine and session
SQLALCHEMY_DATABASE_URL = "sqlite:///./crud_app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Define models
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    
    # Relationship to items
    items = relationship("Item", back_populates="owner")

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationship to user
    owner = relationship("User", back_populates="items")
```

### Creating Pydantic Schemas

Define the Pydantic models for data validation:

```python
from pydantic import BaseModel
from typing import List, Optional

# User schemas
class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    items: List["Item"] = []

    class Config:
        orm_mode = True

# Item schemas
class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

# Update Pydantic's recursive references
User.update_forward_refs()
```

### Implementing CRUD Operations

Now, let's implement the CRUD operations in a separate module. We'll create a `crud.py` file that contains all our database interaction functions:

```python
from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import HTTPException, status
from passlib.context import CryptContext

# Set up password hashing using bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    """
    Hash a password for storing in the database
    Uses bcrypt algorithm for secure password hashing
    """
    return pwd_context.hash(password)

# CREATE operation: Add a new user to the database
def create_user(db: Session, user: schemas.UserCreate):
    """
    Create a new user in the database
    
    Steps:
    1. Hash the user's password for secure storage
    2. Create a User model instance with the data
    3. Add the new user to the database session
    4. Commit the transaction to save changes
    5. Refresh to get the updated user with ID
    """
    # Convert plain password to secure hash
    hashed_password = get_password_hash(user.password)
    
    # Create User object with hashed password
    db_user = models.User(
        email=user.email, 
        username=user.username, 
        hashed_password=hashed_password
    )
    
    # Add to session, commit changes, and refresh to get new ID
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_item(db: Session, item: schemas.ItemCreate, user_id: int):
    """
    Create a new item linked to a specific user
    
    Steps:
    1. Convert Pydantic model to dict with .dict()
    2. Unpack the dict into Item constructor using **
    3. Add owner_id to link item to user
    4. Save to database and return the new item
    """
    # Convert Pydantic model to dict and add owner_id
    db_item = models.Item(**item.dict(), owner_id=user_id)
    
    # Add to database, commit, and refresh to get ID
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# READ operations - Retrieving data from the database
def get_user(db: Session, user_id: int):
    """
    Get a user by ID
    
    The .first() method returns None if no matching user is found,
    which is better than .one() that raises an exception
    """
    # Query User table, filter by ID, and get the first match
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    """
    Find a user by email address
    
    Email lookup is common for login functionality
    """
    # Query by email field instead of ID
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """
    Get a paginated list of all users
    
    Parameters:
    - skip: Number of records to skip (for pagination)
    - limit: Maximum number of records to return
    """
    # Skip and limit for pagination, then get all matches as a list
    return db.query(models.User).offset(skip).limit(limit).all()

def get_items(db: Session, skip: int = 0, limit: int = 100):
    """
    Get a paginated list of all items
    
    Similar to get_users but for items table
    """
    # Paginated query returning a list of items
    return db.query(models.Item).offset(skip).limit(limit).all()

def get_user_items(db: Session, user_id: int):
    """
    Get all items belonging to a specific user
    
    Demonstrates filtering with a relationship
    """
    # Filter items by owner_id which links to the user
    return db.query(models.Item).filter(models.Item.owner_id == user_id).all()

# Update operations
# UPDATE operations - Modifying existing database records
def update_item(db: Session, item_id: int, item: schemas.ItemCreate):
    """
    Update an existing item by ID
    
    Steps:
    1. Fetch the item from the database
    2. Check if item exists
    3. Update each field using setattr for dynamic updates
    4. Commit changes and refresh the object
    
    Using setattr dynamically updates only the fields provided in the request,
    which is more flexible than hardcoding each field
    """
    # Find the item in the database
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    
    # Return None if item doesn't exist
    if db_item is None:
        return None
    
    # Dynamic update of all fields from the Pydantic model
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    
    # Save changes and return updated item
    db.commit()
    db.refresh(db_item)
    return db_item

def update_user(db: Session, user_id: int, user: schemas.UserBase):
    """
    Update an existing user by ID
    
    Similar to update_item but for users
    Uses the same pattern of dynamic attribute updates
    """
    # Find user in database
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    
    # Return None if user doesn't exist
    if db_user is None:
        return None
    
    # Update each field from the Pydantic model
    for key, value in user.dict().items():
        setattr(db_user, key, value)
    
    # Save changes and return updated user
    db.commit()
    db.refresh(db_user)
    return db_user

# DELETE operations - Removing records from the database
def delete_user(db: Session, user_id: int):
    """
    Delete a user by ID
    
    Steps:
    1. Find the user in the database
    2. Check if the user exists
    3. Delete the user from the session
    4. Commit the transaction
    
    Note: In a real application, consider implementing cascade deletion
    or handling related records (like items owned by this user)
    """
    # Find the user to delete
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    
    # Return None if user doesn't exist
    if db_user is None:
        return None
    
    # Delete and commit the change
    db.delete(db_user)
    db.commit()
    return db_user

def delete_item(db: Session, item_id: int):
    """
    Delete an item by ID
    
    Similar pattern to delete_user
    """
    # Find the item to delete
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    
    # Return None if item doesn't exist
    if db_item is None:
        return None
    
    # Delete and commit the change
    db.delete(db_item)
    db.commit()
    return db_item# Delete operations
def delete_item(db: Session, item_id: int):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        return None
        
    db.delete(db_item)
    db.commit()
    return db_item

def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        return None
        
    db.delete(db_user)
    db.commit()
    return db_user
```

### Creating FastAPI Endpoints

### Setting Up FastAPI Endpoints

Now let's create the endpoints that utilize our CRUD operations. This is where FastAPI shines with its automatic validation, documentation, and dependency injection features:

```python
from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from . import crud, models, schemas
from .database import SessionLocal, engine

# Create all database tables from our models at startup
# In production, you would typically use migrations instead
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI application with metadata
app = FastAPI(
    title="CRUD API",
    description="A complete CRUD API for users and items",
    version="1.0.0"
)

# Database Dependency
# This creates a new database session for each request and
# closes it when the request is complete (using a context manager pattern)
def get_db():
    """
    Dependency for getting a database session
    
    Uses Python's yield keyword to create a context manager
    that ensures the database connection is closed after use
    """
    db = SessionLocal()
    try:
        yield db  # The value is yielded for the route to use
    finally:
        db.close()  # Always executed after the request is processed

# USER ENDPOINTS
# Each endpoint is decorated with HTTP method, path, response model, and status code

# CREATE - POST request to create a new user
@app.post(
    "/users/", 
    response_model=schemas.User,  # Defines the response structure
    status_code=status.HTTP_201_CREATED,  # 201 Created status
    summary="Create a new user",
    description="Register a new user with email, username, and password"
)
def create_user(
    user: schemas.UserCreate,  # Request body automatically validated by Pydantic
    db: Session = Depends(get_db)  # Database session injected using Depends
):
    """
    Create a new user in the system
    
    - Validates input using UserCreate schema
    - Checks for duplicate email addresses
    - Returns the created user object
    """
    # Check if email is already registered
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email already registered"
        )
    return crud.create_user(db=db, user=user)

# READ - GET request to list all users with pagination
@app.get(
    "/users/", 
    response_model=List[schemas.User],  # Returns a list of User objects
    summary="Get all users",
    description="Retrieve a list of all users with pagination support"
)
def read_users(
    # Query parameters for pagination
    skip: int = 0,  # Number of records to skip
    limit: int = 100,  # Maximum number of records to return
    db: Session = Depends(get_db)
):
    """
    Retrieve a paginated list of all users
    
    - Supports pagination with skip and limit parameters
    - Returns a list of user objects with sensitive data filtered out
    - Example: /users/?skip=10&limit=20 gets users 11-30
    """
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

# READ - GET request to get a specific user by ID
@app.get(
    "/users/{user_id}", 
    response_model=schemas.User,
    summary="Get a specific user",
    description="Retrieve a single user by their ID"
)
def read_user(
    # Path parameter extracted from URL
    user_id: int,  # FastAPI validates this is an integer
    db: Session = Depends(get_db)
):
    """
    Retrieve a specific user by ID
    
    - Path parameter {user_id} is extracted from URL
    - Returns 404 if user doesn't exist
    - Returns user data with sensitive fields removed
    """
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        # Return 404 error with helpful message
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found"
        )
    return db_user

# UPDATE - PUT request to update a user's information
@app.put(
    "/users/{user_id}", 
    response_model=schemas.User,
    summary="Update a user",
    description="Update a user's information by their ID"
)
def update_user(
    user_id: int,  # Path parameter
    user: schemas.UserBase,  # Request body 
    db: Session = Depends(get_db)
):
    """
    Update an existing user's information
    
    - Path parameter {user_id} identifies which user to update
    - Request body contains the new user data
    - Returns 404 if user doesn't exist
    - Returns the updated user information
    
    Note: PUT requests should include all fields, even unchanged ones.
    For partial updates, FastAPI supports PATCH requests (not shown here).
    """
    db_user = crud.update_user(db, user_id=user_id, user=user)
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found"
        )
    return db_user

# DELETE - DELETE request to remove a user
@app.delete(
    "/users/{user_id}", 
    status_code=status.HTTP_204_NO_CONTENT,  # 204 No Content is standard for successful deletes
    summary="Delete a user",
    description="Delete a user from the system by their ID"
)
def delete_user(
    user_id: int,  # Path parameter
    db: Session = Depends(get_db)
):
    """
    Delete a user from the system
    
    - Path parameter {user_id} identifies which user to delete
    - Returns 204 No Content on successful deletion
    - Returns 404 if user doesn't exist
    
    Note: 204 response code means success but no content is returned.
    This is standard practice for DELETE operations.
    """
    db_user = crud.delete_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found"
        )
    # Return None for 204 No Content response
    return None

# Item endpoints
@app.post("/users/{user_id}/items/", response_model=schemas.Item, status_code=status.HTTP_201_CREATED)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found"
        )
    return crud.create_item(db=db, item=item, user_id=user_id)

@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

@app.get("/users/{user_id}/items/", response_model=List[schemas.Item])
def read_user_items(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found"
        )
    items = crud.get_user_items(db, user_id=user_id)
    return items

@app.put("/items/{item_id}", response_model=schemas.Item)
def update_item(item_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)):
    db_item = crud.update_item(db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Item not found"
        )
    return db_item

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.delete_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Item not found"
        )
    return None
```

### Testing CRUD Endpoints

To test our CRUD endpoints, we can use the FastAPI TestClient:

```python
from fastapi.testclient import TestClient
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .main import app, get_db
from .database import Base

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_crud_app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Set up test database
Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_create_user():
    response = client.post(
        "/users/",
        json={"email": "test@example.com", "username": "testuser", "password": "password123"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["username"] == "testuser"
    assert "id" in data
    user_id = data["id"]
    
    # Test creating an item for the user
    response = client.post(
        f"/users/{user_id}/items/",
        json={"title": "Test Item", "description": "This is a test item"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Item"
    assert data["owner_id"] == user_id
    
    # Test reading user and items
    response = client.get(f"/users/{user_id}")
    assert response.status_code == 200
    
    response = client.get(f"/users/{user_id}/items/")
    assert response.status_code == 200
    assert len(response.json()) == 1
    
    # Test updating
    item_id = response.json()[0]["id"]
    response = client.put(
        f"/items/{item_id}",
        json={"title": "Updated Item", "description": "This item has been updated"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Item"
    
    # Test deleting
    response = client.delete(f"/items/{item_id}")
    assert response.status_code == 204
    
    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 204
```

This CRUD implementation provides a robust foundation for any FastAPI application that needs to perform database operations.

## Advanced FastAPI Concepts

### WebSockets

FastAPI supports WebSockets for real-time communication:

```python
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")
```

### GraphQL with Strawberry

FastAPI works well with GraphQL through libraries like Strawberry:

```python
import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

@strawberry.type
class User:
    id: strawberry.ID
    name: str
    email: str

@strawberry.type
class Query:
    @strawberry.field
    def user(self, id: strawberry.ID) -> User:
        return User(id=id, name="John Doe", email="john@example.com")

schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")
```

## Conclusion

FastAPI is a powerful, modern framework for building high-performance APIs with Python. Its combination of automatic data validation, documentation, and async support makes it an excellent choice for web development. Whether you're building a simple API or a complex web application, FastAPI provides the tools you need to do it efficiently and correctly.

In the next chapter, we'll explore CLI and automation with Python, learning how to build command-line tools for various tasks.
