import requests, sys
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
            f = requests.get(url)
            self.content = statemachine.StringList(f.text.splitlines())
        else:
            sys.exit("Referenced file does not belong to Splunk repositories.")
        return super().run()

def setup(app):
    app.add_directive("github", GitHub)

    return {
        'version': '0.1',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
