# Project: CLI Tool Development

Build a command-line application with Click

## Building a CLI Tool

Let's create a practical command-line tool using Python's Click library. This is similar to building CLI tools with Commander.js in Node.js.

### Python with Click

```python
import click
import requests
from datetime import datetime

@click.group()
def cli():
    '''A simple weather CLI tool'''
    pass

@cli.command()
@click.option('--city', prompt='City name', help='The city to get weather for')
@click.option('--units', default='metric', help='Temperature units (metric/imperial)')
def weather(city, units):
    '''Get current weather for a city'''
    # Mock API call (replace with real API)
    click.echo(f'Getting weather for {city}...')
    
    # Simulate API response
    temp = 22 if units == 'metric' else 72
    unit_symbol = '°C' if units == 'metric' else '°F'
    
    click.echo(f'🌤️  Current weather in {city}:')
    click.echo(f'   Temperature: {temp}{unit_symbol}')
    click.echo(f'   Last updated: {datetime.now().strftime("%Y-%m-%d %H:%M")}')

@cli.command()
@click.argument('filename')
def analyze(filename):
    '''Analyze a text file'''
    try:
        with open(filename, 'r') as f:
            content = f.read()
            words = len(content.split())
            lines = len(content.splitlines())
            chars = len(content)
            
        click.echo(f'📄 File analysis for {filename}:')
        click.echo(f'   Lines: {lines}')
        click.echo(f'   Words: {words}')
        click.echo(f'   Characters: {chars}')
        
    except FileNotFoundError:
        click.echo(f'❌ Error: File {filename} not found', err=True)

if __name__ == '__main__':
    cli()
```

### Node.js with Commander

```javascript
const { program } = require('commander');
const fs = require('fs').promises;

program
  .name('weather-cli')
  .description('A simple weather CLI tool')
  .version('1.0.0');

program
  .command('weather')
  .description('Get current weather for a city')
  .option('-c, --city <city>', 'city name')
  .option('-u, --units <units>', 'temperature units', 'metric')
  .action(async (options) => {
    const city = options.city || 'London';
    console.log(`Getting weather for ${city}...`);
    
    // Simulate API response
    const temp = options.units === 'metric' ? 22 : 72;
    const unitSymbol = options.units === 'metric' ? '°C' : '°F';
    
    console.log(`🌤️  Current weather in ${city}:`);
    console.log(`   Temperature: ${temp}${unitSymbol}`);
    console.log(`   Last updated: ${new Date().toISOString()}`);
  });

program
  .command('analyze')
  .description('Analyze a text file')
  .argument('<filename>', 'file to analyze')
  .action(async (filename) => {
    try {
      const content = await fs.readFile(filename, 'utf8');
      const words = content.split(/\s+/).length;
      const lines = content.split('\n').length;
      const chars = content.length;
      
      console.log(`📄 File analysis for ${filename}:`);
      console.log(`   Lines: ${lines}`);
      console.log(`   Words: ${words}`);
      console.log(`   Characters: ${chars}`);
      
    } catch (error) {
      console.error(`❌ Error: File ${filename} not found`);
    }
  });

program.parse();
```
