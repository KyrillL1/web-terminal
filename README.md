# Overview of WEB-TERMINAL
Web-Terminal is a fully customizable and easy to understand HTML template including HTML, Javascript and CSS to make your website look like a terminal.
Everything happens on the client-side, so is not secure.
It's really basic, but easy to customize.

## Test it out
Have a look at the [example](https://KyrillL1.github.io/web-terminal-example).

## Run
Download the files or clone the repo. Test it by simply running a local server e.g.
```bash
python -m SimpleHTTPServer # from within the folder
```
and then navigate to localhost:8000.

To use it in your website, include the below in your header (Make sure to replace the $VARIABLES):

```html
<!-- CSS (load bootstrap from a CDN) -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
   <!-- You need the complete jQuery -->
<script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
<!-- Needed, so Bootstrap tooltips work -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<!-- custom fonts -->
<link href="https://fonts.googleapis.com/css?family=Mina" rel="stylesheet">
<!-- locally, of this repo -->
<link href="/$PATH_TO/index-style.css" rel="stylesheet" type="text/css" />
```
Then, add this to your `<body>` (Again make sure to replace the $VARIABLES).

```html
<div id="container">
  <output></output>
  <div id="input-line" class="input-line">
    <div class="prompt"></div>
    <div><input class="cmdline" autofocus /></div>
  </div>
</div>
<!-- Includes the custom object "Terminal" to set it up later -->
<script src="/PATH_TO/terminal.js"></script> <!-- locally, of this repo -->
<!-- Actual initialization of the terminal -->
<script>
$(function() {
  // configuration data
  var config = {
    prompt: "[user@web-terminal]$ ", // user will be replaced by guest
    commands: {
      // specify what should happen on a cmd and return string to write to terminal
      help: (argString) => {
        return('<div class="ls-files">' + Object.keys(config.commands).join('<br>') + '</div>');
      },
      echo: (argString) => {
        return argString;
      },
      login: (argString) => {
        // example login feature. NOT SECURE!
        if (argString == "") {
          return("Please login using login &#60;username&#62; &#60;password&#62;");
        }
        var args = argString.split(" ");
        term.login(args[0]/*user*/, args[1]/*pw*/);
      },
      logout: (argString) => {
        term.logout();
      },
      // required as of the current setup, otherwise TypeErr is thrown
      default: () => {
        return("Not a command. Enter 'help' for more information.")
      }
    }
  };
  // Initialize a new terminal object
  // new Terminal(cmdLineContainer, outputContainer, config)
  var term = new Terminal('#input-line .cmdline', '#container output', config);
  term.init();
  });
</script>
```
## Customize

The main purpose of this repository is easy customization.
Just add custom attributes or custom methods in `/terminal.js` and then refer back to them within your script using `term.<custom-attribute>` or `term.<custom-method>`.
