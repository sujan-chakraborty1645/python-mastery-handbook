# Context Managers

Context managers are a powerful feature in Python that helps you properly manage resources like files, network connections, or database connections. They ensure that resources are properly acquired and released, even if errors occur.

## Introduction to Context Managers

A context manager is an object that defines the methods `__enter__()` and `__exit__()`. The `with` statement creates a context manager instance and calls its `__enter__()` method, assigning the return value to a variable if specified with `as`. When the `with` block is exited, the `__exit__()` method is called to clean up resources.

### The Problem Context Managers Solve

Consider file handling in Python:

```python
# Without a context manager
file = open('example.txt', 'w')
try:
    file.write('Hello, World!')
finally:
    file.close()
```

Using a context manager, this becomes more elegant:

```python
# With a context manager
with open('example.txt', 'w') as file:
    file.write('Hello, World!')  # File is automatically closed after the block
```

The `with` statement ensures the file is closed even if an exception is raised.

## Using Built-in Context Managers

Python provides several built-in context managers:

### File Management

```python
# Reading a file
with open('input.txt', 'r') as file:
    content = file.read()
    # Process the content...

# Writing to a file
with open('output.txt', 'w') as file:
    file.write('Hello, World!')
```

### Lock Management

```python
import threading

# Thread synchronization
lock = threading.Lock()

with lock:
    # Critical section - only one thread can be here at a time
    # ...
```

### Temporarily Changing Working Directory

```python
import os
from contextlib import chdir

# Temporarily change directory
with chdir('/tmp'):
    # Operations in /tmp
    print(os.getcwd())  # Outputs: /tmp

# Back to original directory
print(os.getcwd())  # Outputs original directory
```

### Temporarily Redirecting stdout

```python
from contextlib import redirect_stdout
import io

# Capture print output
f = io.StringIO()
with redirect_stdout(f):
    print('Hello, World!')

output = f.getvalue()
print(f"Captured: {output}")  # Outputs: Captured: Hello, World!
```

### Suppressing Exceptions

```python
from contextlib import suppress

# Ignore specific exceptions
with suppress(FileNotFoundError):
    os.remove('non_existent_file.txt')  # No exception raised if file doesn't exist
```

### Timing Code Blocks

```python
import time
from contextlib import contextmanager

@contextmanager
def timer():
    start = time.time()
    yield
    end = time.time()
    print(f"Elapsed time: {end - start:.6f} seconds")

with timer():
    # Code to be timed
    time.sleep(1.5)  # Outputs: Elapsed time: 1.500123 seconds
```

## Creating Your Own Context Managers

### Class-Based Context Managers

To create a context manager, define a class with `__enter__()` and `__exit__()` methods:

```python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
        
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        # Return True to suppress any exception that occurred in the with block
        # Return False or None to propagate the exception
        return False

# Using our custom context manager
with FileManager('example.txt', 'w') as file:
    file.write('Hello from custom context manager!')
```

### Function-Based Context Managers

Using the `contextmanager` decorator, you can create a context manager from a generator function:

```python
from contextlib import contextmanager

@contextmanager
def open_file(filename, mode):
    try:
        file = open(filename, mode)
        yield file
    finally:
        file.close()

# Using our function-based context manager
with open_file('example.txt', 'w') as file:
    file.write('Hello from function-based context manager!')
```

## Advanced Context Managers

### Handling Exceptions in Context Managers

The `__exit__()` method receives exception information if an exception was raised in the `with` block:

```python
class DatabaseConnection:
    def __init__(self, db_url):
        self.db_url = db_url
        self.connection = None
        
    def __enter__(self):
        # Connect to the database
        print(f"Connecting to {self.db_url}")
        self.connection = {'connected': True}  # Simulated connection
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Close the connection even if an exception occurred
        if self.connection:
            print(f"Closing connection to {self.db_url}")
            self.connection = None
            
        if exc_type is not None:
            # Log the error
            print(f"An error occurred: {exc_type.__name__}: {exc_val}")
            # Return True to suppress the exception, False to propagate it
            return False  # Propagate the exception

# Using the context manager
try:
    with DatabaseConnection("mysql://localhost/mydb") as conn:
        print("Connected successfully")
        # Simulate an error
        raise ValueError("Something went wrong")
except ValueError as e:
    print(f"Caught: {e}")
```

### Nested Context Managers

Context managers can be nested to manage multiple resources:

```python
with open('input.txt', 'r') as infile, open('output.txt', 'w') as outfile:
    # Read from input and write to output
    outfile.write(infile.read())
```

### Reusable Context Managers with Classes

```python
class IndentedWriter:
    def __init__(self, filename, indentation=4):
        self.filename = filename
        self.indentation = indentation
        self.file = None
        self.indent_level = 0
        
    def __enter__(self):
        self.file = open(self.filename, 'w')
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
    
    def write(self, text):
        self.file.write(' ' * self.indentation * self.indent_level + text + '\n')
    
    @contextmanager
    def indent(self):
        self.indent_level += 1
        try:
            yield self
        finally:
            self.indent_level -= 1

# Using the IndentedWriter
with IndentedWriter('code.py') as writer:
    writer.write('def hello():')
    with writer.indent():
        writer.write('print("Hello, World!")')
        writer.write('return True')
    writer.write('hello()')
```

This creates a file `code.py` with properly indented Python code:

```python
def hello():
    print("Hello, World!")
    return True
hello()
```

## Real-World Context Manager Examples

### Database Connection Manager

```python
import sqlite3
from contextlib import contextmanager

@contextmanager
def sqlite_connection(db_path):
    conn = sqlite3.connect(db_path)
    try:
        conn.row_factory = sqlite3.Row
        yield conn
    finally:
        conn.close()

@contextmanager
def sqlite_transaction(connection):
    cursor = connection.cursor()
    try:
        yield cursor
        connection.commit()
    except Exception:
        connection.rollback()
        raise

# Using these context managers
with sqlite_connection('example.db') as conn:
    # Create a table
    with sqlite_transaction(conn) as cursor:
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
        ''')
    
    # Insert data in a transaction
    with sqlite_transaction(conn) as cursor:
        try:
            cursor.execute(
                "INSERT INTO users (name, email) VALUES (?, ?)",
                ("Alice", "alice@example.com")
            )
        except sqlite3.IntegrityError:
            print("User already exists")
    
    # Query data
    with sqlite_transaction(conn) as cursor:
        cursor.execute("SELECT * FROM users")
        for row in cursor.fetchall():
            print(f"User: {row['name']}, Email: {row['email']}")
```

### Temporary File Manager

```python
import os
import tempfile
from contextlib import contextmanager

@contextmanager
def temporary_file(content=None, suffix='.txt'):
    """Create a temporary file that is deleted after use."""
    fd, path = tempfile.mkstemp(suffix=suffix)
    try:
        if content:
            with os.fdopen(fd, 'w') as file:
                file.write(content)
        else:
            os.close(fd)
        yield path
    finally:
        try:
            os.remove(path)
        except OSError:
            pass

# Using the temporary file
with temporary_file("Hello, temporary world!") as temp_path:
    print(f"Created temporary file at {temp_path}")
    with open(temp_path, 'r') as file:
        content = file.read()
        print(f"Content: {content}")

# The file is automatically deleted after the with block
```

### Network Connection Manager

```python
import socket
from contextlib import contextmanager

@contextmanager
def tcp_connection(host, port, timeout=10):
    """Create a TCP connection to the specified host and port."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    try:
        sock.connect((host, port))
        yield sock
    finally:
        sock.close()

# Using the TCP connection
try:
    with tcp_connection('example.com', 80) as sock:
        # Send HTTP request
        request = b"GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n"
        sock.sendall(request)
        
        # Receive response
        response = b''
        while True:
            data = sock.recv(4096)
            if not data:
                break
            response += data
        
        print(f"Received {len(response)} bytes")
        print(response.decode()[:100] + "...")  # Print first 100 characters
except socket.error as e:
    print(f"Connection error: {e}")
```

### Resource Pool Manager

```python
import time
import random
from contextlib import contextmanager

class Resource:
    def __init__(self, id):
        self.id = id
        
    def __str__(self):
        return f"Resource({self.id})"
    
    def use(self):
        print(f"Using {self}")

class ResourcePool:
    def __init__(self, size=5):
        self.resources = [Resource(i) for i in range(size)]
        self.available = self.resources.copy()
        
    @contextmanager
    def acquire(self, timeout=5):
        start_time = time.time()
        resource = None
        
        while resource is None and time.time() - start_time < timeout:
            if self.available:
                resource = self.available.pop()
                break
            time.sleep(0.1)
            
        if resource is None:
            raise TimeoutError("Could not acquire a resource from the pool")
            
        try:
            yield resource
        finally:
            if resource not in self.available:
                self.available.append(resource)

# Using the resource pool
pool = ResourcePool(3)  # Pool with 3 resources

def worker(name):
    try:
        with pool.acquire(timeout=1) as resource:
            print(f"Worker {name} acquired {resource}")
            resource.use()
            # Simulate work
            time.sleep(random.uniform(0.5, 2))
        print(f"Worker {name} released {resource}")
    except TimeoutError as e:
        print(f"Worker {name}: {e}")

# Simulate concurrent workers
import threading
threads = []
for i in range(5):  # 5 workers competing for 3 resources
    t = threading.Thread(target=worker, args=(f"W{i}",))
    threads.append(t)
    t.start()

for t in threads:
    t.join()
```

## Asynchronous Context Managers

For asynchronous code, Python 3.7+ provides `async with` for asynchronous context managers:

```python
import asyncio
import aiohttp

class AsyncTimer:
    async def __aenter__(self):
        self.start = asyncio.get_event_loop().time()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        end = asyncio.get_event_loop().time()
        print(f"Operation took {end - self.start:.6f} seconds")

async def fetch_url(url):
    async with AsyncTimer():
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                return await response.text()

async def main():
    html = await fetch_url('http://example.com')
    print(f"Fetched {len(html)} bytes")

# Run the async code
if __name__ == "__main__":
    asyncio.run(main())
```

## Using Multiple Context Managers

Python allows using multiple context managers in a single `with` statement:

```python
# Multiple context managers
with open('input.txt', 'r') as infile, open('output.txt', 'w') as outfile:
    outfile.write(infile.read().upper())
```

This can also be written as:

```python
# Nested context managers
with open('input.txt', 'r') as infile:
    with open('output.txt', 'w') as outfile:
        outfile.write(infile.read().upper())
```

## Context Manager Best Practices

1. **Always Release Resources**: Make sure `__exit__()` properly releases all resources.

2. **Handle Exceptions Gracefully**: Decide whether to suppress or propagate exceptions.

3. **Keep Context Managers Focused**: Each context manager should have a single responsibility.

4. **Use Function-Based Context Managers for Simple Cases**: The `contextmanager` decorator is cleaner for simpler cases.

5. **Document the Expected Behavior**: Clearly document what the context manager does.

6. **Return Self When Appropriate**: If the context manager provides additional methods, return `self` from `__enter__()`.

7. **Follow the Resource Acquisition Is Initialization (RAII) Pattern**: Acquire resources in `__enter__()` and release them in `__exit__()`.

## Comparing Python Context Managers with JavaScript

JavaScript has a similar concept with the `try...finally` block and resource disposal patterns, but it lacks a direct equivalent to Python's `with` statement. Modern JavaScript uses other patterns for resource management:

| Python | JavaScript |
|--------|------------|
| `with open(file) as f:` | `try { const f = fs.openSync(file); } finally { fs.closeSync(f); }` |
| `__enter__` and `__exit__` | `constructor` and `dispose` methods |
| Context manager protocol | Disposable pattern or custom closures |
| `contextlib.contextmanager` | Higher-order functions with setup/teardown |
| `with` statement | Typically handled with callbacks or async/await + try/finally |

In more modern JavaScript, you might see patterns like:

```javascript
// Using async/await and try/finally
async function processFile(filename) {
  const file = await fs.promises.open(filename, 'r');
  try {
    const content = await file.readFile('utf8');
    return content;
  } finally {
    await file.close();
  }
}
```

## Conclusion

Context managers provide a clean, robust way to manage resources in Python. Whether you're handling files, database connections, locks, or other resources, context managers ensure proper setup and cleanup. By creating your own context managers, you can encapsulate resource management logic and make your code more readable and less error-prone.

In the next chapter, we'll explore FastAPI, a modern, high-performance framework for building APIs with Python.
