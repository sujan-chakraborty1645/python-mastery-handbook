# Object-Oriented Programming in Python

A comprehensive guide to OOP concepts and implementation with practical examples for JavaScript developers

## Introduction to Object-Oriented Programming

Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects rather than functions and logic. Think of it as building digital versions of real-world objects that have both properties (data) and behaviors (methods).

### Real-World Analogy: A Coffee Machine

Think of a coffee machine in your kitchen:
- It has **properties**: water level, coffee bean quantity, temperature
- It has **behaviors**: brew coffee, steam milk, clean itself
- It has a **state**: on/off, brewing/idle, clean/needs cleaning

In OOP, we'd model this as a class:

```python
class CoffeeMachine:
    def __init__(self, brand, water_level=0, coffee_amount=0):
        self.brand = brand
        self.water_level = water_level  # in ml
        self.coffee_amount = coffee_amount  # in grams
        self.is_on = False
        self.temperature = 20  # room temperature in Celsius
    
    def turn_on(self):
        self.is_on = True
        self.temperature = 90
        print(f"{self.brand} coffee machine is now on and heating up!")
    
    def brew_coffee(self, cup_size):
        if not self.is_on:
            print("Please turn on the machine first!")
            return False
        
        if self.water_level < cup_size:
            print("Not enough water!")
            return False
        
        coffee_needed = cup_size / 10  # 1g of coffee per 10ml of water
        if self.coffee_amount < coffee_needed:
            print("Not enough coffee beans!")
            return False
        
        # Make coffee
        self.water_level -= cup_size
        self.coffee_amount -= coffee_needed
        print(f"Brewing {cup_size}ml of delicious coffee!")
        return True
    
    def add_water(self, amount):
        self.water_level += amount
        print(f"Added {amount}ml of water. Current level: {self.water_level}ml")

# Create a coffee machine object
my_machine = CoffeeMachine("Nespresso", water_level=200, coffee_amount=30)

# Use the coffee machine
my_machine.turn_on()
my_machine.brew_coffee(50)  # Success!
my_machine.brew_coffee(200) # Not enough water!
my_machine.add_water(300)   # Add more water
my_machine.brew_coffee(150) # Success!
```

### Why Use OOP?

When moving from JavaScript to Python, you'll find that Python's OOP approach is more structured. Here's why OOP is valuable:

1. **Organization**: Code is grouped into logical units (objects)
2. **Reusability**: Write once, use many times
3. **Maintenance**: Changes in one area don't affect others
4. **Scalability**: Easier to build and expand complex applications

### OOP vs Procedural Programming

Let's compare approaches to understand the difference using a task management system:

```python
# Procedural approach - Task Management
tasks = []

def add_task(title, description, priority=1):
    task = {
        "title": title,
        "description": description,
        "priority": priority,
        "completed": False,
        "created_at": "2025-08-21"  # Hardcoded for simplicity
    }
    tasks.append(task)
    return len(tasks) - 1  # Return the index

def complete_task(task_index):
    if 0 <= task_index < len(tasks):
        tasks[task_index]["completed"] = True
        print(f"Task '{tasks[task_index]['title']}' marked as completed!")
    else:
        print("Invalid task index")

def display_task(task_index):
    if 0 <= task_index < len(tasks):
        task = tasks[task_index]
        status = "✓" if task["completed"] else "○"
        print(f"{status} {task['title']} (Priority: {task['priority']})")
        print(f"   {task['description']}")
    else:
        print("Invalid task index")

# Using the procedural approach
task1 = add_task("Buy groceries", "Milk, bread, eggs")
task2 = add_task("Call mom", "Discuss weekend plans", 2)

display_task(task1)  # ○ Buy groceries (Priority: 1)
                     #   Milk, bread, eggs
complete_task(task1)
display_task(task1)  # ✓ Buy groceries (Priority: 1)
                     #   Milk, bread, eggs


# OOP approach - Task Management
class Task:
    def __init__(self, title, description, priority=1):
        self.title = title
        self.description = description
        self.priority = priority
        self.completed = False
        self.created_at = "2025-08-21"  # Hardcoded for simplicity
    
    def complete(self):
        self.completed = True
        print(f"Task '{self.title}' marked as completed!")
    
    def display(self):
        status = "✓" if self.completed else "○"
        print(f"{status} {self.title} (Priority: {self.priority})")
        print(f"   {self.description}")

class TaskManager:
    def __init__(self):
        self.tasks = []
    
    def add_task(self, title, description, priority=1):
        task = Task(title, description, priority)
        self.tasks.append(task)
        return task
    
    def display_all(self):
        if not self.tasks:
            print("No tasks available")
            return
            
        print(f"You have {len(self.tasks)} tasks:")
        for task in self.tasks:
            task.display()

# Using the OOP approach
manager = TaskManager()
grocery_task = manager.add_task("Buy groceries", "Milk, bread, eggs")
manager.add_task("Call mom", "Discuss weekend plans", 2)

grocery_task.display()  # ○ Buy groceries (Priority: 1)
                        #   Milk, bread, eggs
grocery_task.complete()
manager.display_all()   # Displays all tasks with updated status
```

The OOP approach:
1. **Bundles data with behavior**: Each task knows how to complete itself or display itself
2. **Prevents errors**: No need to look up tasks by index which could be invalid
3. **Adds structure**: The TaskManager organizes all tasks in one place
4. **Improves readability**: Code reads like plain English - "task.complete()" is intuitive

## Classes and Objects

In Python, a class is like a blueprint, while an object is an instance created from that blueprint.

### Creating Your First Class: A Simple Note-Taking App

Let's build a small note-taking app to understand classes and objects:

```python
class Note:
    # Class attribute - shared by all notes
    app_name = "PyNotes"
    
    # Constructor method - runs when you create a new note
    def __init__(self, title, content, category="General"):
        # Instance attributes - unique to each note
        self.title = title
        self.content = content
        self.category = category
        self.created_at = "2025-08-21"  # Simplified for example
        self.is_archived = False
        self.tags = []
    
    # Instance methods - actions the note can perform
    def archive(self):
        self.is_archived = True
        print(f"Note '{self.title}' has been archived.")
    
    def unarchive(self):
        self.is_archived = False
        print(f"Note '{self.title}' has been restored from archive.")
    
    def add_tag(self, tag):
        if tag not in self.tags:
            self.tags.append(tag)
            print(f"Added tag '{tag}' to note '{self.title}'")
        else:
            print(f"Tag '{tag}' already exists on this note")
    
    def display(self):
        status = "Archived" if self.is_archived else "Active"
        print(f"--- {self.title} ({status}) ---")
        print(f"Category: {self.category}")
        if self.tags:
            print(f"Tags: {', '.join(self.tags)}")
        print(f"\n{self.content}\n")


# Creating note objects (instances) from the Note class
meeting_note = Note("Team Meeting", "Discussed Q3 goals and action items", "Work")
shopping_note = Note("Shopping List", "Milk, Eggs, Bread", "Personal")

# Adding tags to notes
meeting_note.add_tag("important")
meeting_note.add_tag("team")
shopping_note.add_tag("errands")

# Accessing object attributes
print(meeting_note.title)  # Team Meeting
print(shopping_note.category)  # Personal
print(Note.app_name)  # PyNotes (class attribute accessed through the class)
print(meeting_note.app_name)  # PyNotes (class attribute accessed through an instance)

# Using object methods
meeting_note.display()
# --- Team Meeting (Active) ---
# Category: Work
# Tags: important, team
#
# Discussed Q3 goals and action items

meeting_note.archive()  # Note 'Team Meeting' has been archived.
meeting_note.display()
# --- Team Meeting (Archived) ---
# Category: Work
# Tags: important, team
#
# Discussed Q3 goals and action items

# Each instance has its own state
print(meeting_note.is_archived)  # True
print(shopping_note.is_archived)  # False
```

This example demonstrates:
1. Class creation with both class and instance attributes
2. Object instantiation with different initial values
3. Methods that modify the object's state
4. Method that displays the object's data in a formatted way

## Properties and Methods

### Understanding `self` and Constructor: `__init__`

The `self` parameter refers to the specific instance of the class - it's like JavaScript's `this` but in Python, you must explicitly include it as the first parameter in all instance methods.

The `__init__` method is Python's constructor - it runs automatically when you create a new object:

```python
class SmartDevice:
    def __init__(self, name, device_type):
        # This runs when we create a new device
        print(f"Setting up your {device_type}: {name}")
        self.name = name
        self.device_type = device_type
        self.is_on = False
        self.battery = 100
    
    def turn_on(self):
        # self refers to the specific device instance
        if not self.is_on:
            self.is_on = True
            print(f"{self.name} is now on")
        else:
            print(f"{self.name} is already on")
    
    def turn_off(self):
        if self.is_on:
            self.is_on = False
            print(f"{self.name} is now off")
        else:
            print(f"{self.name} is already off")
    
    def check_battery(self):
        print(f"{self.name} battery level: {self.battery}%")
        
        # Self allows one method to call another method
        if self.battery < 20:
            self.low_battery_alert()
    
    def low_battery_alert(self):
        print(f"⚠️ {self.name} is low on battery!")

# Create two different devices
my_speaker = SmartDevice("Living Room Speaker", "speaker")
# "Setting up your speaker: Living Room Speaker" is printed

my_thermostat = SmartDevice("Hallway Thermostat", "thermostat")
# "Setting up your thermostat: Hallway Thermostat" is printed

# Each device has its own separate state
my_speaker.turn_on()  # Living Room Speaker is now on
my_thermostat.check_battery()  # Hallway Thermostat battery level: 100%

# Modify one instance - doesn't affect the other
my_speaker.battery = 15
my_speaker.check_battery()  # Living Room Speaker battery level: 15%
                           # ⚠️ Living Room Speaker is low on battery!

my_thermostat.check_battery()  # Still at 100%: Hallway Thermostat battery level: 100%

# Both are instances of SmartDevice but behave independently
print(type(my_speaker))  # <class '__main__.SmartDevice'>
print(type(my_thermostat))  # <class '__main__.SmartDevice'>
print(my_speaker is my_thermostat)  # False - they are different objects
```

This example clearly shows how:
1. `self` refers to the specific instance (my_speaker or my_thermostat)
2. The `__init__` constructor initializes each new object
3. Each object maintains its own independent state
4. Methods use `self` to access the object's attributes

## Properties and Methods

### Instance Attributes vs. Class Attributes

Here's a practical example showing the difference between instance attributes (unique to each object) and class attributes (shared by all instances):

```python
class Student:
    # Class attributes - shared by all students
    school_name = "Python High School"
    school_address = "123 Coding Lane"
    total_students = 0
    
    def __init__(self, name, grade):
        # Instance attributes - unique to each student
        self.name = name
        self.grade = grade
        self.courses = []
        self.gpa = 0.0
        
        # Update the class attribute when creating a new student
        Student.total_students += 1
    
    def add_course(self, course, grade):
        self.courses.append({"course": course, "grade": grade})
        # Recalculate GPA
        total_points = sum(c["grade"] for c in self.courses)
        self.gpa = total_points / len(self.courses) if self.courses else 0
    
    def get_student_info(self):
        return f"{self.name} (Grade {self.grade}) - GPA: {self.gpa:.2f}"
    
    @classmethod
    def get_school_info(cls):
        # This method uses the class attribute
        return f"{cls.school_name} at {cls.school_address} has {cls.total_students} students"


# Create student objects
alice = Student("Alice Johnson", 10)
bob = Student("Bob Smith", 11)
charlie = Student("Charlie Brown", 9)

# Add courses and grades for students
alice.add_course("Python 101", 3.8)
alice.add_course("Math", 4.0)
bob.add_course("Web Development", 3.7)

# Access instance attributes (different for each student)
print(alice.name)      # "Alice Johnson"
print(bob.name)        # "Bob Smith"
print(alice.gpa)       # 3.9
print(bob.gpa)         # 3.7

# Access class attributes (same for all students)
print(alice.school_name)    # "Python High School"
print(bob.school_name)      # "Python High School"
print(Student.school_name)  # "Python High School"

# Class attribute tracking total students
print(Student.total_students)  # 3

# What if we try to modify a class attribute through an instance?
alice.school_name = "Alice's School"  # This creates a new instance attribute!
print(alice.school_name)     # "Alice's School"
print(bob.school_name)       # "Python High School" (unchanged)
print(Student.school_name)   # "Python High School" (unchanged)

# The proper way to update a class attribute is through the class itself
Student.school_name = "Python Academy"
print(bob.school_name)       # "Python Academy"
print(charlie.school_name)   # "Python Academy"
print(alice.school_name)     # "Alice's School" (instance attribute takes precedence)

# Using the class method
print(Student.get_school_info())  # Python Academy at 123 Coding Lane has 3 students
```

This example demonstrates:
1. Class attributes (shared data): `school_name`, `school_address`, `total_students`
2. Instance attributes (individual data): `name`, `grade`, `courses`, `gpa`
3. How class attributes can be used to track information across all instances
4. The difference between modifying a class attribute properly vs. accidentally creating an instance attribute
5. Using `@classmethod` to work with class attributes

### Instance Methods, Class Methods, and Static Methods

Python supports three types of methods in classes. Let's build a weather tracking application to demonstrate the differences:

```python
import random  # Just for demo purposes to generate random temperatures

class WeatherStation:
    # Class attributes
    all_stations = []
    temperature_unit = "Celsius"  # Default unit
    
    def __init__(self, station_id, location):
        # Instance attributes
        self.station_id = station_id
        self.location = location
        self.temperature_readings = []
        self.is_active = True
        
        # Add this station to the class list
        WeatherStation.all_stations.append(self)
    
    # Instance method - works with a specific weather station
    def record_temperature(self, temperature):
        """Record a new temperature reading for this station"""
        if not self.is_active:
            print(f"Station {self.station_id} is inactive. Reading rejected.")
            return False
            
        self.temperature_readings.append(temperature)
        print(f"Recorded {temperature}°{WeatherStation.temperature_unit} at {self.location}")
        return True
    
    def get_average_temperature(self):
        """Calculate average temperature for this specific station"""
        if not self.temperature_readings:
            return None
        return sum(self.temperature_readings) / len(self.temperature_readings)
    
    # Class method - works with the class itself, not a specific instance
    @classmethod
    def change_temperature_unit(cls, new_unit):
        """Change the temperature unit for all stations"""
        if new_unit in ["Celsius", "Fahrenheit"]:
            old_unit = cls.temperature_unit
            cls.temperature_unit = new_unit
            print(f"Changed temperature unit from {old_unit} to {new_unit} for all stations")
            return True
        else:
            print("Invalid temperature unit")
            return False
    
    @classmethod
    def get_all_active_stations(cls):
        """Get a list of all active weather stations"""
        return [station for station in cls.all_stations if station.is_active]
    
    # Static method - utility function related to weather but not tied to any specific instance
    @staticmethod
    def celsius_to_fahrenheit(celsius):
        """Convert Celsius to Fahrenheit"""
        return (celsius * 9/5) + 32
    
    @staticmethod
    def fahrenheit_to_celsius(fahrenheit):
        """Convert Fahrenheit to Celsius"""
        return (fahrenheit - 32) * 5/9


# Create some weather stations
station1 = WeatherStation("NYC001", "Central Park, NY")
station2 = WeatherStation("SF001", "Golden Gate Park, SF")

# Use instance methods - specific to each station
station1.record_temperature(22.5)  # "Recorded 22.5°Celsius at Central Park, NY"
station1.record_temperature(23.1)
station1.record_temperature(21.8)

station2.record_temperature(18.2)  # "Recorded 18.2°Celsius at Golden Gate Park, SF"
station2.record_temperature(17.9)

# Get instance-specific data
print(f"Average temperature at {station1.location}: {station1.get_average_temperature():.1f}°{WeatherStation.temperature_unit}")
# "Average temperature at Central Park, NY: 22.5°Celsius"

# Use a class method to change settings for ALL stations
WeatherStation.change_temperature_unit("Fahrenheit")

# Now all stations use the new unit
station1.record_temperature(75.2)  # "Recorded 75.2°Fahrenheit at Central Park, NY"
station2.record_temperature(68.4)  # "Recorded 68.4°Fahrenheit at Golden Gate Park, SF"

# Use static methods - utility functions that don't need an instance
temp_c = 25
temp_f = WeatherStation.celsius_to_fahrenheit(temp_c)
print(f"{temp_c}°C = {temp_f}°F")  # "25°C = 77.0°F"

# Get a list of all active stations using a class method
active_stations = WeatherStation.get_all_active_stations()
print(f"There are {len(active_stations)} active weather stations")  # "There are 2 active weather stations"
```

This example clearly demonstrates:

1. **Instance Methods** (default) - Work with individual object data:
   - `record_temperature()` and `get_average_temperature()` operate on a specific station
   - They use `self` to access and modify that specific station's data

2. **Class Methods** - Work with class-level data:
   - `change_temperature_unit()` affects all stations at once
   - `get_all_active_stations()` returns information about all stations
   - Use `@classmethod` decorator and receive `cls` as first parameter instead of `self`
   
3. **Static Methods** - Utility functions related to the class:
   - `celsius_to_fahrenheit()` and `fahrenheit_to_celsius()` are utility functions
   - Don't access instance or class state (no `self` or `cls` parameters)
   - Use `@staticmethod` decorator
   - Could exist outside the class but are included for logical organization

### Property Decorators

Properties allow you to use methods like attributes while adding validation or computed values. Let's build a practical media library example:

```python
class MediaLibraryItem:
    """Base class for items in a media library"""
    def __init__(self, title, year, rating=None):
        self._title = title
        self._year = year
        self._rating = rating  # Rating from 1-5 stars
        self._play_count = 0
    
    @property
    def title(self):
        """Get the title of the media item"""
        return self._title
    
    @title.setter
    def title(self, new_title):
        """Set the title with validation"""
        if not new_title or len(new_title) < 2:
            raise ValueError("Title cannot be empty or too short")
        self._title = new_title
    
    @property
    def rating(self):
        """Get the user rating"""
        if self._rating is None:
            return "Not rated yet"
        return f"{self._rating}/5 stars"
    
    @rating.setter
    def rating(self, value):
        """Set rating with validation"""
        if value is not None and (value < 1 or value > 5):
            raise ValueError("Rating must be between 1 and 5 stars")
        self._rating = value
    
    @property
    def play_count(self):
        """Get the number of times this item was played"""
        return self._play_count
    
    def play(self):
        """Play the media item, incrementing the play count"""
        self._play_count += 1
        print(f"Playing: {self._title} ({self._year})")
    
    @property
    def is_popular(self):
        """Computed property: item is popular if play count >= 5 or rating >= 4"""
        high_rating = self._rating is not None and self._rating >= 4
        return self._play_count >= 5 or high_rating


class Movie(MediaLibraryItem):
    def __init__(self, title, year, director, runtime, rating=None):
        super().__init__(title, year, rating)
        self._director = director
        self._runtime = runtime  # in minutes
    
    @property
    def director(self):
        return self._director
    
    @property
    def runtime(self):
        """Get the formatted runtime in hours and minutes"""
        hours = self._runtime // 60
        minutes = self._runtime % 60
        if hours > 0:
            return f"{hours}h {minutes}m"
        return f"{minutes}m"
    
    @runtime.setter
    def runtime(self, minutes):
        """Set the runtime with validation"""
        if minutes <= 0:
            raise ValueError("Runtime must be positive")
        self._runtime = minutes


# Create media items
inception = Movie("Inception", 2010, "Christopher Nolan", 148)
interstellar = Movie("Interstellar", 2014, "Christopher Nolan", 169, 5)

# Using properties like attributes
print(inception.title)    # "Inception"
print(inception.runtime)  # "2h 28m"
print(inception.rating)   # "Not rated yet"

# Set properties with validation
inception.rating = 4
print(inception.rating)   # "4/5 stars"

# Validation in action
try:
    inception.rating = 6  # Raises ValueError
except ValueError as e:
    print(f"Error: {e}")  # "Error: Rating must be between 1 and 5 stars"

# Accessing computed properties
print(f"Is Inception popular? {inception.is_popular}")  # True (rating is 4)
print(f"Is Interstellar popular? {interstellar.is_popular}")  # True (rating is 5)

# Play movies multiple times
for _ in range(3):
    inception.play()

print(f"Inception play count: {inception.play_count}")  # 3

# Try an invalid title change
try:
    inception.title = ""  # Raises ValueError
except ValueError as e:
    print(f"Error: {e}")  # "Error: Title cannot be empty or too short"
```

This example demonstrates properties for:

1. **Data validation**: Ensures ratings are between 1-5, titles aren't empty, etc.
2. **Computed attributes**: `is_popular` is calculated based on other properties
3. **Formatted output**: `runtime` converts minutes to a formatted string
4. **Data encapsulation**: Underscore prefix (`_title`) indicates private attributes
5. **Read-only properties**: `play_count` can only be increased through the `play()` method

Properties give you the convenience of attribute access with the control of method calls.

## Special Methods

Python classes have special methods (also called "dunder" or "magic" methods) that control how objects behave.

### String Representation with `__str__` and `__repr__`

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def __str__(self):
        """Return a user-friendly string representation"""
        return f"{self.name} (${self.price:.2f})"
    
    def __repr__(self):
        """Return a developer-friendly string representation"""
        return f"Product('{self.name}', {self.price})"

laptop = Product("Laptop", 999.99)
print(laptop)          # Laptop ($999.99) - uses __str__
print(repr(laptop))    # Product('Laptop', 999.99) - uses __repr__
```

### Operator Overloading

You can define how operators work with your objects:

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        """Add two vectors together with the + operator"""
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        """Subtract vectors with the - operator"""
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        """Multiply vector by a scalar with the * operator"""
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        """Compare vectors with == operator"""
        return self.x == other.x and self.y == other.y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(3, 4)

print(v1 + v2)      # Vector(5, 7)
print(v2 - v1)      # Vector(1, 1)
print(v1 * 3)       # Vector(6, 9)
print(v1 == Vector(2, 3))  # True
```

### Length and Container Methods

```python
class Playlist:
    def __init__(self, name, songs=None):
        self.name = name
        self.songs = songs if songs else []
    
    def __len__(self):
        """Return the number of songs with the len() function"""
        return len(self.songs)
    
    def __getitem__(self, index):
        """Allow accessing songs with indexing: playlist[0]"""
        return self.songs[index]
    
    def __contains__(self, song):
        """Allow using 'in' operator: 'song in playlist'"""
        return song in self.songs

my_playlist = Playlist("Road Trip", ["Highway to Hell", "Born to Run", "On the Road Again"])
print(len(my_playlist))  # 3
print(my_playlist[1])    # Born to Run
print("Highway to Hell" in my_playlist)  # True
print("Stairway to Heaven" in my_playlist)  # False
```

## Inheritance and Polymorphism

### Basic Inheritance

Inheritance allows a class to inherit attributes and methods from another class:

```python
class Animal:
    def __init__(self, species, name, sound):
        self.species = species
        self.name = name
        self.sound = sound
    
    def make_sound(self):
        print(f"{self.name} the {self.species} says: {self.sound}")
    
    def describe(self):
        return f"{self.name} is a {self.species}"


# Child class inherits from Animal
class Cat(Animal):
    def __init__(self, name, breed):
        # Initialize the parent class
        super().__init__("cat", name, "meow")
        # Add cat-specific attribute
        self.breed = breed
    
    def purr(self):
        print(f"{self.name} is purring...")


# Child class inherits from Animal
class Dog(Animal):
    def __init__(self, name, breed):
        # Initialize the parent class with dog-specific values
        super().__init__("dog", name, "woof")
        self.breed = breed
    
    # Override the parent's method
    def describe(self):
        return f"{self.name} is a {self.breed} {self.species}"
    
    def fetch(self):
        print(f"{self.name} is fetching...")


# Create instances
my_cat = Cat("Whiskers", "Siamese")
my_dog = Dog("Buddy", "Golden Retriever")

# Use methods from the parent class
my_cat.make_sound()  # Whiskers the cat says: meow
my_dog.make_sound()  # Buddy the dog says: woof

# Use child-specific methods
my_cat.purr()        # Whiskers is purring...
my_dog.fetch()       # Buddy is fetching...

# Parent method used directly
print(my_cat.describe())  # Whiskers is a cat

# Overridden method
print(my_dog.describe())  # Buddy is a Golden Retriever dog
```

### Method Resolution Order (MRO)

When a class inherits from multiple parents, Python follows a specific order called Method Resolution Order (MRO) to determine which method to call:

```python
class A:
    def who_am_i(self):
        return "I am A"

class B(A):
    def who_am_i(self):
        return "I am B"

class C(A):
    def who_am_i(self):
        return "I am C"

class D(B, C):
    pass

# Print the MRO (Method Resolution Order)
print(D.mro())
# [<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>]

# Create an instance of D
d = D()
print(d.who_am_i())  # "I am B" - B comes before C in the MRO
```

### Polymorphism

Polymorphism allows objects of different classes to be treated as objects of a common superclass:

```python
class Shape:
    def area(self):
        pass

    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        import math
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        import math
        return 2 * math.pi * self.radius

# Function that can work with any shape
def print_shape_info(shape):
    print(f"Area: {shape.area()}")
    print(f"Perimeter: {shape.perimeter()}")

# Create shapes
rect = Rectangle(5, 10)
circ = Circle(7)

# Use polymorphism - the same function works with different shape types
print_shape_info(rect)
print_shape_info(circ)
```

## Encapsulation and Access Modifiers

Python uses naming conventions rather than strict access modifiers like in Java:

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name           # Public attribute
        self._department = "IT"    # Protected attribute (convention)
        self.__salary = salary     # Private attribute (name mangling)
    
    def get_salary(self):
        return self.__salary
    
    def set_salary(self, salary):
        if salary > 0:
            self.__salary = salary
        else:
            print("Salary must be positive")

emp = Employee("John", 50000)
print(emp.name)        # Public: John
print(emp._department) # Protected: IT (accessible but convention says don't touch)
# print(emp.__salary)  # This would raise AttributeError

# Correct way to access private attribute
print(emp.get_salary())  # 50000

# Name mangling - Python's internal implementation of private attributes
# (This is not the intended way to access private attributes)
print(emp._Employee__salary)  # 50000
```

## Abstract Classes and Interfaces

Python supports abstract classes through the `abc` module:

```python
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass
    
    @abstractmethod
    def refund(self, amount):
        pass


class CreditCardProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing ${amount} via Credit Card")
        # Credit card processing logic
        return True
    
    def refund(self, amount):
        print(f"Refunding ${amount} to Credit Card")
        # Credit card refund logic
        return True


class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing ${amount} via PayPal")
        # PayPal processing logic
        return True
    
    def refund(self, amount):
        print(f"Refunding ${amount} to PayPal")
        # PayPal refund logic
        return True


# This would raise TypeError because PaymentProcessor is abstract
# processor = PaymentProcessor()

# Create concrete implementations
cc_processor = CreditCardProcessor()
paypal_processor = PayPalProcessor()

# Process payments through different processors
cc_processor.process_payment(100)  # Processing $100 via Credit Card
paypal_processor.process_payment(50)  # Processing $50 via PayPal
```

## Composition vs. Inheritance

Composition is an alternative to inheritance that involves building complex objects from simpler ones:

```python
class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower
    
    def start(self):
        return "Engine started"
    
    def stop(self):
        return "Engine stopped"


class Wheels:
    def __init__(self, count=4):
        self.count = count
    
    def rotate(self):
        return f"{self.count} wheels rotating"


class Car:
    def __init__(self, make, model, horsepower):
        self.make = make
        self.model = model
        # Composition - Car HAS-A Engine
        self.engine = Engine(horsepower)
        # Composition - Car HAS-A Wheels
        self.wheels = Wheels(4)
    
    def start(self):
        print(f"Starting {self.make} {self.model}")
        print(self.engine.start())
        return "Car ready to drive"
    
    def drive(self):
        print(self.wheels.rotate())
        return f"Driving {self.make} {self.model}"


# Create a car
my_car = Car("Toyota", "Corolla", 150)

# Use the composed objects
print(my_car.start())
# Starting Toyota Corolla
# Engine started
# Car ready to drive

print(my_car.drive())
# 4 wheels rotating
# Driving Toyota Corolla
```

## Real-World Example: E-Commerce System

Let's see how OOP concepts come together in a more complex example:

```python
from abc import ABC, abstractmethod
from datetime import datetime


class User:
    def __init__(self, user_id, name, email):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.is_active = True
        self.created_at = datetime.now()
    
    def __str__(self):
        return f"User: {self.name} ({self.email})"
    
    def deactivate(self):
        self.is_active = False
        print(f"User {self.name} has been deactivated.")
    
    def reactivate(self):
        self.is_active = True
        print(f"User {self.name} has been reactivated.")


class Customer(User):
    def __init__(self, user_id, name, email):
        super().__init__(user_id, name, email)
        self.cart = ShoppingCart()
        self.orders = []
    
    def add_to_cart(self, product, quantity=1):
        self.cart.add_item(product, quantity)
    
    def place_order(self, payment_method):
        if not self.cart.items:
            print("Cannot place order with empty cart.")
            return None
        
        order = Order(self, self.cart.items.copy(), payment_method)
        self.orders.append(order)
        self.cart.clear()
        print(f"Order #{order.order_id} placed successfully!")
        return order


class Product:
    def __init__(self, product_id, name, price, description="", stock=0):
        self.product_id = product_id
        self.name = name
        self.price = price
        self.description = description
        self.stock = stock
        self.is_active = True
    
    def __str__(self):
        return f"{self.name} (${self.price:.2f})"
    
    def update_stock(self, quantity):
        self.stock = max(0, self.stock + quantity)
        if self.stock == 0:
            print(f"{self.name} is out of stock!")
    
    def is_available(self):
        return self.is_active and self.stock > 0


class ShoppingCart:
    def __init__(self):
        self.items = {}  # product_id -> {"product": product, "quantity": quantity}
    
    def add_item(self, product, quantity=1):
        if not product.is_available() or product.stock < quantity:
            print(f"Cannot add {product.name}. Product unavailable or insufficient stock.")
            return False
        
        if product.product_id in self.items:
            self.items[product.product_id]["quantity"] += quantity
        else:
            self.items[product.product_id] = {"product": product, "quantity": quantity}
        
        print(f"Added {quantity} x {product.name} to cart.")
        return True
    
    def remove_item(self, product_id):
        if product_id in self.items:
            product_name = self.items[product_id]["product"].name
            del self.items[product_id]
            print(f"Removed {product_name} from cart.")
            return True
        return False
    
    def get_total(self):
        total = 0
        for item_data in self.items.values():
            total += item_data["product"].price * item_data["quantity"]
        return total
    
    def clear(self):
        self.items = {}
    
    def __str__(self):
        if not self.items:
            return "Shopping Cart: Empty"
        
        result = "Shopping Cart:\n"
        total = 0
        for item_data in self.items.values():
            product = item_data["product"]
            quantity = item_data["quantity"]
            item_total = product.price * quantity
            total += item_total
            result += f"  {product.name} x {quantity}: ${item_total:.2f}\n"
        
        result += f"Total: ${total:.2f}"
        return result


class Order:
    next_order_id = 1000
    
    def __init__(self, customer, items, payment_method):
        self.order_id = Order.next_order_id
        Order.next_order_id += 1
        self.customer = customer
        self.items = items
        self.payment_method = payment_method
        self.order_date = datetime.now()
        self.status = "Pending"
    
    def get_total(self):
        total = 0
        for item_data in self.items.values():
            total += item_data["product"].price * item_data["quantity"]
        return total
    
    def process(self):
        # Update product stock
        for item_data in self.items.values():
            product = item_data["product"]
            quantity = item_data["quantity"]
            product.update_stock(-quantity)
        
        self.status = "Processed"
        print(f"Order #{self.order_id} has been processed.")
    
    def __str__(self):
        result = f"Order #{self.order_id}\n"
        result += f"Customer: {self.customer.name}\n"
        result += f"Status: {self.status}\n"
        result += f"Date: {self.order_date}\n"
        result += f"Payment Method: {self.payment_method}\n"
        result += "Items:\n"
        
        total = 0
        for item_data in self.items.values():
            product = item_data["product"]
            quantity = item_data["quantity"]
            item_total = product.price * quantity
            total += item_total
            result += f"  {product.name} x {quantity}: ${item_total:.2f}\n"
        
        result += f"Total: ${total:.2f}"
        return result


# Payment processors using polymorphism and abstract classes
class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass
    
    @abstractmethod
    def refund(self, amount):
        pass


class CreditCardProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing ${amount:.2f} via Credit Card")
        return True
    
    def refund(self, amount):
        print(f"Refunding ${amount:.2f} to Credit Card")
        return True


class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing ${amount:.2f} via PayPal")
        return True
    
    def refund(self, amount):
        print(f"Refunding ${amount:.2f} to PayPal")
        return True


# Example usage of the e-commerce system
if __name__ == "__main__":
    # Create products
    laptop = Product(101, "Laptop", 999.99, "Powerful laptop", 10)
    phone = Product(102, "Smartphone", 499.99, "Latest model", 20)
    headphones = Product(103, "Headphones", 89.99, "Noise cancelling", 15)
    
    # Create a customer
    alice = Customer(1, "Alice Johnson", "alice@example.com")
    
    # Add products to cart
    alice.add_to_cart(laptop)
    alice.add_to_cart(phone, 2)
    alice.add_to_cart(headphones)
    
    # Display cart
    print(alice.cart)
    
    # Create payment processor
    cc_processor = CreditCardProcessor()
    
    # Place order
    order = alice.place_order("Credit Card")
    
    # Process payment
    if order:
        cc_processor.process_payment(order.get_total())
        order.process()
        print(order)
```

## Best Practices for OOP in Python

1. **Follow the Single Responsibility Principle**: Each class should have just one responsibility

2. **Prefer Composition Over Inheritance**: Use inheritance only when a true "is-a" relationship exists

3. **Use Properties Instead of Direct Access**: When attributes need validation or calculated values

4. **Keep Classes Focused**: If a class gets too large, break it into smaller, more focused classes

5. **Avoid Deep Inheritance Hierarchies**: Try to limit inheritance to 2-3 levels for readability

6. **Use Abstract Classes for Common Interfaces**: Define common behaviors that derived classes must implement

7. **Document Classes and Methods**: Use docstrings to explain the purpose and usage of each class

8. **Keep Methods Small and Focused**: Each method should do one thing well

9. **Be Careful with Multiple Inheritance**: It can be powerful but also lead to complex behaviors

10. **Follow Naming Conventions**:
   - Class names: `CamelCase`
   - Method/attribute names: `snake_case`
   - Protected attributes: `_protected`
   - Private attributes: `__private`

## Summary

Object-Oriented Programming in Python provides a powerful way to organize code by modeling real-world concepts. The key principles of OOP:

- **Encapsulation**: Bundling data and methods that operate on that data
- **Inheritance**: Creating new classes based on existing ones
- **Polymorphism**: Using a single interface to represent different types
- **Abstraction**: Hiding implementation details while exposing functionality

Python's OOP implementation is flexible and pragmatic, allowing you to apply these principles in ways that make sense for your specific project.
