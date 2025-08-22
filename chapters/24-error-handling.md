# Error Handling & Exceptions

This chapter covers Python's robust exception handling system, which provides a structured way to handle errors and unexpected situations in your code.

## Introduction to Exceptions

In Python, exceptions are events that occur during the execution of a program that disrupt the normal flow of instructions. Unlike JavaScript, which often allows code to continue running with `undefined` or `NaN` values, Python is more strict and raises exceptions when something goes wrong.

### Python vs JavaScript Error Handling

| JavaScript | Python |
|------------|--------|
| `try/catch/finally` | `try/except/else/finally` |
| `throw new Error("message")` | `raise Exception("message")` |
| `catch(e) { ... }` | `except Exception as e: ...` |
| `instanceof Error` | `isinstance(e, Exception)` |

## Basic Exception Handling

### Try-Except Block

```python
# Basic try-except (similar to try-catch in JavaScript)
try:
    x = 10 / 0  # This will cause a ZeroDivisionError
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Output: Cannot divide by zero!
```

### Handling Multiple Exception Types

```python
try:
    # Could raise different types of exceptions
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

### Catching Any Exception

```python
try:
    # Some risky operation
    with open("nonexistent_file.txt") as f:
        contents = f.read()
except Exception as e:
    print(f"An error occurred: {e}")
    # Can get error type with type(e).__name__
    print(f"Error type: {type(e).__name__}")
```

### The Else and Finally Clauses

Python's exception handling has two additional clauses not found in JavaScript:

```python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    # Runs only if no exceptions were raised
    print(f"Result: {result}")
finally:
    # Always runs, regardless of whether an exception occurred
    print("Execution completed")
```

## Exception Hierarchy

Python exceptions are organized in a hierarchy, with `BaseException` at the top. Most exceptions you'll work with inherit from `Exception`.

```python
# Common built-in exceptions
# BaseException
# ├── Exception
# │   ├── ArithmeticError
# │   │   ├── FloatingPointError
# │   │   ├── OverflowError
# │   │   └── ZeroDivisionError
# │   ├── AttributeError
# │   ├── ImportError
# │   │   └── ModuleNotFoundError
# │   ├── LookupError
# │   │   ├── IndexError
# │   │   └── KeyError
# │   ├── NameError
# │   ├── SyntaxError
# │   ├── TypeError
# │   └── ValueError
# ├── KeyboardInterrupt
# ├── SystemExit
# └── GeneratorExit

# Handling exceptions by hierarchy
try:
    # This could raise IndexError or KeyError
    data = [1, 2, 3]
    value = data[10]  # IndexError
except LookupError:  # Parent class of both IndexError and KeyError
    print("Lookup failed")
```

## Raising Exceptions

You can raise exceptions using the `raise` statement:

```python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

try:
    result = divide(10, 0)
except ValueError as e:
    print(f"Error: {e}")
```

### Re-raising Exceptions

You can re-raise an exception after handling it:

```python
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Logging the error...")
    raise  # Re-raises the original exception
```

## Custom Exceptions

Creating custom exceptions helps make your code more readable and maintainable:

```python
# Define custom exception classes
class CustomError(Exception):
    """Base class for custom exceptions"""
    pass

class ValueTooSmallError(CustomError):
    """Raised when a value is too small"""
    pass

class ValueTooLargeError(CustomError):
    """Raised when a value is too large"""
    pass

def validate_value(value):
    if value < 10:
        raise ValueTooSmallError("Value must be at least 10")
    if value > 100:
        raise ValueTooLargeError("Value must be at most 100")
    return value

# Using the custom exceptions
try:
    user_value = int(input("Enter a number between 10 and 100: "))
    valid_value = validate_value(user_value)
    print(f"Valid value: {valid_value}")
except ValueTooSmallError as e:
    print(f"Error: {e}")
except ValueTooLargeError as e:
    print(f"Error: {e}")
except ValueError:
    print("That's not a valid number!")
```

## Context Information in Custom Exceptions

You can add additional context to your custom exceptions:

```python
class ValidationError(Exception):
    """Exception raised for validation errors."""
    
    def __init__(self, message, field=None, code=None):
        self.message = message
        self.field = field
        self.code = code
        super().__init__(f"{message} (field: {field}, code: {code})")

# Usage
try:
    raise ValidationError("Invalid email format", field="email", code="invalid_format")
except ValidationError as e:
    print(f"Message: {e.message}")
    print(f"Field: {e.field}")
    print(f"Code: {e.code}")
```

## Cleaning Up Resources with Try-Finally

```python
def process_file(filename):
    try:
        f = open(filename, 'r')
        # Process the file
        content = f.read()
        return content
    except FileNotFoundError:
        print(f"File {filename} not found.")
        return None
    finally:
        # This runs regardless of whether an exception occurred
        if 'f' in locals() and not f.closed:
            f.close()
            print("File closed.")

# Better approach using 'with' statement (context manager)
def process_file_better(filename):
    try:
        with open(filename, 'r') as f:  # File will be closed automatically
            content = f.read()
            return content
    except FileNotFoundError:
        print(f"File {filename} not found.")
        return None
```

## Exception Chaining

Python allows chaining exceptions to show what caused an exception:

```python
def fetch_data(url):
    try:
        # Simulate HTTP request
        if not url.startswith('http'):
            raise ValueError("URL must start with 'http'")
        # ... more code ...
    except ValueError as e:
        # Add context to the exception
        raise RuntimeError(f"Failed to fetch data from {url}") from e

try:
    fetch_data("example.com")
except RuntimeError as e:
    print(f"Error: {e}")
    if e.__cause__:
        print(f"Caused by: {e.__cause__}")
```

## Real-world Example: Robust File Processor

```python
import os
import json
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='file_processor.log'
)
logger = logging.getLogger('file_processor')

class FileProcessorError(Exception):
    """Base exception for file processor errors"""
    pass

class FileReadError(FileProcessorError):
    """Raised when file cannot be read"""
    pass

class FileParseError(FileProcessorError):
    """Raised when file cannot be parsed"""
    pass

class FileProcessor:
    def __init__(self, directory):
        self.directory = directory
        
    def process_json_files(self):
        """Process all JSON files in the directory"""
        results = {}
        
        try:
            files = os.listdir(self.directory)
        except FileNotFoundError:
            raise FileProcessorError(f"Directory not found: {self.directory}")
        except PermissionError:
            raise FileProcessorError(f"Permission denied for directory: {self.directory}")
        
        json_files = [f for f in files if f.endswith('.json')]
        
        if not json_files:
            logger.warning(f"No JSON files found in {self.directory}")
            return results
        
        for filename in json_files:
            try:
                file_path = os.path.join(self.directory, filename)
                data = self._read_and_parse_json(file_path)
                results[filename] = self._process_data(data)
                logger.info(f"Successfully processed {filename}")
            except FileProcessorError as e:
                logger.error(f"Error processing {filename}: {e}")
            except Exception as e:
                # Unexpected error
                logger.exception(f"Unexpected error processing {filename}")
        
        return results
    
    def _read_and_parse_json(self, file_path):
        """Read and parse a JSON file"""
        try:
            with open(file_path, 'r') as f:
                try:
                    return json.load(f)
                except json.JSONDecodeError as e:
                    raise FileParseError(f"Invalid JSON format: {e}")
        except FileNotFoundError:
            raise FileReadError(f"File not found: {file_path}")
        except PermissionError:
            raise FileReadError(f"Permission denied for file: {file_path}")
        except IOError as e:
            raise FileReadError(f"IO error reading file: {e}")
    
    def _process_data(self, data):
        """Process the data from a JSON file"""
        # Example processing - in a real app, this would do something useful
        result = {
            'count': len(data) if isinstance(data, (list, dict)) else 0,
            'has_required_fields': False
        }
        
        # Check for required fields
        if isinstance(data, dict) and all(field in data for field in ['id', 'name', 'value']):
            result['has_required_fields'] = True
            result['processed_value'] = data['value'] * 2
        
        return result

# Usage example
if __name__ == "__main__":
    try:
        processor = FileProcessor("./data")
        results = processor.process_json_files()
        print(f"Processed {len(results)} files successfully")
    except FileProcessorError as e:
        print(f"File processing error: {e}")
        logger.error(f"File processing error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
        logger.exception("Unexpected error occurred")
```

## Exception Best Practices

1. **Be Specific with Exception Types**: Catch specific exceptions rather than using bare `except:` statements.
   ```python
   # Good
   try:
       # code
   except ValueError:
       # handle ValueError
   
   # Bad
   try:
       # code
   except:  # Catches all exceptions, including KeyboardInterrupt, SystemExit
       # handle exception
   ```

2. **Use Context Managers**: Use `with` statements for resource management.
   ```python
   # Good
   with open('file.txt', 'r') as f:
       data = f.read()
   
   # Bad
   f = open('file.txt', 'r')
   try:
       data = f.read()
   finally:
       f.close()
   ```

3. **Only Catch Exceptions You Can Handle**: Don't catch exceptions you don't know how to handle properly.

4. **Clean Up Resources in Finally Blocks**: Make sure resources are properly released.

5. **Log Exceptions**: Always log exceptions for debugging.
   ```python
   import logging
   
   try:
       # code
   except Exception as e:
       logging.error(f"An error occurred: {e}", exc_info=True)
   ```

6. **Provide Useful Error Messages**: Make error messages clear and informative.

## Debugging with Exceptions

Python's traceback module can help format exception information for debugging:

```python
import traceback

def risky_function():
    return 1 / 0

try:
    risky_function()
except Exception as e:
    print("Error:", e)
    print("\nTraceback:")
    traceback.print_exc()
    
    # Or capture it as a string
    tb_str = traceback.format_exc()
    # Save to log file, etc.
```

## Comparing Python and JavaScript Error Handling

| Feature | JavaScript | Python |
|---------|------------|--------|
| Basic syntax | `try/catch/finally` | `try/except/else/finally` |
| Multiple error types | `if (e instanceof TypeError)` | `except (TypeError, ValueError):` |
| Getting error message | `e.message` | `str(e)` |
| Custom errors | `class CustomError extends Error {}` | `class CustomError(Exception): pass` |
| Cleanup pattern | `try/finally` | `with` statement or `try/finally` |
| Async errors | Promises with `.catch()` or `try/catch` with `async/await` | `try/except` with `async/await` |

## Conclusion

Python's exception handling system is robust and flexible, providing tools for handling errors gracefully and providing useful feedback to users and developers. By using custom exceptions and proper exception hierarchies, you can make your code more maintainable and error-resistant.

In the next chapter, we'll explore modules, packages, and Python environments, which are essential for organizing and managing your code as projects grow in complexity.
