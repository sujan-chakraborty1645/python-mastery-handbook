# Type Hints

Python's answer to TypeScript

## Introduction to Type Hints

Python 3.5+ supports optional type hints, similar to TypeScript for JavaScript. This helps with code documentation, IDE support, and catching errors early.

### Python Type Hints

```python
from typing import List, Dict, Optional, Union

def greet(name: str) -> str:
    return f'Hello, {name}!'

def process_users(users: List[Dict[str, str]]) -> Optional[str]:
    if not users:
        return None
    return users[0]['name']

# Union types (like TypeScript union)
def parse_input(value: Union[str, int]) -> str:
    return str(value)

# Optional is shorthand for Union[Type, None]
def get_user(user_id: int) -> Optional[Dict[str, str]]:
    # Return user or None if not found
    pass
```

### TypeScript

```typescript
interface User {
  name: string;
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}

function processUsers(users: User[]): string | null {
  if (users.length === 0) {
    return null;
  }
  return users[0].name;
}

// Union types
function parseInput(value: string | number): string {
  return String(value);
}

// Optional parameter
function getUser(userId: number): User | null {
  // Return user or null if not found
}
```

## Modern Python 3.9+ Syntax

Python 3.9+ introduced cleaner syntax for type hints, similar to how modern JavaScript evolved.

```python
# Modern Python type hints (3.9+)
def process_data(items: list[dict[str, str]]) -> str | None:
    if not items:
        return None
    return items[0]['name']

# Generic types
from typing import TypeVar, Generic

T = TypeVar('T')

class Container(Generic[T]):
    def __init__(self, item: T) -> None:
        self.item = item
    
    def get(self) -> T:
        return self.item

# Usage
string_container: Container[str] = Container('hello')
number_container: Container[int] = Container(42)
```
