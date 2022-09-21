"""
This tagging extension lets you tag documents and include them based on tags.

You can tag documents by putting a ``:tags: tag1, tag2`` at the top of the file.

This will then populate a ``related`` variable in the template context.

You can also include a set of tags with the ``.. tag-include:: tag1`` directive.
The special value of ``mine`` will include pages tagged the same as the current page.
"""

from collections import defaultdict

from docutils import nodes
from docutils.parsers.rst import Directive, directives

# class taginclude(nodes.General, nodes.Element):
#     def __init__(self, *args, **kwargs):
#         nodes.Element.__init__(self, *args, **kwargs)

# jamie

class taginclude(nodes.General, nodes.Element):
    tag = {}
    
    def __init__(self, *args, **kwargs):
        nodes.Element.__init__(self, *args, **kwargs)
        
        
class TagIncludeDirective(Directive):
    has_content = True
    option_spec = {
        'length': directives.positive_int,
    }
    def __init__(self, *args, **kwargs):
        Directive.__init__(self, *args, **kwargs)
        
    def run(self):
        tag = self.content[0].strip()
        node = taginclude()
        node.tag = tag
        node.options = self.options
        return [node]


def process_includes(app, doctree, fromdocname):
    env = app.builder.env
    env.page_to_tag = defaultdict(set)
    env.tag_to_page = defaultdict(set)

    # index metadata
#    for pagename, metadata in env.metadata.iteritems():
    for pagename, metadata in env.metadata.items():
        if 'tags' in metadata:
            tags = metadata['tags'].split(',')
            tags = [tag.strip() for tag in tags]
            env.page_to_tag[pagename] = set(tags)
            for tag in tags:
                env.tag_to_page[tag].add(pagename)

 #jamie
    for node in doctree.traverse(taginclude):
        if not hasattr(node, 'tag'):
            continue
        tag = node.tag
        if not tag:
            continue
            
#     for node in doctree.traverse(taginclude):
#         tag = node.tag
#         if ',' in tag:
#             tags = tag.split(',')
#         else:
#             if tag == 'mine':
#                 tags = env.page_to_tag[fromdocname]
#             else:
#                 tags = [tag]

        max_pages = 5
        if 'length' in node.options:
            max_pages = node.options['length']

        content = []

        for tag in tags:

            pages = set()
            for page in env.tag_to_page[tag]:
               if page != fromdocname:
                   pages.add(page)

            pages = list(pages)[:max_pages]

            content.append(nodes.Text(''))
#            content.append(nodes.Text('Nodes tagged `%s`' % tag))

            for page in pages:
                para = nodes.paragraph()
                title = env.titles[page].astext()
                content.append(para)

                newnode = nodes.reference(title, title)
                newnode['refdocname'] = page
                newnode['refuri'] = app.builder.get_relative_uri(
                    fromdocname, page)
                para += newnode

        node.replace_self(content)


def add_includes_to_context(app, pagename, templatename, context, doctree):
    # print ('******************************')
    # print ('page to ignore is %s' % pagename)
    tags = app.env.page_to_tag[pagename]
    related = set()
    for tag in tags:
        # print (' tag is %s' % tag)
        for page in app.env.tag_to_page[tag]:
            # print (' tag to page is %s' % page)
            if page != pagename:   
                # print ('adding page %s' % page)
                related.add(page)
            # else:
                # print ('ignoring page %s' % page)
    # This needs to be a list so it can be JSON serialized
    context['related'] = list(related)
    #if pagename == 'getting-started/quick-start':
    #  # print ('****************************** %s ' % context)


def purge_includes(app, env, docname):
    if not hasattr(env, 'page_to_tag'):
        return
    env.page_to_tag = {key: val for key, val in env.page_to_tag.items()
                       if key != docname}


def setup(app):
    app.add_directive('tag-include', TagIncludeDirective)
    app.add_node(taginclude)
    app.connect('doctree-resolved', process_includes)
    app.connect('html-page-context', add_includes_to_context)
    # Comment this out for now, as I believe it isn't needed with the current implementation
    # app.connect('env-purge-doc', purge_includes)

