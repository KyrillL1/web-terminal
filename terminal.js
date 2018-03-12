var Terminal = Terminal || function(cmdLineContainer, outputContainer, config) {
  // needed vars
  var cmdLine = document.querySelector(cmdLineContainer);
  var output = document.querySelector(outputContainer);

  var fs = null;
  var cwd = null;
  var history = [];
  var histpos = 0;
  var histtemp = 0;

  window.addEventListener('click', function(e) {
    cmdLine.focus();
  }, false);

  cmdLine.addEventListener('click', inputTextClick, false);
  cmdLine.addEventListener('keydown', historyHandler, false);
  cmdLine.addEventListener('keydown', processNewCommand, false);

  // Helper functions
  function inputTextClick(e) {
    this.value = this.value;
  }

  function historyHandler(e) {
    if (history.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history[histpos]) {
          history[histpos] = this.value;
        } else {
          histtemp = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos--;
        if (histpos < 0) {
          histpos = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos++;
        if (histpos > history_.length) {
          histpos = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history[histpos] ? history[histpos] : histtemp;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  function processNewCommand(e) {
    const CMDS = config.cmds;

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history[history.length] = this.value;
        histpos = history.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output.appendChild(line);
      var cmd = this.value.trim().split(' ')[0].toLowerCase();

      if (!(cmd in config.commands) && cmd != '') cmd = "default";

      var argString = this.value.replace(cmd, "").trim();
      output_(config.commands[cmd](argString));

      window.scrollTo(0, getDocHeight());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function output_(html) {
    if (html === undefined) return;
    output.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
      );
    }

  // add custom attributes here. Refer to "this.<custom-attribute>" later via term.<custom-attribute>
  this.user = "guest";
  this.prompt = config.prompt.replace("user", this.user);
  this.loggedIn = 0; // no. 1 is admin

  // add custom functions here
  this.init = () => {
    output_('<img align="left" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/CSS3_and_HTML5_logos_and_wordmarks.svg/2000px-CSS3_and_HTML5_logos_and_wordmarks.svg.png" width="250px" height="100px" style="padding: 0px 10px 20px 0px"><h2 style="letter-spacing: 4px">Example Web Terminal</h2><p>' + new Date() + '</p><p>How may I help? Enter \'help\' for Information.</p>');
    $('.prompt').html(this.prompt);
  }

  this.login = (user, pw) => {
    if (user === "admin" && pw === "pw") {
      this.prompt = config.prompt.replace("user", user);
      $('.prompt').html(this.prompt);
      output_("Logged in as "+user);
    } else {
      output_("Wrong password or username.");
    }
  }

  this.logout = () => {
    this.prompt = config.prompt.replace("user", "guest");
    $('.prompt').html(this.prompt);
    output_("Logged out");
  }
};
