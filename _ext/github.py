import ssl
import sys
import urllib
from docutils import nodes
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
                f = urllib.request.urlopen(url, context=call_context)
                self.content = f.read().decode('utf-8').splitlines()
            except urllib.error.HTTPError as e:
                try:
                    error = e.read().decode('utf-8')
                    message = '''This snippet couldn't be retrieved due to network issues.

Error: {error}

To see the code, go to {url}
              '''.format(error=error, url=url)
                    self.content = message.splitlines()
                except:
                    message = '''This snippet couldn't be retrieved due to HTTP errors.

To see the code, go to {url}
              '''.format(url=url)
                    self.content = message.splitlines()
            except urllib.error.URLError as e:
                try:
                    error = e.read().decode('utf-8')
                    message = '''This snippet couldn't be retrieved due to URL errors.

Error: {error}

To see the code, go to {url}
              '''.format(error=error, url=url)
                    self.content = message.splitlines()
                except:
                    message = '''This snippet couldn't be retrieved due to network issues.

To see the code, go to {url}
              '''.format(url=url)
                    self.content = message.splitlines()
            except Exception as e:
                error = e.read().decode('utf-8')
                message = '''This snippet couldn't be downloaded due to network issues.

Error: {error}

To see the code, go to {url}
              '''.format(error=error, url=url)
                self.content = message.splitlines()
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
