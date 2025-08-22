# Advanced Python: Threading and Concurrency

Understanding parallel processing in Python - A comprehensive guide for JavaScript developers

## Introduction to Concurrency in Python

JavaScript developers are familiar with the asynchronous, single-threaded programming model of JavaScript. Python offers multiple approaches to concurrent programming, including threading, multiprocessing, and asynchronous I/O (covered in the async chapter).

## Threading in Python

Python's `threading` module allows you to create and manage threads. This is useful for I/O-bound operations, where your program spends time waiting for external operations like network requests or file operations.

### Basic Threading

```python
import threading
import time

def worker(name):
    """Function executed in a separate thread"""
    print(f"Worker {name} started")
    time.sleep(2)  # Simulate some work
    print(f"Worker {name} finished")

# Create and start threads
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(f"Thread-{i}",))
    threads.append(t)
    t.start()

# Wait for all threads to complete
for t in threads:
    t.join()
    
print("All workers have finished")
```

### Thread Synchronization

When multiple threads access shared resources, you need synchronization mechanisms to prevent race conditions.

```python
import threading
import time

# Shared resource
counter = 0
counter_lock = threading.Lock()

def increment_counter(amount):
    """Increment the counter with synchronization"""
    global counter
    
    for _ in range(amount):
        # Acquire the lock before modifying the shared resource
        with counter_lock:
            current = counter
            time.sleep(0.001)  # Simulate some processing time
            counter = current + 1

# Create two threads that will update the counter
t1 = threading.Thread(target=increment_counter, args=(100,))
t2 = threading.Thread(target=increment_counter, args=(100,))

t1.start()
t2.start()
t1.join()
t2.join()

print(f"Final counter value: {counter}")
```

### Real-Life Example: Web Scraper

Here's a practical example of using threads to scrape multiple web pages simultaneously:

```python
import threading
import requests
import time
from queue import Queue

# URLs to scrape
urls = [
    "https://www.example.com",
    "https://www.example.org",
    "https://www.example.net",
    "https://www.example.edu",
    "https://www.example.io",
]

# Shared queue for results and lock for printing
results = {}
print_lock = threading.Lock()

def fetch_url(url):
    """Fetch a URL and record its status code"""
    try:
        start_time = time.time()
        response = requests.get(url, timeout=5)
        elapsed_time = time.time() - start_time
        
        with print_lock:
            print(f"Fetched {url} - Status: {response.status_code}, Time: {elapsed_time:.2f}s")
        
        results[url] = {
            "status_code": response.status_code,
            "time": elapsed_time,
            "content_length": len(response.content)
        }
    except Exception as e:
        with print_lock:
            print(f"Error fetching {url}: {e}")
        results[url] = {"error": str(e)}

# Create and start a thread for each URL
threads = []
for url in urls:
    thread = threading.Thread(target=fetch_url, args=(url,))
    threads.append(thread)
    thread.start()

# Wait for all threads to complete
for thread in threads:
    thread.join()

print("\nAll requests completed. Results:")
for url, data in results.items():
    print(f"{url}: {data}")
```

## Thread Pools with concurrent.futures

Python's `concurrent.futures` module provides a high-level interface for asynchronously executing functions using threads or processes:

```python
import concurrent.futures
import requests
import time

urls = [
    "https://www.example.com",
    "https://www.example.org",
    "https://www.example.net",
    "https://www.example.edu",
    "https://www.example.io",
]

def fetch_url(url):
    """Fetch a URL and return its status and elapsed time"""
    start_time = time.time()
    try:
        response = requests.get(url, timeout=5)
        return {
            "url": url,
            "status": response.status_code,
            "time": time.time() - start_time
        }
    except Exception as e:
        return {
            "url": url, 
            "error": str(e),
            "time": time.time() - start_time
        }

# Create a thread pool and execute the function for each URL
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
    # Submit tasks and get Future objects
    future_to_url = {executor.submit(fetch_url, url): url for url in urls}
    
    # Process results as they complete
    for future in concurrent.futures.as_completed(future_to_url):
        result = future.result()
        if "error" in result:
            print(f"Error fetching {result['url']}: {result['error']}")
        else:
            print(f"Fetched {result['url']} - Status: {result['status']} in {result['time']:.2f}s")
```

## Multiprocessing

For CPU-bound tasks, the `multiprocessing` module is more appropriate than threading due to Python's Global Interpreter Lock (GIL).

```python
import multiprocessing
import time

def cpu_bound_task(number):
    """A CPU-intensive calculation"""
    result = 0
    for i in range(number):
        result += i * i
    return result

if __name__ == "__main__":
    numbers = [10000000, 20000000, 30000000, 40000000]
    
    # Sequential execution
    start_time = time.time()
    for number in numbers:
        cpu_bound_task(number)
    print(f"Sequential execution took: {time.time() - start_time:.2f} seconds")
    
    # Parallel execution with multiprocessing
    start_time = time.time()
    with multiprocessing.Pool(processes=4) as pool:
        results = pool.map(cpu_bound_task, numbers)
    print(f"Parallel execution took: {time.time() - start_time:.2f} seconds")
```

## Global Interpreter Lock (GIL)

Python's GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecode simultaneously. This is why threading doesn't provide true parallelism for CPU-bound tasks.

```python
import threading
import time

def cpu_intensive():
    """CPU-intensive calculation that won't benefit much from threading due to GIL"""
    count = 0
    for i in range(10000000):  # 10 million iterations
        count += i
    return count

def run_in_sequence():
    start = time.time()
    result1 = cpu_intensive()
    result2 = cpu_intensive()
    end = time.time()
    print(f"Sequential execution took {end - start:.2f} seconds")

def run_with_threads():
    start = time.time()
    
    t1 = threading.Thread(target=cpu_intensive)
    t2 = threading.Thread(target=cpu_intensive)
    
    t1.start()
    t2.start()
    
    t1.join()
    t2.join()
    
    end = time.time()
    print(f"Threaded execution took {end - start:.2f} seconds")

print("Running CPU-intensive tasks...")
run_in_sequence()
run_with_threads()  # This might not be much faster due to GIL
```

## Thread Safety and Race Conditions

When multiple threads access and modify shared data, race conditions can occur. Here's an example illustrating this and how to prevent it:

```python
import threading
import time

# Example of a race condition
class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
        # No lock protection initially

    def deposit(self, amount):
        # Simulate processing time
        current_balance = self.balance
        time.sleep(0.001)  # This creates an opportunity for race conditions
        self.balance = current_balance + amount
        
    def withdraw(self, amount):
        current_balance = self.balance
        time.sleep(0.001)  # This creates an opportunity for race conditions
        self.balance = current_balance - amount

# Create account and demonstrate the race condition
account = BankAccount(1000)

def make_transactions():
    # Perform 100 deposits and withdrawals
    for _ in range(100):
        account.deposit(10)
        account.withdraw(10)

# Create threads that will operate on the account simultaneously
threads = []
for _ in range(10):
    t = threading.Thread(target=make_transactions)
    threads.append(t)

# Start and join all threads
for t in threads:
    t.start()
for t in threads:
    t.join()

print(f"Final balance should be 1000, actual balance: {account.balance}")
# The balance might not be 1000 due to race conditions!

# Now with thread safety
class SafeBankAccount:
    def __init__(self, balance=0):
        self.balance = balance
        self.lock = threading.Lock()  # Add a lock

    def deposit(self, amount):
        with self.lock:  # Ensure exclusive access
            current_balance = self.balance
            time.sleep(0.001)
            self.balance = current_balance + amount
        
    def withdraw(self, amount):
        with self.lock:  # Ensure exclusive access
            current_balance = self.balance
            time.sleep(0.001)
            self.balance = current_balance - amount

# Test the thread-safe implementation
safe_account = SafeBankAccount(1000)

def make_safe_transactions():
    for _ in range(100):
        safe_account.deposit(10)
        safe_account.withdraw(10)

threads = []
for _ in range(10):
    t = threading.Thread(target=make_safe_transactions)
    threads.append(t)

for t in threads:
    t.start()
for t in threads:
    t.join()

print(f"Final safe balance should be 1000, actual balance: {safe_account.balance}")
# This will be 1000 as expected because we used locks
```

## Thread-Local Storage

Thread-local storage allows you to store data that's specific to each thread:

```python
import threading
import random

# Create thread-local storage
local_data = threading.local()

def worker(name):
    # Each thread has its own 'random_id' attribute
    local_data.random_id = random.randint(1000, 9999)
    print(f"Thread {name}: random_id = {local_data.random_id}")
    
    # Simulate some work
    time.sleep(1)
    
    # The value is still available for this thread
    print(f"Thread {name}: random_id is still {local_data.random_id}")

# Create threads
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(f"Thread-{i}",))
    threads.append(t)
    t.start()

for t in threads:
    t.join()
```

## Comparing Python Threading with JavaScript Concurrency

| Python | JavaScript |
|--------|------------|
| Multiple threads with the `threading` module | Single-threaded with event loop |
| Parallel execution limited by GIL | No true parallelism in the main thread |
| `concurrent.futures` for higher-level APIs | `Promise.all()` for concurrent async operations |
| `multiprocessing` for CPU-bound tasks | Web Workers for separate execution threads |
| Explicit locks and synchronization | No shared memory between threads, communication via messages |

## Best Practices for Python Threading

1. **Use Threading for I/O-Bound Tasks**: Networks, file operations, etc.
2. **Use Multiprocessing for CPU-Bound Tasks**: Heavy calculations, data processing
3. **Minimize Shared State**: Share as little data as possible between threads
4. **Use Proper Synchronization**: Always protect shared resources with locks
5. **Consider Thread-Local Storage**: For thread-specific data
6. **Use Higher-Level Abstractions**: Like `concurrent.futures` when possible
7. **Be Mindful of the GIL**: Understand its implications for your specific use case
8. **Consider Async I/O**: For I/O-heavy applications, `asyncio` might be a better choice

## Summary

Python provides several options for concurrent programming, each with its own strengths:

- **Threading**: Good for I/O-bound operations where tasks spend time waiting
- **Multiprocessing**: Good for CPU-bound operations that need true parallelism
- **Concurrent.futures**: Provides a high-level interface to both threading and multiprocessing
- **Asyncio**: Event-loop based concurrency (covered in the async chapter)

The right choice depends on your specific needs and the nature of your tasks.
