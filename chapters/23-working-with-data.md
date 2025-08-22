# Working with Data in Python

This chapter covers essential techniques for working with different types of data in Python, including file operations, JSON handling, and date/time manipulation.

## File Handling

Unlike JavaScript, which has limited file access in browsers and requires Node.js modules like `fs` for server-side file operations, Python has built-in functions for file handling.

### Reading and Writing Text Files

```python
# Opening a file (compared to fs.readFile in Node.js)
with open('example.txt', 'r') as file:  # 'r' for read mode
    content = file.read()  # Read entire file
    print(content)

# The 'with' statement ensures file is properly closed even if errors occur
# This is similar to try-finally in JavaScript, but more elegant
```

The `open()` function is Python's primary way to work with files. The most common modes are:

- `'r'`: Read (default)
- `'w'`: Write (creates new file or truncates existing file)
- `'a'`: Append
- `'b'`: Binary mode (used with other modes, e.g., `'rb'` for reading binary)
- `'t'`: Text mode (default)
- `'+'`: Update mode (read and write)

#### Reading Files Line by Line

```python
# Reading line by line (more memory efficient for large files)
with open('example.txt', 'r') as file:
    for line in file:  # File objects are iterable in Python!
        print(line.strip())  # strip() removes leading/trailing whitespace
```

#### Writing to Files

```python
# Writing to a file
with open('output.txt', 'w') as file:
    file.write('Hello, World!\n')
    file.write('This is a second line.')

# Appending to a file
with open('output.txt', 'a') as file:
    file.write('\nThis line is appended.')
```

#### Working with CSV Files

Python's built-in `csv` module makes it easy to work with CSV data:

```python
import csv

# Reading CSV
with open('data.csv', 'r', newline='') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        print(', '.join(row))

# Writing CSV
with open('output.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Name', 'Age', 'City'])
    writer.writerow(['Alice', '30', 'New York'])
    writer.writerow(['Bob', '25', 'San Francisco'])

# Using DictReader and DictWriter (similar to working with JSON objects)
with open('data.csv', 'r', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        print(f"{row['Name']} is {row['Age']} years old and lives in {row['City']}")

with open('output.csv', 'w', newline='') as csvfile:
    fieldnames = ['Name', 'Age', 'City']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({'Name': 'Charlie', 'Age': '35', 'City': 'Boston'})
```

### Working with Binary Files

```python
# Reading binary data
with open('image.png', 'rb') as file:
    binary_data = file.read()
    # Process binary data...

# Writing binary data
with open('copy.png', 'wb') as file:
    file.write(binary_data)
```

### Real-world Example: Log Analyzer

This example reads a log file, extracts error messages, and writes a summary:

```python
import re
from collections import Counter

def analyze_log_file(log_path, output_path):
    error_pattern = re.compile(r'ERROR: (.*?)$')
    errors = []
    
    print(f"Analyzing log file: {log_path}")
    
    # Extract errors
    with open(log_path, 'r') as log_file:
        line_count = 0
        for line in log_file:
            line_count += 1
            match = error_pattern.search(line)
            if match:
                error_message = match.group(1)
                errors.append((line_count, error_message))
    
    # Count unique errors
    error_messages = [error[1] for error in errors]
    error_counts = Counter(error_messages)
    
    # Write summary
    with open(output_path, 'w') as out_file:
        out_file.write(f"Log Analysis Summary\n")
        out_file.write(f"===================\n\n")
        out_file.write(f"Total lines processed: {line_count}\n")
        out_file.write(f"Total errors found: {len(errors)}\n\n")
        out_file.write(f"Error counts:\n")
        
        for message, count in error_counts.most_common():
            out_file.write(f"- {message}: {count} occurrences\n")
        
        out_file.write("\nDetailed errors:\n")
        for line_num, message in errors:
            out_file.write(f"Line {line_num}: {message}\n")
    
    print(f"Analysis complete. Summary written to {output_path}")

# Usage:
# analyze_log_file('application.log', 'error_summary.txt')
```

## JSON Handling

JSON (JavaScript Object Notation) is a common data interchange format in web applications. Python provides the built-in `json` module for handling JSON data.

### Converting Between Python Objects and JSON

```python
import json

# Python dictionary (equivalent to JavaScript object)
user = {
    'name': 'Alice',
    'age': 30,
    'is_active': True,
    'skills': ['Python', 'JavaScript', 'SQL'],
    'address': {
        'city': 'New York',
        'country': 'USA'
    }
}

# Converting Python object to JSON string (equivalent to JSON.stringify)
json_string = json.dumps(user, indent=2)
print(json_string)

# Converting JSON string to Python object (equivalent to JSON.parse)
parsed_user = json.loads(json_string)
print(parsed_user['name'])  # Alice
```

### Reading and Writing JSON Files

```python
# Writing JSON to a file
with open('user.json', 'w') as file:
    json.dump(user, file, indent=2)

# Reading JSON from a file
with open('user.json', 'r') as file:
    loaded_user = json.load(file)
    print(loaded_user)
```

### Customizing JSON Encoding and Decoding

```python
import json
from datetime import datetime

# Custom JSON encoder
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

# Data with datetime
data = {
    'name': 'Event',
    'date': datetime.now(),
    'participants': ['Alice', 'Bob']
}

# Using custom encoder
json_string = json.dumps(data, cls=CustomJSONEncoder, indent=2)
print(json_string)
```

### Real-world Example: API Response Handler

```python
import json
import requests
from datetime import datetime

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
    
    def get_user_data(self, user_id):
        """Get user data from API and parse JSON response."""
        try:
            url = f"{self.base_url}/users/{user_id}"
            response = self.session.get(url)
            response.raise_for_status()  # Raise exception for 4XX/5XX status codes
            
            # Parse JSON response
            user_data = response.json()
            
            # Process and transform data
            user_data['retrieved_at'] = datetime.now().isoformat()
            user_data['full_name'] = f"{user_data.get('first_name', '')} {user_data.get('last_name', '')}".strip()
            
            # Save response to file for debugging/caching
            with open(f"user_{user_id}.json", 'w') as f:
                json.dump(user_data, f, indent=2)
                
            return user_data
            
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"JSON parsing failed: {e}")
            return None

# Usage
# client = APIClient('https://api.example.com')
# user = client.get_user_data(123)
# if user:
#     print(f"Retrieved data for {user['full_name']}")
```

## Working with Dates and Times

Python's `datetime` module provides classes for manipulating dates and times. This is more comprehensive than JavaScript's `Date` object.

### Basic Date and Time Operations

```python
from datetime import datetime, date, time, timedelta

# Current date and time (similar to new Date() in JavaScript)
now = datetime.now()
print(f"Current datetime: {now}")

# Creating specific dates and times
specific_date = date(2025, 8, 22)
specific_time = time(14, 30, 0)  # 2:30 PM
specific_datetime = datetime(2025, 8, 22, 14, 30, 0)

# Formatting dates (similar to date.toLocaleString() in JavaScript)
formatted = now.strftime("%Y-%m-%d %H:%M:%S")
print(f"Formatted date: {formatted}")

# Common format codes:
# %Y - Year with century (2025)
# %m - Month as number (01-12)
# %d - Day of month (01-31)
# %H - Hour (00-23)
# %M - Minute (00-59)
# %S - Second (00-59)
# %A - Weekday name (Wednesday)
# %B - Month name (August)

# Parsing dates from strings (similar to Date.parse() in JavaScript)
date_string = "2025-08-22 14:30:00"
parsed_date = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
print(f"Parsed date: {parsed_date}")
```

### Date Arithmetic

```python
# Date arithmetic with timedelta
today = date.today()
yesterday = today - timedelta(days=1)
tomorrow = today + timedelta(days=1)
next_week = today + timedelta(weeks=1)
two_hours_later = datetime.now() + timedelta(hours=2)

# Time differences
birthday = date(1990, 5, 15)
age_days = (today - birthday).days
print(f"You are {age_days} days old")
```

### Time Zones with pytz

```python
from datetime import datetime
import pytz

# Working with timezones (more robust than JavaScript)
# First, install pytz: pip install pytz

# Create timezone-aware datetime
utc_now = datetime.now(pytz.UTC)
print(f"UTC time: {utc_now}")

# Convert to different timezone
ny_timezone = pytz.timezone('America/New_York')
ny_time = utc_now.astimezone(ny_timezone)
print(f"New York time: {ny_time}")

# List available timezones
# for tz in pytz.all_timezones[:5]:  # Show first 5
#     print(tz)
```

### Real-world Example: Meeting Scheduler

```python
from datetime import datetime, timedelta
import pytz

class MeetingScheduler:
    def __init__(self):
        self.meetings = []
    
    def schedule_meeting(self, title, start_time, duration_minutes, timezone_str='UTC'):
        """Schedule a new meeting."""
        # Convert to UTC for storage
        timezone = pytz.timezone(timezone_str)
        local_dt = timezone.localize(start_time)
        utc_dt = local_dt.astimezone(pytz.UTC)
        
        end_time = utc_dt + timedelta(minutes=duration_minutes)
        
        # Check for conflicts
        if self._has_conflict(utc_dt, end_time):
            return False, "Meeting time conflicts with an existing meeting"
        
        # Store meeting
        meeting = {
            'title': title,
            'start_time': utc_dt,
            'end_time': end_time,
            'duration_minutes': duration_minutes,
            'original_timezone': timezone_str
        }
        self.meetings.append(meeting)
        return True, meeting
    
    def _has_conflict(self, start, end):
        """Check if there's a time conflict with existing meetings."""
        for meeting in self.meetings:
            if (start < meeting['end_time'] and end > meeting['start_time']):
                return True
        return False
    
    def get_meetings_for_day(self, day_date, timezone_str='UTC'):
        """Get all meetings for a specific day in the specified timezone."""
        timezone = pytz.timezone(timezone_str)
        
        # Start and end of the day in UTC
        day_start = datetime.combine(day_date, datetime.min.time())
        day_start = timezone.localize(day_start).astimezone(pytz.UTC)
        day_end = day_start + timedelta(days=1)
        
        day_meetings = []
        for meeting in self.meetings:
            if meeting['start_time'] >= day_start and meeting['start_time'] < day_end:
                # Convert meeting times to requested timezone
                local_start = meeting['start_time'].astimezone(timezone)
                local_end = meeting['end_time'].astimezone(timezone)
                
                meeting_copy = meeting.copy()
                meeting_copy['local_start'] = local_start
                meeting_copy['local_end'] = local_end
                day_meetings.append(meeting_copy)
        
        return sorted(day_meetings, key=lambda m: m['start_time'])
    
    def format_meeting(self, meeting, timezone_str=None):
        """Format meeting details for display."""
        if timezone_str:
            timezone = pytz.timezone(timezone_str)
            start = meeting['start_time'].astimezone(timezone)
            end = meeting['end_time'].astimezone(timezone)
        else:
            # Use original timezone
            timezone = pytz.timezone(meeting['original_timezone'])
            start = meeting['start_time'].astimezone(timezone)
            end = meeting['end_time'].astimezone(timezone)
        
        return (
            f"Meeting: {meeting['title']}\n"
            f"Date: {start.strftime('%A, %B %d, %Y')}\n"
            f"Time: {start.strftime('%I:%M %p')} to {end.strftime('%I:%M %p')} "
            f"({timezone_str or meeting['original_timezone']})\n"
            f"Duration: {meeting['duration_minutes']} minutes"
        )

# Usage example
scheduler = MeetingScheduler()

# Schedule meetings
ny_time = datetime(2025, 8, 22, 10, 0)  # 10:00 AM
success, result = scheduler.schedule_meeting("Team Meeting", ny_time, 60, "America/New_York")
if success:
    print("Meeting scheduled successfully")
else:
    print(f"Failed to schedule: {result}")

# Schedule another meeting
sf_time = datetime(2025, 8, 22, 13, 0)  # 1:00 PM
scheduler.schedule_meeting("Client Call", sf_time, 30, "America/Los_Angeles")

# Get meetings for August 22, 2025 in London time
london_date = date(2025, 8, 22)
london_meetings = scheduler.get_meetings_for_day(london_date, "Europe/London")

print(f"\nMeetings on {london_date} (London time):")
for meeting in london_meetings:
    print("\n" + scheduler.format_meeting(meeting, "Europe/London"))
```

## Comparing to JavaScript

| JavaScript (Browser/Node.js) | Python |
|------------------------------|--------|
| `fs.readFile()`, `fs.writeFile()` | `open()` with `read()` and `write()` |
| `JSON.stringify()` | `json.dumps()` |
| `JSON.parse()` | `json.loads()` |
| `new Date()` | `datetime.now()` |
| `date.toISOString()` | `date.isoformat()` |
| `Date.parse()` | `datetime.strptime()` |

## Conclusion

Python's built-in tools for working with files, JSON, and dates are comprehensive and easy to use. The standard library provides robust functionality for most common data handling tasks, and third-party libraries like `pytz` extend these capabilities further.

In the next chapter, we'll explore error handling and exceptions in Python, which provide a structured way to handle errors and unexpected situations in your code.
