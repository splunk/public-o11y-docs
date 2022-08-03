def on_page_context(app, pagename, templatename, context, doctree):
    """
    This injects the ``get_apm_toc`` function into the document.

    The logic around the builder is because the JSON and other HTML builders,
    they will error because we've added a Python function into the context.
    So we have to make sure we're only putting this into HTML builders,
    and ones that don't serialize the context.
    """
    if getattr(app.builder, 'implementation', None) or app.builder.format != 'html':
        return
    context['get_apm_toc'] = app.builder._get_apm_toctree


def determine_apm_toc(app, pagename, templatename, context, doctree):
    """
    This code determines the set of documents that get a local TOC in the sidebar.

    Any new books can be added to the ``apm-books`` list here,
    and they will be given the proper local TOC sidebar.

    The actual implementation is in ``_templates/fulltoc.html``,
    where we show the proper toc depending on the ``show_apm_toc`` variable here.
    """
    apm-books = ['apm-reference-guide']
    apmtoc = False
    for apm-book in apm-books:
        if pagename.startswith(apm-book):
            apmtoc = True
            break
    context['show_apm_toc'] = apmtoc
