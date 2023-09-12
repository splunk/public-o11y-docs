# $Id$
# Author: David Goodger <goodger@python.org>
# Copyright: This module has been placed in the public domain.

"""
Directives for figures and simple images.
"""

__docformat__ = 'reStructuredText'


import sys
from docutils import nodes, utils
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives, states
from docutils.nodes import fully_normalize_name, whitespace_normalize_name
from docutils.parsers.rst.roles import set_classes


class imagetarget(Directive):

    align_h_values = ('left', 'center', 'right')
    align_v_values = ('top', 'middle', 'bottom')
    align_values = align_v_values + align_h_values

    def align(argument):
        # This is not callable as self.align.  We cannot make it a
        # staticmethod because we're saving an unbound method in
        # option_spec below.
        return directives.choice(argument, imagetarget.align_values)

    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {'alt': directives.unchanged,
                   'height': directives.length_or_unitless,
                   'width': directives.length_or_percentage_or_unitless,
                   'scale': directives.percentage,
                   'align': align,
                   'target': directives.unchanged_required,
                   'class': directives.class_option}

    def run(self):
        if 'align' in self.options:
            if isinstance(self.state, states.SubstitutionDef):
                # Check for align_v_values.
                if self.options['align'] not in self.align_v_values:
                    raise self.error(
                        'Error in "%s" directive: "%s" is not a valid value '
                        'for the "align" option within a substitution '
                        'definition.  Valid values for "align" are: "%s".'
                        % (self.name, self.options['align'],
                           '", "'.join(self.align_v_values)))
            elif self.options['align'] not in self.align_h_values:
                raise self.error(
                    'Error in "%s" directive: "%s" is not a valid value for '
                    'the "align" option.  Valid values for "align" are: "%s".'
                    % (self.name, self.options['align'],
                       '", "'.join(self.align_h_values)))
        messages = []
        reference = directives.uri(self.arguments[0])
        self.options['uri'] = reference
        reference_node = None
        if 'target' in self.options:
            block = states.escape2null(
                self.options['target']).splitlines()
            block = [line for line in block]
            target_type, data = self.state.parse_target(
                block, self.block_text, self.lineno)
            if target_type == 'refuri':
                reference_node = nodes.reference(refuri=data)
            elif target_type == 'refname':
                reference_node = nodes.reference(
                    refname=fully_normalize_name(data),
                    name=whitespace_normalize_name(data))
                reference_node.indirect_reference_name = data
                self.state.document.note_refname(reference_node)
            else:                           # malformed target
                messages.append(data)       # data is a system message
            del self.options['target']
        set_classes(self.options)
        imagetarget_node = nodes.image(self.block_text, **self.options)
        if reference_node:
            reference_node += imagetarget_node
            return messages + [reference_node]
        else:
            return messages + [imagetarget_node]
        
def setup(app):
    app.add_directive("imagetarget", imagetarget)

    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }