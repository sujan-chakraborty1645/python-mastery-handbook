# Asynchronous Programming

Working with asyncio in Python

## Introduction to Async

Asynchronous programming in Python is handled through the `asyncio` module, which allows concurrency without multiple threads or processes:

```python
import asyncio

# Basic async function (coroutine)
async def greet(name):
    await asyncio.sleep(1)  # Non-blocking sleep
    return f"Hello, {name}!"

# Running a coroutine
async def main():
    result = await greet("Alice")
    print(result)  # Hello, Alice!

# Running the event loop
asyncio.run(main())  # This starts the event loop and runs main()
```

### JavaScript Comparison

```javascript
// JavaScript async function
async function greet(name) {
    await new Promise(resolve => setTimeout(resolve, 1000));  // Non-blocking sleep
    return `Hello, ${name}!`;
}

// Running async functions
async function main() {
    const result = await greet("Alice");
    console.log(result);  // Hello, Alice!
}

main();  // No need for explicit event loop in JavaScript
```

## Core Async Concepts

Understanding the core concepts of asyncio:

```python
import asyncio
import time

# Define coroutines (async functions) that simulate I/O-bound tasks
# Coroutines run concurrently (not in parallel) - they take turns executing
async def task1():
    """
    A coroutine that simulates a task taking 2 seconds
    
    When this function reaches the await statement, it "pauses" and gives up
    control back to the event loop, allowing other coroutines to run during
    this waiting period.
    """
    print("Task 1 started")
    # await suspends execution of the coroutine and yields control back to the event loop
    # asyncio.sleep simulates an I/O operation (like waiting for a network response)
    await asyncio.sleep(2)  # Non-blocking sleep - other tasks can run during this time
    print("Task 1 completed")
    return "Result 1"  # The return value will be wrapped in a completed Future

async def task2():
    """
    A coroutine that simulates a task taking 1 second
    
    This will finish faster than task1 when run concurrently.
    """
    print("Task 2 started")
    await asyncio.sleep(1)  # Non-blocking sleep
    print("Task 2 completed")
    return "Result 2"

# The main coroutine that orchestrates our application
async def main():
    start = time.time()
    
    # PART 1: SEQUENTIAL EXECUTION
    # Running tasks one after another - total time is the sum of both tasks
    # The 'await' keyword here pauses main() until task1() is complete
    print("--- Sequential execution ---")
    result1 = await task1()  # Wait for task1 to complete before starting task2
    result2 = await task2()  # Only starts after task1 is fully completed
    
    # Calculate and show the total time (should be around 3 seconds)
    print(f"Sequential results: {result1}, {result2}")
    print(f"Sequential time: {time.time() - start:.2f} seconds")  # Should be ~3 seconds
    
    # Reset timer for the concurrent test
    start = time.time()
    
    # PART 2: CONCURRENT EXECUTION
    # Running tasks concurrently - they run simultaneously from our perspective
    # Total time is determined by the longest task (task1 in this case)
    print("\n--- Concurrent execution ---")
    
    # asyncio.gather starts all coroutines concurrently and waits for all to complete
    # Both task1() and task2() start running immediately
    results = await asyncio.gather(task1(), task2())
    
    # Calculate and show the total time (should be around 2 seconds)
    print(f"Concurrent results: {results}")
    print(f"Concurrent time: {time.time() - start:.2f} seconds")  # Should be ~2 seconds

# Start the event loop and run the main coroutine
# asyncio.run creates a new event loop, runs the coroutine, and closes the loop
asyncio.run(main())

# OUTPUT EXPLANATION:
#
# --- Sequential execution ---
# Task 1 started
# Task 1 completed     <-- Task 1 finishes after 2 seconds
# Task 2 started
# Task 2 completed     <-- Task 2 starts after Task 1 finishes, taking another 1 second
# Sequential results: Result 1, Result 2
# Sequential time: 3.00 seconds   <-- Total time is 2 + 1 = 3 seconds
#
# --- Concurrent execution ---
# Task 1 started       <-- Both tasks start at the same time
# Task 2 started
# Task 2 completed     <-- Task 2 completes after 1 second
# Task 1 completed     <-- Task 1 completes after 2 seconds
# Concurrent results: ['Result 1', 'Result 2']
# Concurrent time: 2.00 seconds   <-- Total time is max(2, 1) = 2 seconds
```

### JavaScript Comparison

```javascript
// JavaScript concurrent promises
async function task1() {
    console.log("Task 1 started");
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Task 1 completed");
    return "Result 1";
}

async function task2() {
    console.log("Task 2 started");
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Task 2 completed");
    return "Result 2";
}

async function main() {
    const start = Date.now();
    
    // Sequential execution
    const result1 = await task1();
    const result2 = await task2();
    console.log(`Sequential results: ${result1}, ${result2}`);
    console.log(`Sequential time: ${(Date.now() - start) / 1000} seconds`);
    
    // Reset timer
    const startConcurrent = Date.now();
    
    // Concurrent execution
    const results = await Promise.all([task1(), task2()]);
    console.log(`Concurrent results: ${results}`);
    console.log(`Concurrent time: ${(Date.now() - startConcurrent) / 1000} seconds`);
}

main();
```

## Tasks and Futures

Tasks and futures represent operations that are in progress:

```python
import asyncio

async def fetch_data(delay, value):
    await asyncio.sleep(delay)  # Simulate network delay
    return f"Data {value}"

async def main():
    # Create a task (does not block)
    task = asyncio.create_task(fetch_data(2, "X"))
    print("Task created")
    
    # Do other work
    print("Doing other work...")
    
    # Wait for task to complete
    result = await task
    print(f"Task result: {result}")
    
    # Working with futures
    future = asyncio.Future()
    
    # Schedule a function to set the future's result
    asyncio.create_task(set_future_result(future, "Future value"))
    
    # Wait for the future
    future_result = await future
    print(f"Future result: {future_result}")

async def set_future_result(future, value):
    await asyncio.sleep(1)
    future.set_result(value)

asyncio.run(main())
```

### JavaScript Comparison

```javascript
// JavaScript Promises (similar to Futures)
async function fetchData(delay, value) {
    await new Promise(resolve => setTimeout(resolve, delay * 1000));
    return `Data ${value}`;
}

async function main() {
    // Create a promise (similar to task)
    const promise = fetchData(2, "X");
    console.log("Promise created");
    
    // Do other work
    console.log("Doing other work...");
    
    // Wait for promise to complete
    const result = await promise;
    console.log(`Promise result: ${result}`);
    
    // Custom future-like pattern
    let resolveFunc;
    const future = new Promise(resolve => {
        resolveFunc = resolve;
    });
    
    // Schedule function to resolve the future
    setTimeout(() => {
        resolveFunc("Future value");
    }, 1000);
    
    // Wait for the future
    const futureResult = await future;
    console.log(`Future result: ${futureResult}`);
}

main();
```

## Async Context Managers

Python supports async context managers for resource cleanup:

```python
import asyncio

# Async context manager
class AsyncResource:
    async def __aenter__(self):
        await asyncio.sleep(0.1)  # Simulate resource acquisition
        print("Resource acquired")
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await asyncio.sleep(0.1)  # Simulate resource cleanup
        print("Resource released")
    
    async def use_resource(self):
        await asyncio.sleep(0.5)
        return "Resource data"

# Using async context manager
async def main():
    async with AsyncResource() as resource:
        data = await resource.use_resource()
        print(f"Resource data: {data}")

asyncio.run(main())
```

### JavaScript Comparison

```javascript
// JavaScript has no built-in async context manager
// But we can create a similar pattern

class AsyncResource {
    async acquire() {
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log("Resource acquired");
        return this;
    }
    
    async release() {
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log("Resource released");
    }
    
    async useResource() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return "Resource data";
    }
}

// Helper function for async with-like behavior
async function asyncWith(resource, callback) {
    const acquiredResource = await resource.acquire();
    try {
        return await callback(acquiredResource);
    } finally {
        await acquiredResource.release();
    }
}

async function main() {
    const result = await asyncWith(new AsyncResource(), async (resource) => {
        const data = await resource.useResource();
        console.log(`Resource data: ${data}`);
        return data;
    });
}

main();
```

## Error Handling in Async Code

Error handling in asyncio follows similar patterns to regular Python:

```python
import asyncio

async def might_fail(value):
    await asyncio.sleep(0.5)
    if value < 0:
        raise ValueError("Value cannot be negative")
    return value * 10

async def main():
    # Try/except with await
    try:
        result = await might_fail(-5)
        print(result)  # This won't execute
    except ValueError as e:
        print(f"Caught error: {e}")
    
    # Handling errors with gather
    tasks = [
        might_fail(10),
        might_fail(-10),
        might_fail(5)
    ]
    
    # By default, gather will raise the first exception
    try:
        results = await asyncio.gather(*tasks)
        print(results)  # This won't execute
    except ValueError as e:
        print(f"Gather error: {e}")
    
    # gather with return_exceptions=True
    results = await asyncio.gather(*tasks, return_exceptions=True)
    for result in results:
        if isinstance(result, Exception):
            print(f"Task failed: {result}")
        else:
            print(f"Task succeeded: {result}")

asyncio.run(main())
```

### JavaScript Comparison

```javascript
// JavaScript async error handling
async function mightFail(value) {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (value < 0) {
        throw new Error("Value cannot be negative");
    }
    return value * 10;
}

async function main() {
    // Try/catch with await
    try {
        const result = await mightFail(-5);
        console.log(result);  // This won't execute
    } catch (e) {
        console.log(`Caught error: ${e.message}`);
    }
    
    // Handling errors with Promise.all
    const tasks = [
        mightFail(10),
        mightFail(-10),
        mightFail(5)
    ];
    
    // By default, Promise.all will fail fast
    try {
        const results = await Promise.all(tasks);
        console.log(results);  // This won't execute
    } catch (e) {
        console.log(`Promise.all error: ${e.message}`);
    }
    
    // Promise.allSettled (similar to gather with return_exceptions=True)
    const settledResults = await Promise.allSettled(tasks);
    for (const result of settledResults) {
        if (result.status === 'fulfilled') {
            console.log(`Task succeeded: ${result.value}`);
        } else {
            console.log(`Task failed: ${result.reason.message}`);
        }
    }
}

main();
```

## Async Iterators and Generators

Python supports asynchronous iteration and generators:

```python
import asyncio

# Async generator
async def async_range(start, stop):
    for i in range(start, stop):
        await asyncio.sleep(0.5)  # Simulate async work
        yield i

# Async iterator class
class AsyncCounter:
    def __init__(self, stop):
        self.current = 0
        self.stop = stop
    
    def __aiter__(self):
        return self
    
    async def __anext__(self):
        if self.current < self.stop:
            await asyncio.sleep(0.5)  # Simulate async work
            value = self.current
            self.current += 1
            return value
        else:
            raise StopAsyncIteration

async def main():
    # Using async generator
    print("Using async generator:")
    async for i in async_range(1, 4):
        print(i)
    
    # Using async iterator
    print("Using async iterator:")
    async for i in AsyncCounter(3):
        print(i)
    
    # Collecting values with list comprehension (Python 3.8+)
    values = [i async for i in async_range(5, 8)]
    print(f"Collected values: {values}")

asyncio.run(main())
```

### JavaScript Comparison

```javascript
// JavaScript async generators
async function* asyncRange(start, stop) {
    for (let i = start; i < stop; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        yield i;
    }
}

// Async iterator class
class AsyncCounter {
    constructor(stop) {
        this.current = 0;
        this.stop = stop;
    }
    
    [Symbol.asyncIterator]() {
        return this;
    }
    
    async next() {
        if (this.current < this.stop) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return { value: this.current++, done: false };
        } else {
            return { done: true };
        }
    }
}

async function main() {
    // Using async generator
    console.log("Using async generator:");
    for await (const i of asyncRange(1, 4)) {
        console.log(i);
    }
    
    // Using async iterator
    console.log("Using async iterator:");
    for await (const i of new AsyncCounter(3)) {
        console.log(i);
    }
    
    // Collecting values
    const values = [];
    for await (const i of asyncRange(5, 8)) {
        values.push(i);
    }
    console.log(`Collected values: ${values}`);
}

main();
```

## Practical Example: Async Web Requests

A practical example using asyncio for concurrent HTTP requests:

```python
import asyncio
import aiohttp
import time

# Fetch single URL
async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

# Fetch multiple URLs concurrently
async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Process results
async def main():
    urls = [
        "https://example.com",
        "https://python.org",
        "https://mozilla.org",
    ]
    
    start = time.time()
    results = await fetch_all(urls)
    duration = time.time() - start
    
    print(f"Fetched {len(results)} URLs in {duration:.2f} seconds")
    
    # Print length of each response
    for i, (url, html) in enumerate(zip(urls, results)):
        print(f"{i+1}. {url}: {len(html)} bytes")

# Run the main function
if __name__ == "__main__":
    asyncio.run(main())
```

### JavaScript Comparison

```javascript
// JavaScript equivalent with fetch
import fetch from 'node-fetch';

// Fetch single URL
async function fetchUrl(url) {
    const response = await fetch(url);
    return response.text();
}

// Fetch multiple URLs concurrently
async function fetchAll(urls) {
    const tasks = urls.map(url => fetchUrl(url));
    return Promise.all(tasks);
}

// Process results
async function main() {
    const urls = [
        "https://example.com",
        "https://python.org",
        "https://mozilla.org",
    ];
    
    const start = Date.now();
    const results = await fetchAll(urls);
    const duration = (Date.now() - start) / 1000;
    
    console.log(`Fetched ${results.length} URLs in ${duration.toFixed(2)} seconds`);
    
    // Print length of each response
    urls.forEach((url, i) => {
        console.log(`${i+1}. ${url}: ${results[i].length} bytes`);
    });
}

main();
```

## Advanced Asyncio Features

Python's asyncio has many advanced features for complex asynchronous programming:

```python
import asyncio
import random

# Timeouts with wait_for
async def long_operation():
    await asyncio.sleep(10)  # Takes 10 seconds
    return "Completed"

async def with_timeout():
    try:
        # Wait for a maximum of 2 seconds
        result = await asyncio.wait_for(long_operation(), timeout=2)
        return result
    except asyncio.TimeoutError:
        return "Operation timed out"

# Waiting for first result with as_completed
async def random_delay_task(task_id):
    delay = random.uniform(0.5, 3)
    await asyncio.sleep(delay)
    return f"Task {task_id} completed in {delay:.2f}s"

async def first_to_complete():
    tasks = [random_delay_task(i) for i in range(10)]
    
    # Process tasks as they complete
    for future in asyncio.as_completed(tasks):
        result = await future
        print(result)
        # We could break here if we only want the first result

# Synchronizing with Events
async def wait_for_event(event, task_id):
    print(f"Task {task_id} is waiting for the event")
    await event.wait()
    print(f"Task {task_id} was triggered by event")

async def trigger_event(event):
    await asyncio.sleep(2)
    print("Triggering the event")
    event.set()

async def event_example():
    event = asyncio.Event()
    
    # Create waiting tasks
    waiters = [wait_for_event(event, i) for i in range(3)]
    
    # Create task to trigger the event
    trigger = asyncio.create_task(trigger_event(event))
    
    # Wait for all tasks
    await asyncio.gather(trigger, *waiters)

async def main():
    # Timeout example
    timeout_result = await with_timeout()
    print(f"Timeout result: {timeout_result}")
    
    # First-to-complete example
    print("Running first-to-complete example:")
    await first_to_complete()
    
    # Event example
    print("Running event example:")
    await event_example()

asyncio.run(main())
```

### JavaScript Comparison

```javascript
// JavaScript advanced async patterns

// Timeouts with Promise.race
async function longOperation() {
    await new Promise(resolve => setTimeout(resolve, 10000));  // 10 seconds
    return "Completed";
}

async function withTimeout() {
    try {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Timeout")), 2000);
        });
        
        // Race the operation against timeout
        const result = await Promise.race([
            longOperation(),
            timeoutPromise
        ]);
        return result;
    } catch (error) {
        return "Operation timed out";
    }
}

// Waiting for first result
async function randomDelayTask(taskId) {
    const delay = Math.random() * 2500 + 500;
    await new Promise(resolve => setTimeout(resolve, delay));
    return `Task ${taskId} completed in ${(delay/1000).toFixed(2)}s`;
}

async function firstToComplete() {
    const tasks = Array.from({ length: 10 }, (_, i) => randomDelayTask(i));
    
    // Process tasks as they complete
    const results = await Promise.all(tasks.map(p => p.catch(e => e)));
    results.forEach(result => console.log(result));
}

// Event-like pattern
class AsyncEvent {
    constructor() {
        this.promise = new Promise(resolve => {
            this.resolve = resolve;
        });
    }
    
    set() {
        this.resolve();
    }
    
    wait() {
        return this.promise;
    }
}

async function waitForEvent(event, taskId) {
    console.log(`Task ${taskId} is waiting for the event`);
    await event.wait();
    console.log(`Task ${taskId} was triggered by event`);
}

async function triggerEvent(event) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Triggering the event");
    event.set();
}

async function eventExample() {
    const event = new AsyncEvent();
    
    // Create waiting tasks
    const waiters = [0, 1, 2].map(i => waitForEvent(event, i));
    
    // Create task to trigger the event
    const trigger = triggerEvent(event);
    
    // Wait for all tasks
    await Promise.all([trigger, ...waiters]);
}

async function main() {
    // Timeout example
    const timeoutResult = await withTimeout();
    console.log(`Timeout result: ${timeoutResult}`);
    
    // First-to-complete example
    console.log("Running first-to-complete example:");
    await firstToComplete();
    
    // Event example
    console.log("Running event example:");
    await eventExample();
}

main();
```

## Key Differences from JavaScript

1. **Event Loop**: Python requires explicit `asyncio.run()` to start the event loop; JavaScript's event loop is implicit.

2. **Coroutines vs. Promises**: Python has coroutines with `async def` and `await`; JavaScript has Promises with `async`/`await`.

3. **Task creation**: Python requires explicit `asyncio.create_task()`; JavaScript automatically creates promises.

4. **Concurrency helpers**: Python has `asyncio.gather()`, `asyncio.wait()`, etc.; JavaScript has `Promise.all()`, `Promise.race()`, etc.

5. **Syntax for iterators**: Python uses `async for`; JavaScript uses `for await...of`.

6. **Context managers**: Python has `async with`; JavaScript has no direct equivalent.

7. **Cancellation**: Python has built-in task cancellation; JavaScript cancellation requires custom solutions.

## Best Practices

1. **Use asyncio for I/O-bound tasks**: Perfect for network requests, file I/O, etc.

2. **Avoid CPU-bound work**: For CPU-intensive tasks, use multiprocessing instead.

3. **Handle exceptions properly**: Unhandled exceptions in asyncio can be harder to debug.

4. **Use `asyncio.gather()`**: For running multiple tasks concurrently.

5. **Consider timeouts**: Use `asyncio.wait_for()` to prevent operations from running too long.

6. **Use async libraries**: Choose libraries designed for asyncio (like aiohttp, asyncpg) rather than synchronous libraries.

7. **Don't mix sync and async**: Avoid calling synchronous blocking code from async functions.

```python
# Good - proper async pattern
async def fetch_user_data(user_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.example.com/users/{user_id}") as response:
            if response.status == 200:
                return await response.json()
            else:
                return None

# Bad - blocking in async function
async def bad_fetch_user_data(user_id):
    import requests  # Synchronous library
    # This will block the event loop!
    response = requests.get(f"https://api.example.com/users/{user_id}")
    if response.status_code == 200:
        return response.json()
    else:
        return None
```
