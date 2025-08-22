# Modules, Packages & Virtual Environments

This chapter covers the Python module system, package organization, and virtual environment management—essential components for structuring maintainable projects and managing dependencies.

## Python Modules

A module is a file containing Python definitions and statements. The module name is the filename without the `.py` extension.

### Creating and Using Modules

Let's create a simple module:

```python
# math_utils.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

PI = 3.14159

if __name__ == "__main__":
    # This code only runs when the file is executed directly
    print(f"Testing add: {add(5, 3)}")
    print(f"Testing subtract: {subtract(10, 4)}")
```

Now we can import and use this module:

```python
# main.py
import math_utils

# Using functions from the module
result = math_utils.add(10, 5)
print(result)  # Output: 15

# Using constants
circle_circumference = 2 * math_utils.PI * 7
print(f"Circumference: {circle_circumference}")
```

### Import Styles

Python offers various ways to import modules:

```python
# Import the entire module
import math_utils

# Import specific items
from math_utils import add, subtract

# Import all items (not recommended in production code)
from math_utils import *

# Import with an alias
import math_utils as mu
print(mu.add(5, 3))

# Import with an item alias
from math_utils import add as addition
print(addition(5, 3))
```

### Module Search Path

Python searches for modules in:

1. The directory containing the script
2. Directories in the PYTHONPATH environment variable
3. Standard library directories
4. Site-packages directories (third-party packages)

You can check the search path:

```python
import sys
print(sys.path)
```

## Python Packages

A package is a way of organizing related modules in a directory hierarchy. A directory becomes a package when it contains a special file called `__init__.py`.

### Basic Package Structure

```
my_package/
├── __init__.py
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── module3.py
```

The `__init__.py` files can be empty or can initialize the package:

```python
# my_package/__init__.py
print("Initializing my_package")

# Import commonly used modules for convenience
from .module1 import function1
from .module2 import function2

# Define package-level variables
__version__ = '0.1'
```

### Importing from Packages

```python
# Import a specific module
import my_package.module1

# Import a specific function
from my_package.module1 import function1

# Import from a subpackage
from my_package.subpackage.module3 import function3

# Use the convenience imports defined in __init__.py
import my_package
my_package.function1()  # No need to import function1 explicitly
```

### Relative Imports

Within a package, you can use relative imports:

```python
# my_package/module1.py
from . import module2  # Import sibling module
from .subpackage import module3  # Import from subpackage
from .. import another_package  # Import from parent directory
```

## Creating a Package

Let's create a more complete example of a package:

```
math_toolkit/
├── __init__.py
├── basic.py
├── advanced.py
└── stats/
    ├── __init__.py
    ├── descriptive.py
    └── inferential.py
```

```python
# math_toolkit/__init__.py
"""A toolkit for mathematical operations."""

__version__ = '0.1.0'
__author__ = 'Your Name'

# Convenience imports
from .basic import add, subtract, multiply, divide
```

```python
# math_toolkit/basic.py
"""Basic mathematical operations."""

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

```python
# math_toolkit/advanced.py
"""Advanced mathematical operations."""

import math
from .basic import multiply

def square_root(x):
    if x < 0:
        raise ValueError("Cannot compute square root of negative number")
    return math.sqrt(x)

def power(base, exponent):
    return math.pow(base, exponent)

def factorial(n):
    if n < 0:
        raise ValueError("Factorial not defined for negative numbers")
    if n == 0:
        return 1
    return multiply(n, factorial(n-1))
```

```python
# math_toolkit/stats/__init__.py
"""Statistical functions."""

from .descriptive import mean, median, mode, std_dev
```

```python
# math_toolkit/stats/descriptive.py
"""Descriptive statistics functions."""

def mean(data):
    """Calculate the arithmetic mean of a list of numbers."""
    if not data:
        raise ValueError("Cannot calculate mean of empty data")
    return sum(data) / len(data)

def median(data):
    """Calculate the median of a list of numbers."""
    if not data:
        raise ValueError("Cannot calculate median of empty data")
    
    sorted_data = sorted(data)
    n = len(sorted_data)
    
    if n % 2 == 0:
        # Even number of elements
        return (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
    else:
        # Odd number of elements
        return sorted_data[n//2]

def mode(data):
    """Find the mode of a list of numbers."""
    if not data:
        raise ValueError("Cannot calculate mode of empty data")
    
    # Count occurrences of each value
    counts = {}
    for value in data:
        counts[value] = counts.get(value, 0) + 1
    
    # Find the value(s) with the highest count
    max_count = max(counts.values())
    modes = [value for value, count in counts.items() if count == max_count]
    
    return modes

def std_dev(data):
    """Calculate the standard deviation of a list of numbers."""
    if not data:
        raise ValueError("Cannot calculate standard deviation of empty data")
    
    # Calculate mean
    data_mean = mean(data)
    
    # Calculate sum of squared differences
    squared_diff_sum = sum((x - data_mean) ** 2 for x in data)
    
    # Return standard deviation
    return (squared_diff_sum / len(data)) ** 0.5
```

### Using Our Package

```python
# Using the package
from math_toolkit import add, subtract
from math_toolkit.advanced import square_root, factorial
from math_toolkit.stats import mean, median

# Basic operations
print(add(10, 5))       # Output: 15
print(subtract(10, 5))  # Output: 5

# Advanced operations
print(square_root(16))  # Output: 4.0
print(factorial(5))     # Output: 120

# Statistics
data = [4, 7, 2, 9, 3, 5, 8]
print(f"Mean: {mean(data)}")    # Output: Mean: 5.428571428571429
print(f"Median: {median(data)}") # Output: Median: 5
```

## Making Your Package Installable

To make your package installable with pip, you need to create a `setup.py` file:

```python
# setup.py
from setuptools import setup, find_packages

setup(
    name="math_toolkit",
    version="0.1.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="A toolkit for mathematical operations",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/math_toolkit",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
    install_requires=[
        # List dependencies here
        # "numpy>=1.20.0",
    ],
)
```

You should also create a README.md file with installation and usage instructions:

```markdown
# Math Toolkit

A Python package providing various mathematical operations.

## Installation

```bash
pip install math-toolkit
```

## Usage

```python
from math_toolkit import add, subtract
from math_toolkit.stats import mean

# Basic operations
result = add(10, 5)  # 15

# Statistics
data = [4, 7, 2, 9, 3, 5, 8]
average = mean(data)  # 5.428571428571429
```
```

## Python Virtual Environments

Virtual environments are isolated Python environments that allow you to install packages without affecting your system Python installation or other projects.

### Why Use Virtual Environments

1. **Isolation**: Each project can have its own dependencies
2. **Consistency**: Ensures all developers use the same package versions
3. **Clean Development**: Prevents cluttering your system Python installation
4. **Version Control**: Different projects can use different versions of the same package

### Virtual Environment Tools

Python offers several tools for creating virtual environments:

1. **venv** (built-in since Python 3.3)
2. **virtualenv** (third-party, more features)
3. **conda** (part of the Anaconda distribution, handles non-Python dependencies)
4. **pipenv** (combines pip and virtualenv)
5. **poetry** (modern dependency management)

### Using venv

Creating and activating a virtual environment with `venv`:

```bash
# Create a virtual environment
python -m venv myenv

# Activate on Windows
myenv\\Scripts\\activate

# Activate on macOS/Linux
source myenv/bin/activate

# Your prompt will change to show the active environment
(myenv) $

# Install packages
pip install requests numpy

# List installed packages
pip list

# Generate requirements.txt
pip freeze > requirements.txt

# Deactivate when done
deactivate
```

### Using virtualenv

```bash
# Install virtualenv
pip install virtualenv

# Create a virtual environment
virtualenv myproject_env

# Activate (same as venv)
source myproject_env/bin/activate  # Linux/macOS
myproject_env\\Scripts\\activate    # Windows

# Deactivate
deactivate
```

### Using conda

```bash
# Create a conda environment
conda create --name myproject_env python=3.9

# Activate
conda activate myproject_env

# Install packages
conda install numpy pandas matplotlib

# List installed packages
conda list

# Export environment
conda env export > environment.yml

# Deactivate
conda deactivate
```

### Using pipenv

```bash
# Install pipenv
pip install pipenv

# Create a project and virtual environment
mkdir my_project
cd my_project
pipenv install

# Install packages
pipenv install requests numpy

# Activate environment
pipenv shell

# Install dev packages
pipenv install pytest --dev

# Exit
exit
```

### Using poetry

```bash
# Install poetry
pip install poetry

# Create a new project
poetry new my_project
cd my_project

# Install dependencies
poetry add requests numpy

# Activate environment
poetry shell

# Add dev dependencies
poetry add pytest --dev

# Exit
exit
```

## Managing Project Dependencies

### Requirements Files

The standard way to specify dependencies is with a `requirements.txt` file:

```
# requirements.txt
requests==2.28.1
numpy>=1.22.0,<2.0.0
pandas>=1.4.0
matplotlib~=3.5.0
```

Install from requirements file:

```bash
pip install -r requirements.txt
```

### Using setup.py for Dependencies

```python
# setup.py
setup(
    # ...
    install_requires=[
        "requests>=2.28.0",
        "numpy>=1.22.0",
        "pandas>=1.4.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "black",
            "flake8",
        ],
        "doc": [
            "sphinx",
            "sphinx-rtd-theme",
        ],
    },
)
```

### Modern Tools

Modern dependency management tools like Poetry and Pipenv use more sophisticated lock files to ensure reproducible environments:

```toml
# pyproject.toml (for Poetry)
[tool.poetry]
name = "my_project"
version = "0.1.0"
description = "My awesome project"
authors = ["Your Name <your.email@example.com>"]

[tool.poetry.dependencies]
python = "^3.9"
requests = "^2.28.1"
numpy = "^1.22.0"

[tool.poetry.dev-dependencies]
pytest = "^7.0.0"
black = "^22.6.0"
```

## Organizing Large Projects

As projects grow, good organization becomes critical. Here's a recommended structure for larger projects:

```
project_name/
├── LICENSE
├── README.md
├── pyproject.toml (or setup.py)
├── .gitignore
├── docs/
│   ├── conf.py
│   └── index.rst
├── project_name/
│   ├── __init__.py
│   ├── core.py
│   ├── helpers.py
│   └── subpackage/
│       ├── __init__.py
│       └── module.py
├── tests/
│   ├── __init__.py
│   ├── test_core.py
│   └── test_helpers.py
└── examples/
    └── example_basic_usage.py
```

## Python Project Tools

### pyproject.toml

PEP 518 introduced `pyproject.toml` as a standard configuration file for Python projects:

```toml
[build-system]
requires = ["setuptools>=42", "wheel"]
build-backend = "setuptools.build_meta"

[tool.black]
line-length = 88
target-version = ['py39']
include = '\.pyi?$'

[tool.isort]
profile = "black"
multi_line_output = 3

[tool.pytest.ini_options]
minversion = "6.0"
addopts = "-ra -v"
testpaths = ["tests"]
```

### Linting and Formatting Tools

```bash
# Install tools
pip install black isort flake8 mypy

# Run black formatter
black my_package/

# Sort imports
isort my_package/

# Run linter
flake8 my_package/

# Type checking
mypy my_package/
```

## Distributing Python Packages

### Building a Package

```bash
# Install build tools
pip install build

# Build package
python -m build

# This creates:
# - dist/my_package-0.1.0.tar.gz (source distribution)
# - dist/my_package-0.1.0-py3-none-any.whl (wheel distribution)
```

### Publishing to PyPI

```bash
# Install twine
pip install twine

# Check distribution
twine check dist/*

# Upload to TestPyPI
twine upload --repository testpypi dist/*

# Upload to PyPI
twine upload dist/*
```

## Best Practices for Python Projects

1. **Use Virtual Environments**: Always create a virtual environment for each project.

2. **Specify Dependencies Clearly**: Be explicit about version requirements.

3. **Structure Your Project Properly**: Follow the standard project layout.

4. **Include Documentation**: Add docstrings and a README file.

5. **Write Tests**: Use pytest or unittest for testing.

6. **Use Version Control**: Track changes with Git.

7. **Use a .gitignore File**: Exclude virtual environments, build files, and caches.

8. **Separate Development and Production Dependencies**: Keep testing and development tools separate.

9. **Use Semantic Versioning**: Follow the MAJOR.MINOR.PATCH versioning scheme.

10. **Configure CI/CD**: Set up continuous integration and deployment.

## Comparing Python and JavaScript Package Management

| Feature | Python | JavaScript |
|---------|--------|------------|
| Package manager | pip, conda | npm, yarn |
| Virtual environments | venv, virtualenv | nvm (for Node versions) |
| Package repository | PyPI | npm Registry |
| Lock file | poetry.lock, Pipfile.lock | package-lock.json, yarn.lock |
| Dependencies file | requirements.txt, pyproject.toml | package.json |
| Package creation | setuptools, poetry | npm init |
| Entry points | `__main__.py` | main/bin in package.json |

## Conclusion

Python's module and package system provides a robust way to organize and share code. Combined with virtual environments for dependency management, you have all the tools needed to create well-structured, maintainable projects.

In the next chapter, we'll explore context managers, which provide elegant ways to manage resources like files, connections, and locks.
