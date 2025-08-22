# CLI & Automation with Python

Python excels at automating repetitive tasks and creating command-line interfaces (CLIs). In this chapter, we'll explore how to build powerful CLI tools and automate various tasks using Python.

## Introduction to Command-Line Interfaces

Command-line interfaces (CLIs) allow users to interact with programs through text commands. Python provides several libraries for creating CLI applications, from simple script arguments to sophisticated interactive applications.

### Why Build CLI Tools?

1. **Automation**: Automate repetitive tasks
2. **Integration**: Easily integrate with other command-line tools
3. **Scripting**: Include in scripts and batch files
4. **Remote Execution**: Run over SSH connections
5. **Headless Operation**: Use in environments without graphical interfaces
6. **DevOps**: Perfect for CI/CD pipelines and system administration

## Basic Argument Parsing with sys.argv

The simplest way to handle command-line arguments is using `sys.argv`:

```python
# simple_cli.py
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python simple_cli.py <name>")
        return
    
    name = sys.argv[1]
    print(f"Hello, {name}!")

if __name__ == "__main__":
    main()
```

Run the script:

```bash
python simple_cli.py John
# Output: Hello, John!
```

While `sys.argv` is simple, it quickly becomes unwieldy for more complex CLIs.

## Command-Line Arguments with argparse

Python's `argparse` module provides a more structured way to handle command-line arguments:

```python
# argparse_example.py
import argparse

def main():
    parser = argparse.ArgumentParser(description='A simple greeting CLI.')
    parser.add_argument('name', help='Name of the person to greet')
    parser.add_argument('--title', '-t', help='Title for the person')
    parser.add_argument('--repeat', '-r', type=int, default=1,
                        help='Number of times to repeat the greeting')
    
    args = parser.parse_args()
    
    greeting = f"Hello"
    if args.title:
        greeting += f", {args.title}"
    greeting += f" {args.name}!"
    
    for _ in range(args.repeat):
        print(greeting)

if __name__ == "__main__":
    main()
```

Run the script with various arguments:

```bash
python argparse_example.py Alice
# Output: Hello Alice!

python argparse_example.py --title Dr. Bob
# Output: Hello, Dr. Bob!

python argparse_example.py Charlie --repeat 3
# Output: 
# Hello Charlie!
# Hello Charlie!
# Hello Charlie!

python argparse_example.py --help
# Output: Shows help message with all arguments
```

### More Advanced argparse Features

```python
# advanced_argparse.py
import argparse
import sys

def main():
    parser = argparse.ArgumentParser(
        description='Advanced CLI example',
        epilog='Example: advanced_argparse.py sum 1 2 3 4 5',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    
    # Add version argument
    parser.add_argument('--version', action='version', version='%(prog)s 1.0')
    
    # Create subparsers for different commands
    subparsers = parser.add_subparsers(dest='command', help='Commands')
    
    # "sum" command
    sum_parser = subparsers.add_parser('sum', help='Sum numbers')
    sum_parser.add_argument('numbers', nargs='+', type=float, help='Numbers to sum')
    
    # "stats" command
    stats_parser = subparsers.add_parser('stats', help='Calculate statistics')
    stats_parser.add_argument('numbers', nargs='+', type=float, help='Numbers for statistics')
    stats_parser.add_argument('--mean', action='store_true', help='Calculate mean')
    stats_parser.add_argument('--median', action='store_true', help='Calculate median')
    
    # "file" command
    file_parser = subparsers.add_parser('file', help='File operations')
    file_parser.add_argument('filename', help='File to process')
    group = file_parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--read', action='store_true', help='Read the file')
    group.add_argument('--count', action='store_true', help='Count lines in the file')
    
    args = parser.parse_args()
    
    # If no command was specified, show help and exit
    if not args.command:
        parser.print_help()
        sys.exit(1)
    
    # Handle commands
    if args.command == 'sum':
        print(f"Sum: {sum(args.numbers)}")
    
    elif args.command == 'stats':
        if args.mean or not (args.mean or args.median):
            print(f"Mean: {sum(args.numbers) / len(args.numbers)}")
        
        if args.median:
            sorted_nums = sorted(args.numbers)
            n = len(sorted_nums)
            if n % 2 == 0:
                median = (sorted_nums[n//2-1] + sorted_nums[n//2]) / 2
            else:
                median = sorted_nums[n//2]
            print(f"Median: {median}")
    
    elif args.command == 'file':
        try:
            if args.read:
                with open(args.filename, 'r') as f:
                    print(f.read())
            elif args.count:
                with open(args.filename, 'r') as f:
                    print(f"Line count: {sum(1 for _ in f)}")
        except FileNotFoundError:
            print(f"Error: File '{args.filename}' not found")
            sys.exit(1)

if __name__ == "__main__":
    main()
```

Usage examples:

```bash
python advanced_argparse.py sum 1 2 3 4 5
# Output: Sum: 15.0

python advanced_argparse.py stats --mean --median 1 2 3 4 5
# Output: 
# Mean: 3.0
# Median: 3.0

python advanced_argparse.py file --read README.md
# Output: [Contents of README.md]

python advanced_argparse.py file --count README.md
# Output: Line count: 42
```

## Modern CLI Development with Typer

Typer is a modern library for building CLIs, created by the same developer as FastAPI. It uses Python type hints to create beautiful command-line interfaces:

```python
# typer_example.py
import typer
from typing import Optional, List
from enum import Enum

app = typer.Typer()

class Color(str, Enum):
    red = "red"
    green = "green"
    blue = "blue"

@app.command()
def hello(name: str, formal: bool = False, color: Color = Color.blue):
    """
    Say hello to NAME, optionally in a formal way
    """
    if formal:
        greeting = f"Good day, {name}!"
    else:
        greeting = f"Hello, {name}!"
    
    typer.echo(typer.style(greeting, fg=color.value))

@app.command()
def goodbye(name: Optional[str] = typer.Argument(None),
            formal: bool = False,
            goodbye_all: bool = typer.Option(False, "--all", "-a",
                                           help="Say goodbye to everyone")):
    """
    Say goodbye to NAME, optionally in a formal way
    """
    if goodbye_all:
        typer.echo("Goodbye everyone!")
        return
    
    if formal:
        message = f"Farewell, {name or 'friend'}."
    else:
        message = f"Bye, {name or 'friend'}!"
    
    typer.echo(message)

if __name__ == "__main__":
    app()
```

Usage:

```bash
python typer_example.py hello Alice --formal --color red
# Output: Good day, Alice! (in red)

python typer_example.py goodbye --all
# Output: Goodbye everyone!
```

### Typer with Multiple Commands and File Handling

```python
# file_processor.py
import typer
from typing import List, Optional
from pathlib import Path
import csv
import json
import yaml  # Requires PyYAML package

app = typer.Typer()

@app.command()
def convert(
    input_file: Path = typer.Argument(..., help="Input file path"),
    output_file: Optional[Path] = typer.Argument(None, help="Output file path"),
    format: str = typer.Option("json", "--format", "-f", help="Output format: json, csv, yaml"),
):
    """
    Convert a data file to a different format.
    Supported input formats: JSON, CSV, YAML
    Supported output formats: JSON, CSV, YAML
    """
    # Determine input format
    input_format = input_file.suffix.lower()[1:]
    if input_format not in ["json", "csv", "yaml", "yml"]:
        typer.echo(f"Unsupported input format: {input_format}")
        raise typer.Exit(1)
    
    # Read input data
    data = []
    try:
        if input_format == "json":
            with open(input_file, 'r') as f:
                data = json.load(f)
        elif input_format == "csv":
            with open(input_file, 'r', newline='') as f:
                reader = csv.DictReader(f)
                data = [row for row in reader]
        elif input_format in ["yaml", "yml"]:
            with open(input_file, 'r') as f:
                data = yaml.safe_load(f)
    except Exception as e:
        typer.echo(f"Error reading input file: {e}")
        raise typer.Exit(1)
    
    # Determine output file path if not provided
    if not output_file:
        output_file = input_file.with_suffix(f".{format}")
    
    # Write output data
    try:
        with typer.progressbar(range(100), label="Converting") as progress:
            for i in progress:
                if i == 50:  # Simulate processing
                    if format == "json":
                        with open(output_file, 'w') as f:
                            json.dump(data, f, indent=2)
                    elif format == "csv":
                        if not data:
                            typer.echo("Error: No data to write")
                            raise typer.Exit(1)
                        with open(output_file, 'w', newline='') as f:
                            writer = csv.DictWriter(f, fieldnames=data[0].keys())
                            writer.writeheader()
                            writer.writerows(data)
                    elif format == "yaml":
                        with open(output_file, 'w') as f:
                            yaml.dump(data, f)
                    else:
                        typer.echo(f"Unsupported output format: {format}")
                        raise typer.Exit(1)
                typer.sleep(0.01)  # Just to show the progress bar
    except Exception as e:
        typer.echo(f"Error writing output file: {e}")
        raise typer.Exit(1)
    
    typer.echo(f"Successfully converted {input_file} to {output_file}")

@app.command()
def analyze(
    file: Path = typer.Argument(..., help="File to analyze"),
    output: Optional[Path] = typer.Option(None, "--output", "-o", help="Output report file"),
    verbose: bool = typer.Option(False, "--verbose", "-v", help="Show detailed information"),
):
    """
    Analyze the content of a file and generate statistics.
    """
    if not file.exists():
        typer.echo(f"Error: File {file} not found")
        raise typer.Exit(1)
    
    # Get basic file info
    stats = {
        "filename": file.name,
        "path": str(file.absolute()),
        "size_bytes": file.stat().st_size,
        "size_human": f"{file.stat().st_size / 1024:.2f} KB"
    }
    
    # Read file content
    try:
        with open(file, 'r') as f:
            content = f.read()
            lines = content.split('\n')
            words = content.split()
            
            stats.update({
                "lines": len(lines),
                "words": len(words),
                "characters": len(content)
            })
            
            if verbose:
                # Get more detailed stats
                stats.update({
                    "avg_line_length": sum(len(line) for line in lines) / len(lines) if lines else 0,
                    "avg_word_length": sum(len(word) for word in words) / len(words) if words else 0,
                    "empty_lines": sum(1 for line in lines if not line.strip()),
                })
    except UnicodeDecodeError:
        typer.echo(f"Warning: {file} is not a text file. Limited analysis will be performed.")
        stats.update({
            "is_text_file": False,
            "lines": "N/A",
            "words": "N/A",
            "characters": "N/A"
        })
    except Exception as e:
        typer.echo(f"Error analyzing file: {e}")
        raise typer.Exit(1)
    
    # Print stats
    typer.echo(f"Analysis of {file.name}:")
    typer.echo(f"  Size: {stats['size_human']} ({stats['size_bytes']} bytes)")
    if stats.get("lines") != "N/A":
        typer.echo(f"  Lines: {stats['lines']}")
        typer.echo(f"  Words: {stats['words']}")
        typer.echo(f"  Characters: {stats['characters']}")
        
        if verbose:
            typer.echo(f"  Average line length: {stats['avg_line_length']:.2f} characters")
            typer.echo(f"  Average word length: {stats['avg_word_length']:.2f} characters")
            typer.echo(f"  Empty lines: {stats['empty_lines']}")
    
    # Write report to file if requested
    if output:
        try:
            with open(output, 'w') as f:
                json.dump(stats, f, indent=2)
            typer.echo(f"Report saved to {output}")
        except Exception as e:
            typer.echo(f"Error saving report: {e}")
            raise typer.Exit(1)

if __name__ == "__main__":
    app()
```

Usage:

```bash
python file_processor.py convert data.json --format yaml
# Converts data.json to data.yaml

python file_processor.py analyze README.md --verbose
# Analyzes README.md and shows detailed stats
```

## Interactive Command-Line Applications with Prompt Toolkit

For more interactive CLI applications, Python-Prompt-Toolkit provides powerful features:

```python
# prompt_toolkit_example.py
from prompt_toolkit import prompt
from prompt_toolkit.completion import WordCompleter
from prompt_toolkit.validation import Validator, ValidationError
from prompt_toolkit import PromptSession
from prompt_toolkit.history import FileHistory
from prompt_toolkit.auto_suggest import AutoSuggestFromHistory
from prompt_toolkit.formatted_text import HTML

def main():
    # Simple prompt
    name = prompt("What's your name? ")
    print(f"Hello, {name}!")
    
    # Prompt with auto-completion
    animal_completer = WordCompleter([
        'cat', 'dog', 'elephant', 'fish', 'giraffe',
        'horse', 'lion', 'monkey', 'mouse', 'snake', 'tiger'
    ])
    animal = prompt("What's your favorite animal? ", completer=animal_completer)
    print(f"Nice! {animal.capitalize()}s are amazing!")
    
    # Prompt with validation
    class NumberValidator(Validator):
        def validate(self, document):
            text = document.text
            if not text.isdigit():
                raise ValidationError(message='Please enter a valid number')
    
    age = prompt("How old are you? ", validator=NumberValidator())
    print(f"You are {age} years old.")
    
    # Prompt with history
    session = PromptSession(history=FileHistory('.example_history'))
    
    while True:
        try:
            command = session.prompt(
                HTML('<ansiblue>command ></ansiblue> '),
                auto_suggest=AutoSuggestFromHistory()
            )
            
            if command.lower() in ['exit', 'quit']:
                break
                
            print(f"You entered: {command}")
            
        except KeyboardInterrupt:
            continue
        except EOFError:
            break
    
    print("Goodbye!")

if __name__ == "__main__":
    main()
```

## Building a Complete CLI Application

Let's create a more complete CLI application for task management:

```python
# task_manager.py
import typer
import json
from pathlib import Path
from typing import List, Optional
from enum import Enum
from datetime import datetime
from rich.console import Console
from rich.table import Table
from rich.panel import Panel

app = typer.Typer()
console = Console()

# Task data file
DATA_FILE = Path.home() / ".tasks.json"

class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

def load_tasks():
    if not DATA_FILE.exists():
        return []
    
    with open(DATA_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            console.print("[bold red]Error loading tasks. File might be corrupted.[/]")
            return []

def save_tasks(tasks):
    with open(DATA_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)

@app.command()
def add(
    description: str = typer.Argument(..., help="Task description"),
    priority: Priority = typer.Option(Priority.MEDIUM, "--priority", "-p", help="Task priority"),
    due_date: Optional[str] = typer.Option(None, "--due", "-d", help="Due date (YYYY-MM-DD)"),
    tags: List[str] = typer.Option([], "--tag", "-t", help="Tags for the task")
):
    """Add a new task to the task list."""
    tasks = load_tasks()
    
    # Validate due date if provided
    if due_date:
        try:
            datetime.strptime(due_date, "%Y-%m-%d")
        except ValueError:
            console.print("[bold red]Invalid date format. Use YYYY-MM-DD.[/]")
            raise typer.Exit(1)
    
    # Create new task
    task = {
        "id": len(tasks) + 1,
        "description": description,
        "priority": priority,
        "created": datetime.now().strftime("%Y-%m-%d"),
        "due_date": due_date,
        "tags": tags,
        "completed": False
    }
    
    tasks.append(task)
    save_tasks(tasks)
    
    console.print(f"[green]Task added: [bold]{description}[/][/]")

@app.command()
def list(
    all: bool = typer.Option(False, "--all", "-a", help="Show all tasks including completed"),
    priority: Optional[Priority] = typer.Option(None, "--priority", "-p", help="Filter by priority"),
    tag: Optional[str] = typer.Option(None, "--tag", "-t", help="Filter by tag")
):
    """List all tasks."""
    tasks = load_tasks()
    
    # Filter tasks
    if not all:
        tasks = [t for t in tasks if not t["completed"]]
    
    if priority:
        tasks = [t for t in tasks if t["priority"] == priority]
        
    if tag:
        tasks = [t for t in tasks if tag in t.get("tags", [])]
    
    if not tasks:
        console.print("[yellow]No tasks found.[/]")
        return
    
    # Create table
    table = Table(title="Your Tasks")
    table.add_column("ID", justify="right", style="cyan", no_wrap=True)
    table.add_column("Description", style="white")
    table.add_column("Priority", style="magenta")
    table.add_column("Due Date", style="green")
    table.add_column("Tags", style="blue")
    table.add_column("Status", style="yellow")
    
    for task in tasks:
        # Format status
        status = "[green]Completed[/]" if task["completed"] else "[yellow]Pending[/]"
        
        # Format priority color
        priority_color = {
            "low": "green",
            "medium": "yellow",
            "high": "red"
        }.get(task["priority"], "white")
        
        # Format tags
        tags = ", ".join(task.get("tags", []))
        
        table.add_row(
            str(task["id"]),
            task["description"],
            f"[{priority_color}]{task['priority']}[/]",
            task.get("due_date", ""),
            tags,
            status
        )
    
    console.print(table)

@app.command()
def complete(
    task_id: int = typer.Argument(..., help="ID of the task to mark as completed")
):
    """Mark a task as completed."""
    tasks = load_tasks()
    
    for task in tasks:
        if task["id"] == task_id:
            if task["completed"]:
                console.print(f"[yellow]Task {task_id} is already completed.[/]")
            else:
                task["completed"] = True
                task["completed_date"] = datetime.now().strftime("%Y-%m-%d")
                save_tasks(tasks)
                console.print(f"[green]Task {task_id} marked as completed![/]")
            return
    
    console.print(f"[bold red]Task with ID {task_id} not found.[/]")

@app.command()
def delete(
    task_id: int = typer.Argument(..., help="ID of the task to delete"),
    force: bool = typer.Option(False, "--force", "-f", help="Force delete without confirmation")
):
    """Delete a task."""
    tasks = load_tasks()
    
    for i, task in enumerate(tasks):
        if task["id"] == task_id:
            if not force:
                confirm = typer.confirm(f"Are you sure you want to delete task {task_id}: '{task['description']}'?")
                if not confirm:
                    raise typer.Abort()
            
            del tasks[i]
            save_tasks(tasks)
            console.print(f"[green]Task {task_id} deleted![/]")
            return
    
    console.print(f"[bold red]Task with ID {task_id} not found.[/]")

@app.command()
def stats():
    """Show task statistics."""
    tasks = load_tasks()
    
    if not tasks:
        console.print("[yellow]No tasks found.[/]")
        return
    
    # Calculate statistics
    total = len(tasks)
    completed = sum(1 for t in tasks if t["completed"])
    pending = total - completed
    
    priorities = {p.value: sum(1 for t in tasks if t["priority"] == p.value) for p in Priority}
    
    # Create tag stats
    tag_counts = {}
    for task in tasks:
        for tag in task.get("tags", []):
            tag_counts[tag] = tag_counts.get(tag, 0) + 1
    
    # Print statistics
    console.print(Panel.fit(
        f"[bold]Task Statistics[/]\n\n"
        f"Total tasks: [cyan]{total}[/]\n"
        f"Completed: [green]{completed}[/]\n"
        f"Pending: [yellow]{pending}[/]\n\n"
        f"[bold]Priorities:[/]\n"
        f"Low: [green]{priorities['low']}[/]\n"
        f"Medium: [yellow]{priorities['medium']}[/]\n"
        f"High: [red]{priorities['high']}[/]\n"
    ))
    
    # Print tag stats if there are any
    if tag_counts:
        tag_table = Table(title="Tags")
        tag_table.add_column("Tag", style="blue")
        tag_table.add_column("Count", style="cyan", justify="right")
        
        for tag, count in sorted(tag_counts.items(), key=lambda x: x[1], reverse=True):
            tag_table.add_row(tag, str(count))
        
        console.print(tag_table)

if __name__ == "__main__":
    app()
```

To use this task manager, install the required packages:

```bash
pip install typer rich
```

Then use it like this:

```bash
python task_manager.py add "Complete Python CLI chapter" --priority high --due 2023-12-31 --tag python --tag cli

python task_manager.py add "Review FastAPI code" --priority medium --tag python --tag api

python task_manager.py list

python task_manager.py complete 1

python task_manager.py stats
```

## Automating Tasks with Python

Beyond CLI tools, Python is excellent for automating various tasks:

### File System Operations

```python
# file_automation.py
import os
import shutil
import glob
from datetime import datetime

def organize_files(directory):
    """Organize files in a directory by file type."""
    # Create destination directories if they don't exist
    for folder in ['documents', 'images', 'videos', 'audio', 'other']:
        os.makedirs(os.path.join(directory, folder), exist_ok=True)
    
    # File extension mappings
    extensions = {
        'documents': ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx'],
        'images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg'],
        'videos': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'],
        'audio': ['.mp3', '.wav', '.ogg', '.flac', '.aac'],
    }
    
    # Move files to appropriate directories
    file_count = 0
    for file_path in glob.glob(os.path.join(directory, '*')):
        # Skip directories
        if os.path.isdir(file_path):
            continue
        
        # Get file extension
        _, ext = os.path.splitext(file_path)
        ext = ext.lower()
        
        # Determine destination folder
        dest_folder = 'other'
        for folder, exts in extensions.items():
            if ext in exts:
                dest_folder = folder
                break
        
        # Move file
        dest_path = os.path.join(directory, dest_folder, os.path.basename(file_path))
        shutil.move(file_path, dest_path)
        file_count += 1
    
    print(f"Organized {file_count} files.")

def backup_directory(source_dir, backup_dir):
    """Create a backup of a directory."""
    # Create timestamp for backup folder name
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = os.path.join(backup_dir, f'backup_{timestamp}')
    
    # Create backup
    shutil.copytree(source_dir, backup_path)
    print(f"Backup created at: {backup_path}")
    return backup_path

def find_duplicate_files(directory):
    """Find duplicate files based on content."""
    # Dictionary to store file hashes and paths
    files_by_size = {}
    files_by_hash = {}
    
    # First, group files by size
    for dirpath, _, filenames in os.walk(directory):
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            file_size = os.path.getsize(file_path)
            
            if file_size == 0:  # Skip empty files
                continue
                
            if file_size not in files_by_size:
                files_by_size[file_size] = []
            files_by_size[file_size].append(file_path)
    
    # For files with the same size, compute hash
    import hashlib
    for file_size, files in files_by_size.items():
        if len(files) < 2:  # Skip unique sizes
            continue
            
        for file_path in files:
            # Compute file hash
            hasher = hashlib.md5()
            with open(file_path, 'rb') as f:
                buf = f.read(65536)  # Read in 64k chunks
                while len(buf) > 0:
                    hasher.update(buf)
                    buf = f.read(65536)
            file_hash = hasher.hexdigest()
            
            if file_hash not in files_by_hash:
                files_by_hash[file_hash] = []
            files_by_hash[file_hash].append(file_path)
    
    # Return duplicates
    duplicates = {hash_val: paths for hash_val, paths in files_by_hash.items() if len(paths) > 1}
    return duplicates

# Example usage
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python file_automation.py <command> [args]")
        print("Commands: organize, backup, find_duplicates")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "organize" and len(sys.argv) == 3:
        organize_files(sys.argv[2])
    elif command == "backup" and len(sys.argv) == 4:
        backup_directory(sys.argv[2], sys.argv[3])
    elif command == "find_duplicates" and len(sys.argv) == 3:
        duplicates = find_duplicate_files(sys.argv[2])
        if duplicates:
            print(f"Found {sum(len(files) for files in duplicates.values())} duplicate files in {len(duplicates)} groups:")
            for i, (_, files) in enumerate(duplicates.items(), 1):
                print(f"\nGroup {i}:")
                for file in files:
                    print(f"  {file}")
        else:
            print("No duplicate files found.")
    else:
        print("Invalid command or arguments")
```

### Web Scraping and Data Collection

```python
# web_scraper.py
import requests
from bs4 import BeautifulSoup
import csv
import json
import time
import logging
from urllib.parse import urljoin

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='scraper.log'
)
logger = logging.getLogger('web_scraper')

class WebScraper:
    def __init__(self, base_url, delay=1):
        self.base_url = base_url
        self.delay = delay  # Delay between requests in seconds
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    def fetch_page(self, url):
        """Fetch a web page and return the BeautifulSoup object."""
        try:
            logger.info(f"Fetching: {url}")
            response = self.session.get(url)
            response.raise_for_status()
            
            # Respect robots.txt by adding a delay
            time.sleep(self.delay)
            
            return BeautifulSoup(response.text, 'html.parser')
        except requests.RequestException as e:
            logger.error(f"Error fetching {url}: {e}")
            return None
    
    def scrape_quotes(self, num_pages=1):
        """Scrape quotes from a quote website."""
        all_quotes = []
        
        for page in range(1, num_pages + 1):
            url = f"{self.base_url}/page/{page}/"
            soup = self.fetch_page(url)
            
            if not soup:
                continue
            
            quotes = soup.select('.quote')
            
            for quote in quotes:
                text = quote.select_one('.text').get_text()
                author = quote.select_one('.author').get_text()
                tags = [tag.get_text() for tag in quote.select('.tag')]
                
                all_quotes.append({
                    'text': text,
                    'author': author,
                    'tags': tags
                })
            
            logger.info(f"Scraped {len(quotes)} quotes from page {page}")
        
        logger.info(f"Total quotes scraped: {len(all_quotes)}")
        return all_quotes
    
    def scrape_product_listing(self, category_url):
        """Scrape product listings from an e-commerce site."""
        products = []
        
        soup = self.fetch_page(category_url)
        if not soup:
            return products
        
        product_items = soup.select('.product-item')
        
        for item in product_items:
            try:
                title = item.select_one('.product-title').get_text().strip()
                price = item.select_one('.product-price').get_text().strip()
                
                # Get link to product detail page
                link_element = item.select_one('a.product-link')
                link = urljoin(self.base_url, link_element['href']) if link_element else None
                
                # Get image URL
                img_element = item.select_one('img.product-image')
                image_url = img_element['src'] if img_element else None
                
                products.append({
                    'title': title,
                    'price': price,
                    'link': link,
                    'image_url': image_url
                })
            except (AttributeError, KeyError) as e:
                logger.error(f"Error parsing product: {e}")
        
        logger.info(f"Scraped {len(products)} products")
        return products
    
    def save_to_csv(self, data, filename):
        """Save data to CSV file."""
        if not data:
            logger.warning("No data to save")
            return False
        
        try:
            with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
                if isinstance(data[0], dict):
                    writer = csv.DictWriter(csvfile, fieldnames=data[0].keys())
                    writer.writeheader()
                    writer.writerows(data)
                else:
                    writer = csv.writer(csvfile)
                    writer.writerows(data)
            
            logger.info(f"Data saved to {filename}")
            return True
        except Exception as e:
            logger.error(f"Error saving to CSV: {e}")
            return False
    
    def save_to_json(self, data, filename):
        """Save data to JSON file."""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            logger.info(f"Data saved to {filename}")
            return True
        except Exception as e:
            logger.error(f"Error saving to JSON: {e}")
            return False

# Example usage
if __name__ == "__main__":
    # Scrape quotes from quotes.toscrape.com
    scraper = WebScraper("http://quotes.toscrape.com")
    quotes = scraper.scrape_quotes(num_pages=2)
    
    if quotes:
        scraper.save_to_json(quotes, "quotes.json")
        scraper.save_to_csv(quotes, "quotes.csv")
```

### Scheduled Tasks with schedule

```python
# scheduled_tasks.py
import schedule
import time
import os
import shutil
import logging
from datetime import datetime
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='scheduled_tasks.log'
)
logger = logging.getLogger('scheduled_tasks')

def backup_files():
    """Create a backup of important files."""
    source_dir = os.path.expanduser("~/important_files")
    backup_dir = os.path.expanduser("~/backups")
    
    # Skip if source directory doesn't exist
    if not os.path.exists(source_dir):
        logger.warning(f"Source directory {source_dir} does not exist")
        return
    
    # Create backup directory if it doesn't exist
    os.makedirs(backup_dir, exist_ok=True)
    
    # Create timestamp for backup folder name
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = os.path.join(backup_dir, f'backup_{timestamp}')
    
    try:
        # Create backup
        shutil.copytree(source_dir, backup_path)
        logger.info(f"Backup created at: {backup_path}")
        
        # Clean up old backups (keep last 5)
        backups = sorted([
            os.path.join(backup_dir, d) for d in os.listdir(backup_dir)
            if os.path.isdir(os.path.join(backup_dir, d)) and d.startswith('backup_')
        ])
        
        if len(backups) > 5:
            for old_backup in backups[:-5]:
                shutil.rmtree(old_backup)
                logger.info(f"Removed old backup: {old_backup}")
    except Exception as e:
        logger.error(f"Backup failed: {e}")

def check_website_status():
    """Check if a website is up and running."""
    websites = [
        "https://www.google.com",
        "https://www.github.com",
        "https://www.example.com"
    ]
    
    status_report = []
    
    for site in websites:
        try:
            response = requests.get(site, timeout=10)
            status = "UP" if response.status_code == 200 else f"DOWN (Status: {response.status_code})"
        except requests.RequestException as e:
            status = f"ERROR ({type(e).__name__})"
        
        logger.info(f"Website {site}: {status}")
        status_report.append(f"{site}: {status}")
    
    # If any website is down, send email alert
    if any("DOWN" in status or "ERROR" in status for status in status_report):
        send_email_alert("\n".join(status_report))

def send_email_alert(message):
    """Send an email alert."""
    # Email configuration
    sender_email = "your_email@example.com"
    receiver_email = "alerts@example.com"
    password = os.environ.get("EMAIL_PASSWORD")  # Get from environment variable
    
    if not password:
        logger.error("Email password not set in environment variables")
        return
    
    # Create message
    msg = MIMEMultipart()
    msg['Subject'] = f"Website Status Alert: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    msg['From'] = sender_email
    msg['To'] = receiver_email
    
    msg.attach(MIMEText(message, 'plain'))
    
    try:
        # Connect to server and send email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
        logger.info(f"Email alert sent to {receiver_email}")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")

def clean_temp_files():
    """Clean temporary files."""
    temp_dir = os.path.join(os.path.expanduser("~"), "temp")
    
    if not os.path.exists(temp_dir):
        logger.info(f"Temp directory {temp_dir} does not exist")
        return
    
    try:
        files_removed = 0
        for filename in os.listdir(temp_dir):
            file_path = os.path.join(temp_dir, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
                files_removed += 1
        
        logger.info(f"Removed {files_removed} temporary files")
    except Exception as e:
        logger.error(f"Error cleaning temporary files: {e}")

def main():
    """Set up scheduled tasks."""
    # Schedule daily backup at 1 AM
    schedule.every().day.at("01:00").do(backup_files)
    
    # Check website status every 30 minutes
    schedule.every(30).minutes.do(check_website_status)
    
    # Clean temporary files every week
    schedule.every().monday.at("03:00").do(clean_temp_files)
    
    logger.info("Scheduled tasks initialized")
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    logger.info("Starting scheduled tasks service")
    try:
        main()
    except KeyboardInterrupt:
        logger.info("Service stopped")
    except Exception as e:
        logger.critical(f"Service crashed: {e}")
```

To use the scheduled tasks script, install the required packages:

```bash
pip install schedule requests
```

## Automating Browser Tasks with Selenium

```python
# browser_automation.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import logging
import time
import os
import json

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='browser_automation.log'
)
logger = logging.getLogger('browser_automation')

class BrowserAutomation:
    def __init__(self, headless=False):
        """Initialize the browser automation with Chrome."""
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument('--headless')
            options.add_argument('--disable-gpu')
        
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--window-size=1920,1080')
        
        try:
            self.driver = webdriver.Chrome(options=options)
            self.wait = WebDriverWait(self.driver, 10)  # Wait up to 10 seconds
            logger.info("Browser initialized")
        except Exception as e:
            logger.error(f"Failed to initialize browser: {e}")
            raise
    
    def __del__(self):
        """Clean up resources."""
        if hasattr(self, 'driver'):
            try:
                self.driver.quit()
                logger.info("Browser closed")
            except:
                pass
    
    def navigate(self, url):
        """Navigate to a URL."""
        try:
            self.driver.get(url)
            logger.info(f"Navigated to {url}")
            return True
        except Exception as e:
            logger.error(f"Failed to navigate to {url}: {e}")
            return False
    
    def take_screenshot(self, filename):
        """Take a screenshot of the current page."""
        try:
            self.driver.save_screenshot(filename)
            logger.info(f"Screenshot saved to {filename}")
            return True
        except Exception as e:
            logger.error(f"Failed to take screenshot: {e}")
            return False
    
    def search_google(self, query):
        """Perform a Google search."""
        try:
            self.navigate("https://www.google.com")
            
            # Accept cookies if the dialog appears
            try:
                accept_button = self.wait.until(EC.element_to_be_clickable(
                    (By.XPATH, "//button[contains(., 'Accept')]")
                ))
                accept_button.click()
                logger.info("Accepted cookies")
            except TimeoutException:
                logger.info("No cookie dialog found")
            
            # Find the search box and enter the query
            search_box = self.wait.until(EC.element_to_be_clickable(
                (By.NAME, "q")
            ))
            search_box.clear()
            search_box.send_keys(query)
            search_box.send_keys(Keys.RETURN)
            
            # Wait for results to load
            self.wait.until(EC.presence_of_element_located(
                (By.ID, "search")
            ))
            
            logger.info(f"Performed Google search for: {query}")
            return True
        except Exception as e:
            logger.error(f"Google search failed: {e}")
            return False
    
    def extract_search_results(self, max_results=10):
        """Extract search results from Google."""
        results = []
        
        try:
            result_elements = self.driver.find_elements(By.CSS_SELECTOR, "div.g")
            
            for i, element in enumerate(result_elements[:max_results]):
                try:
                    title_element = element.find_element(By.CSS_SELECTOR, "h3")
                    title = title_element.text
                    
                    link_element = element.find_element(By.CSS_SELECTOR, "a")
                    link = link_element.get_attribute("href")
                    
                    snippet_element = element.find_element(By.CSS_SELECTOR, "div.VwiC3b")
                    snippet = snippet_element.text
                    
                    results.append({
                        "title": title,
                        "link": link,
                        "snippet": snippet
                    })
                except Exception as e:
                    logger.warning(f"Failed to extract result {i}: {e}")
            
            logger.info(f"Extracted {len(results)} search results")
            return results
        except Exception as e:
            logger.error(f"Failed to extract search results: {e}")
            return []
    
    def login_to_website(self, url, username, password, 
                        username_selector, password_selector, 
                        submit_selector):
        """Login to a website."""
        try:
            self.navigate(url)
            
            # Enter username
            username_field = self.wait.until(EC.element_to_be_clickable(
                (By.CSS_SELECTOR, username_selector)
            ))
            username_field.clear()
            username_field.send_keys(username)
            
            # Enter password
            password_field = self.wait.until(EC.element_to_be_clickable(
                (By.CSS_SELECTOR, password_selector)
            ))
            password_field.clear()
            password_field.send_keys(password)
            
            # Click submit
            submit_button = self.wait.until(EC.element_to_be_clickable(
                (By.CSS_SELECTOR, submit_selector)
            ))
            submit_button.click()
            
            # Wait for page to load after login
            time.sleep(3)
            
            logger.info(f"Logged in to {url}")
            return True
        except Exception as e:
            logger.error(f"Login failed: {e}")
            return False
    
    def fill_form(self, field_values):
        """Fill a web form.
        
        field_values should be a dict like:
        {
            "#name": "John Doe",
            "#email": "john@example.com",
            "input[name='phone']": "123-456-7890"
        }
        """
        try:
            for selector, value in field_values.items():
                field = self.wait.until(EC.element_to_be_clickable(
                    (By.CSS_SELECTOR, selector)
                ))
                field.clear()
                field.send_keys(value)
            
            logger.info("Form filled")
            return True
        except Exception as e:
            logger.error(f"Failed to fill form: {e}")
            return False
    
    def submit_form(self, submit_selector):
        """Submit a form."""
        try:
            submit_button = self.wait.until(EC.element_to_be_clickable(
                (By.CSS_SELECTOR, submit_selector)
            ))
            submit_button.click()
            
            logger.info("Form submitted")
            return True
        except Exception as e:
            logger.error(f"Failed to submit form: {e}")
            return False

# Example usage
if __name__ == "__main__":
    try:
        # Initialize browser
        browser = BrowserAutomation(headless=True)
        
        # Perform a Google search
        browser.search_google("Python automation examples")
        
        # Take a screenshot of the search results
        browser.take_screenshot("search_results.png")
        
        # Extract search results
        results = browser.extract_search_results()
        
        # Save results to JSON
        with open("search_results.json", "w", encoding="utf-8") as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        
        print(f"Extracted {len(results)} search results")
        
    except Exception as e:
        logger.critical(f"Browser automation failed: {e}")
```

To use the browser automation script, install Selenium and the appropriate WebDriver:

```bash
pip install selenium
```

## Comparing Python CLI/Automation with JavaScript

| Feature | Python | JavaScript |
|---------|--------|------------|
| CLI Libraries | argparse, click, typer | yargs, commander, oclif |
| UI Rendering | rich, blessed, urwid | ink, blessed, chalk |
| Process Automation | subprocess, os | child_process, shelljs |
| File Operations | shutil, glob, os | fs, fs-extra, glob |
| Task Scheduling | schedule, cron | node-cron, agenda |
| Web Automation | selenium, playwright | puppeteer, selenium-webdriver |
| Cross-platform | Excellent | Excellent |
| Packaging | PyInstaller, cx_Freeze | pkg, nexe, boxednode |

## Best Practices for CLI and Automation

1. **Make Scripts Self-Documenting**: Include help text, documentation, and examples
2. **Provide Feedback**: Show progress indicators for long-running operations
3. **Graceful Error Handling**: Catch and handle errors properly
4. **Input Validation**: Validate all user inputs to prevent errors
5. **Respect Rate Limits**: Add delays when automating web interactions
6. **Logging**: Add comprehensive logging for debugging
7. **Configuration Management**: Use config files for settings
8. **Testing**: Write tests for critical automation scripts
9. **Security**: Handle credentials securely, never hardcode them
10. **Dry Runs**: Allow users to preview actions before execution
11. **Idempotence**: Scripts should be safely runnable multiple times
12. **Output Control**: Allow control over verbosity levels

## Conclusion

Python excels at building command-line interfaces and automation scripts. With libraries like typer, rich, and selenium, you can create sophisticated tools that streamline workflows and save time. Whether you're building a simple utility or a complex automation system, Python provides the libraries, tools, and flexibility you need.

In this chapter, we explored:
- Creating command-line interfaces with `argparse` and `typer`
- Building interactive terminal applications with Prompt Toolkit
- Automating file operations and system tasks
- Web scraping and browser automation
- Scheduling recurring tasks

These skills are invaluable for Python developers, enabling you to build tools that make your work more efficient and eliminate repetitive tasks.

Now that you've reached the end of this handbook, you have all the knowledge needed to use Python effectively across a wide range of applications. From basic syntax to advanced frameworks, you've learned how Python can solve real-world problems and streamline development workflows. Continue exploring and building with Python to deepen your expertise!
