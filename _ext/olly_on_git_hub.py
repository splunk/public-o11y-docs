import os
import warnings

def olly_get_github_url(app, view, path):
    return 'https://github.com/{repo}/{view}/{branch}/{path}'.format(
        repo=app.config.olly_on_github_repo,
        view=view,
        branch=app.config.olly_on_github_branch,
        path=path)


def html_page_context(app, pagename, templatename, context, doctree):
    if templatename != 'page.html':
        return

    if not app.config.olly_on_github_repo:
        warnings.warn("olly_on_github_repo not specified")
        return

    path = os.path.relpath(doctree.get('source'), app.builder.srcdir)
    show_url = olly_get_github_url(app, 'edit', path)
    
    context['olly_on_github_url'] = show_url
    

def setup(app):
    app.add_config_value('olly_on_github_repo', '', True)
    app.add_config_value('olly_on_github_branch', 'main', True)
    app.connect('html-page-context', html_page_context)