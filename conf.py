######################################################################
# SPLUNK OBSERVABILITY CLOUD DOCUMENTATION BUILD CONFIGURATION FILE  #
######################################################################

# GENERAL CONFIGURATION
#######################

import sys
import os

# Add the _ext directory to sys.path, so that Sphinx can find extensions in _ext.
sys.path.insert(0, os.path.join(os.path.abspath('.'), '_ext'))

from assetminify import final_conf_includes

extensions = [
    'sphinx_copybutton',
    'notfound.extension',
    'newpage',
    'github',
    'optimizer',
    'myst_parser',
    'sphinx_tabs.tabs',
    'olly_on_git_hub'
]

html_context = {
    'search': 'search.html'
}

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown'
}

master_doc = 'index'
project = 'Splunk'
copyright = '2023 Splunk, Inc'
author = 'Splunk'
version = ''
release = ''
language = 'en'

exclude_patterns = ['_build', 'venv/lib/*/site-packages', '**/site-packages', 'Thumbs.db', '.DS_Store','z_cheat-sheets', 'README.md', 'CONTRIBUTING.md', '.github/pull_request_template.md', 'gdi/couchdb/couchdb.md', 'apm/find-root-cause.rst']

# THEME CONFIGURATION
#######################

pygments_style = 'sphinx'
todo_include_todos = False
html_theme = 'alabaster'
html_baseurl = "https://docs.splunk.com/Observability/"
html_title = 'Splunk Observability Cloud documentation'
html_favicon = 'favicon.ico'
html_static_path = ['_static']
html_sidebars = {
    '**': [
#       'searchbox.html',
        'about.html',
        'fulltoc.html',
        'relations.html',
    ]
}
html_theme_options = {
    'logo_name': True,
    'github_button': False,
}
html_permalinks_icon = u'  🔗'
htmlhelp_basename = 'Splunkdoc'

# EXTENSION SETTINGS
#######################

# GitHub edit links settings
olly_on_github_repo = 'splunk/public-o11y-docs'
olly_on_github_branch = 'main'

# Tabs settings
sphinx_tabs_disable_tab_closing = True

# Not found extension settings
notfound_template = '404.html'
notfound_urls_prefix = '/Observability/'

# Set myst_parser to automatically generate labels for h1, h2, and h3 headings
myst_heading_anchors = 3

# Copy button settings
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True
copybutton_copy_empty_lines = False
copybutton_line_continuation_character = "\\"

# Link Checker settings

linkcheck_anchors = False
linkcheck_workers = 3
linkcheck_exclude_documents = [r'_.*', r'\.github', r'myst_parser', r'tests']
linkcheck_ignore = [r'https://ingest.*',r'https://app.*',r'https://login.*',r'.*\<.*',r'https://api.*',r'https://rum-ingest.*',r'https://proxy.*',r'https://example.*', r'https://domain.com.*', r'.*domain/path.*', r'.*signalfx.com.*', r'.*your_realm.*', r'.*your_domain.*']

# ROLES AND MACROS
#######################

rst_prolog = """
.. role:: not-ok
.. role:: ok
.. role:: note
.. role:: strong
.. role:: title
.. role:: monospace
.. role:: strike

.. |more| raw:: html

   ⋯

.. |verticaldots| raw:: html

   ⋮

.. |takeshift| image:: /_images/incident-intelligence/Incident-intelligence-take-shift-icon.png
   :alt: Take shift
   :class: inline-image

.. |br| raw:: html

   <br />

.. |hr| raw:: html

   <hr />

"""

# An RST epilog to add variable names for feature text replacement, and non-breaking space.

rst_epilog = """
.. |ms| replace:: Metrics Sidebar
.. |mtab| replace:: Muting Rules tab
.. |sn| replace:: ServiceNow
.. |sv| replace:: secondary visualization
.. |openmenu| replace:: Open the Detector
   menu by clicking the bell icon at the top right corner of a chart.

.. |nbsp| unicode:: 0xA0
      :trim:

.. |hyph| unicode:: 0x2011
      :trim:

"""

# FUNCTIONS AND SETUP
#######################

def on_page_context(app, pagename, templatename, context, doctree):
    """
    This injects the ``get_local_toc`` function into the document.

    The logic around the builder is because the JSON and other HTML builders,
    they will error because we've added a Python function into the context.
    So we have to make sure we're only putting this into HTML builders,
    and ones that don't serialize the context.
    """
    if getattr(app.builder, 'implementation', None) or app.builder.format != 'html':
        return
    context['get_local_toc'] = app.builder._get_local_toctree


def determine_local_toc(app, pagename, templatename, context, doctree):
    """
    This code determines the set of documents that get a local TOC in the sidebar.

    Any new books can be added to the ``books`` list here,
    and they will be given the proper local TOC sidebar.

    The actual implementation is in ``_templates/fulltoc.html``,
    where we show the proper toc depending on the ``show_local_toc`` variable here.
    """
    books = []
    localtoc = False
    for book in books:
        if pagename.startswith(book):
            localtoc = True
            break
    context['show_local_toc'] = localtoc


def setup(app):
    # don't include any js or css file here or any other .py files , instead use only _ext/assetminify.py file 
    app.add_css_file('main.min.css')
    app.add_js_file('main.min.js')
    massets = final_conf_includes
    for asstname in massets:
        if asstname.endswith('.js'):
            app.add_js_file(asstname)
        if asstname.endswith('.css'):
            app.add_css_file(asstname)
            
    app.connect('html-page-context', on_page_context)
    app.connect('html-page-context', determine_local_toc)
    #   app.add_stylesheet('signalfx-fonts.css')


# END OF SETTINGS FILE
#######################
