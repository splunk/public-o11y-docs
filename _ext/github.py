import ssl, sys, urllib
from docutils import statemachine, nodes
from docutils.parsers.rst import directives
import sphinx.directives.code

class GitHub(sphinx.directives.code.CodeBlock):

    required_arguments = 1
    final_argument_whitespace = False
    has_content = False

    option_spec = {
        'url': directives.uri,
    }

    def run(self):

        url = self.options.get('url')
        if "raw.githubusercontent.com/signalfx" in url or "raw.githubusercontent.com/splunk" in url:
          try:
            call_context = ssl._create_unverified_context()
            f = urllib.request.urlopen(url,context=call_context)
            self.content = f.read().decode('utf-8').splitlines()
          except urllib.error.HTTPError as e:
            self.content = e.read().decode('utf-8').splitlines()
          except urllib.error.URLError as e:
            self.content = e.read().decode('utf-8').splitlines()
        else:
            message = "Referenced file does not belong to Splunk repositories."
            self.content = message.splitlines()
        return super().run()

def setup(app):
    app.add_directive("github", GitHub)

    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }