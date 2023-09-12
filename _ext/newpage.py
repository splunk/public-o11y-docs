"""
This module implemented the ``new-page`` and ``new-page-any`` roles.

You can use ``:new-page:`link``` to have a link open in a new page.

For example::

   This :new-page:`Google <https://google.com>` should open in a new window

   This :new-page:`https://foobar.com` should open in a new window

You can use ``:new-page-any:`` like the ``:any:`` role.
It will just open in a new page.

For example::

    :new-page-any:`Support </support>`
    :any:`Support </support>`
    
Both of these would link to your support page,
with the first opening it in a new page.

    brs
    Added :new-page:ref: 7/17/18, so internal reference links can also open in a new page 
    i.e., something like :new-page-ref:`this link` or :new-page-ref:`some text<this link>`will open in a new page. Space between text and < is optional.

"""

import re
from docutils import nodes
from docutils.parsers.rst import roles

from sphinx.roles import AnyXRefRole

url_re = re.compile(r'^(.*)<(.*)>$')


def new_page(name, rawtext, text, lineno, inliner, options={}, content=[]):
    """
    An rst role that creates links that open in a new page.
    """
    match = url_re.search(text)
    if match:
        title, url = match.groups()
    else:
        url = title = text.strip()
    options['classes'] = ['new-page']
    roles.set_classes(options)
    node = nodes.reference(rawtext, title, refuri=url, **options)
    return [node], []


class NewPageXRef(AnyXRefRole):

    def process_link(self, env, refnode, has_explicit_title, title, target):
        result = AnyXRefRole.process_link(self, env, refnode, has_explicit_title,
                                          title, target)
        refnode['classes'].append('new-page')
        refnode.attributes['reftype'] = 'any'
        return result


def setup(app):
    app.add_role('new-page', new_page)
    roles.register_local_role('new-page-any', NewPageXRef(warn_dangling=True))
    roles.register_local_role('new-page-ref', NewPageXRef(warn_dangling=True))

