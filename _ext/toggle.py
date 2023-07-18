# Import Docutils document tree nodes module.
from docutils import nodes
# Import Directive base class.
from docutils.parsers.rst import Directive


class ToggleDirective(Directive):
    """
    This module implements the ``toggle`` directive.

    It can be used like::

        .. toggle::

            This is some content to hide.

            It can have **rst** in it.


    You can set the ``expanded`` or ``collapsed`` :class: on the directive::

        .. toggle::
           :class: expanded

            This will be visible by default.
    """

    required_arguments = 0
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {'class': str}
    has_content = True

    def run(self):
        # Raise an error if the directive does not have contents.
        self.assert_has_content()
        text = '\n'.join(self.content)
        innernode = nodes.container(rawsource=text)
        # Parse the directive contents.
        self.state.nested_parse(self.content, self.content_offset, innernode)
        resultnode = nodes.container()
        resultnode['classes'].append('html-toggle')
        input_class = self.options.get('class', '')
        if input_class:
            classes = input_class.split(',')
            for cls in classes:
                resultnode['classes'].append(cls)
        shownode = nodes.paragraph('', '')
        resultnode.append(shownode)
        resultnode.append(innernode)
        return [resultnode]


def setup(app):
    app.add_directive('toggle', ToggleDirective)
    #app.add_js_file('toggle-sections.js')
    #app.add_css_file('toggle-sections.css')
