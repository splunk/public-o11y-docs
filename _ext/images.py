# -*- coding: utf-8 -*-
__version__ = '0.9.4'
__author__ = 'Tomasz Czyż <tomaszczyz@gmail.com>'
__license__ = "Apache 2"


import os
import sys
import copy
import uuid
import hashlib
import argparse
import functools
import pkg_resources

import sphinx
from sphinx.util.osutil import copyfile

try:
    from sphinx.util import logging

    logger = logging.getLogger(__name__)
except ImportError:
    logger = None

try:
    from sphinx.util.compat import Directive
except:
    from docutils.parsers.rst import Directive

try:
    from sphinx.util import status_iterator
except ImportError:
    pass

from sphinx.util.console import brown
from sphinx.util.osutil import ensuredir

from docutils import nodes
from docutils.parsers.rst import directives

import requests


STATICS_DIR_NAME = '_static'


DEFAULT_CONFIG = dict(
    backend='LightBox2',
    default_image_width='100%',
    default_image_height='auto',
    default_group=None,
    default_show_title=False,
    download=True,
    requests_kwargs={},
    cache_path='_images',
    override_image_directive=False,
    show_caption=False,
)


class Backend(object):
    STATIC_FILES = ()

    def __init__(self, app):
        self._app = app

    def visit_image_node_fallback(self, writer, node):
        writer.visit_image(node)

    def depart_image_node_fallback(self, writer, node):
        writer.depart_image(node)


class image_node(nodes.image, nodes.General, nodes.Element):
    pass


class gallery_node(nodes.image, nodes.General, nodes.Element):
    pass


def directive_boolean(value):
    if not value.strip():
        raise ValueError("No argument provided but required")
    if value.lower().strip() in ["yes", "1", 1, "true", "ok"]:
        return True
    elif value.lower().strip() in ['no', '0', 0, 'false', 'none']:
        return False
    else:
        raise ValueError(u"Please use on of: yes, true, no, false. "
                         u"Do not use `{}` as boolean.".format(value))


class ImageDirective(Directive):
    '''
    Directive which overrides default sphinx directive.
    It's backward compatibile and it's adding more cool stuff.
    '''

    align_values = ('left', 'center', 'right')

    def align(argument):
        # This is not callable as self.align.  We cannot make it a
        # staticmethod because we're saving an unbound method in
        # option_spec below.
        return directives.choice(argument, ImageDirective.align_values)

    has_content = True
    required_arguments = True

    option_spec = {
        'width': directives.length_or_percentage_or_unitless,
        'height': directives.length_or_unitless,
        'strech': directives.choice,

        'group': directives.unchanged,
        'class': directives.class_option,  # or str?
        'alt': directives.unchanged,
        'download': directive_boolean,
        'title': directives.unchanged,
        'align': align,
        'show_caption': directive_boolean,
        'legacy_class': directives.class_option,
    }

    def run(self):
        env = self.state.document.settings.env
        conf = env.app.config.images_config

        #TODO get defaults from config
        group = self.options.get('group',
            conf['default_group'] if conf['default_group'] else uuid.uuid4())
        classes = self.options.get('class', '')
        width = self.options.get('width', conf['default_image_width'])
        height = self.options.get('height', conf['default_image_height'])
        alt = self.options.get('alt', '')
        title = self.options.get('title', '' if conf['default_show_title'] else None)
        align = self.options.get('align', '')
        show_caption = self.options.get('show_caption', False)
        legacy_classes = self.options.get('legacy_class', '')

        #TODO get default from config
        download = self.options.get('download', conf['download'])

        # parse nested content
        #TODO: something is broken here, not parsed as expected
        description = nodes.paragraph()
        content = nodes.paragraph()
        content += [nodes.Text(u"%s" % x) for x in self.content]
        self.state.nested_parse(content,
                                0,
                                description)

        img = image_node()

        if self.is_remote(self.arguments[0]):
            img['remote'] = True
            if download:
                img['uri'] = os.path.join('_images', hashlib.sha1(self.arguments[0].encode()).hexdigest())
                img['remote_uri'] = self.arguments[0]
                env.remote_images[img['remote_uri']] = img['uri']
                env.images.add_file('', img['uri'])
            else:
                img['uri'] = self.arguments[0]
                img['remote_uri'] = self.arguments[0]
        else:
            img['uri'] = self.arguments[0]
            img['remote'] = False
            env.images.add_file('', img['uri'])

        img['content'] = description.astext()

        if title is None:
            img['title'] = ''
        elif title:
            img['title'] = title
        else:
            img['title'] = img['content']
            img['content'] = ''

        img['show_caption'] = show_caption
        img['legacy_classes'] = legacy_classes
        img['group'] = group
        img['size'] = (width, height)
        img['classes'] += classes
        img['alt'] = alt
        img['align'] = align
        return [img]

    def is_remote(self, uri):
        uri = uri.strip()
        env = self.state.document.settings.env
        app_directory = os.path.dirname(os.path.abspath(self.state.document.settings._source))
        if sphinx.__version__.startswith('1.1'):
            app_directory = app_directory.decode('utf-8')

        if uri[0] == '/':
            return False
        if uri[0:7] == 'file://':
            return False
        if os.path.isfile(os.path.join(env.srcdir, uri)):
            return False
        if os.path.isfile(os.path.join(app_directory, uri)):
            return False
        if '://' in uri:
            return True
        raise ValueError('Image URI `{}` have to be local relative or '
                         'absolute path to image, or remote address.'
                         .format(uri))


def install_backend_static_files(app, env):
    STATICS_DIR_PATH = os.path.join(app.builder.outdir, STATICS_DIR_NAME)
    dest_path = os.path.join(STATICS_DIR_PATH, 'sphinxcontrib-images',
                             app.sphinxcontrib_images_backend.__class__.__name__)
    files_to_copy = app.sphinxcontrib_images_backend.STATIC_FILES

    for source_file_path in (app.builder.status_iterator
        if hasattr(app.builder, 'status_iterator') else status_iterator)(
            files_to_copy,
            'Copying static files for sphinxcontrib-images...',
            brown, len(files_to_copy)):

        dest_file_path = os.path.join(dest_path, source_file_path)

        if not os.path.exists(os.path.dirname(dest_file_path)):
            ensuredir(os.path.dirname(dest_file_path))

        source_file_path = os.path.join(os.path.dirname(
            sys.modules[app.sphinxcontrib_images_backend.__class__.__module__].__file__),
            source_file_path)

        copyfile(source_file_path, dest_file_path)

        if dest_file_path.endswith('.js'):
            app.add_js_file(os.path.relpath(dest_file_path, STATICS_DIR_PATH))
        elif dest_file_path.endswith('.css'):
            app.add_css_file(os.path.relpath(dest_file_path, STATICS_DIR_PATH))


def download_images(app, env):
    conf = app.config.images_config

    for src in (app.builder.status_iterator
        if hasattr(app.builder, 'status_iterator') else status_iterator)(
            env.remote_images,
            'Downloading remote images...',
            brown,
            len(env.remote_images)):

        dst = os.path.join(env.srcdir, env.remote_images[src])
        if not os.path.isfile(dst):
            logger.info('{} -> {} (downloading)'
                      .format(src, dst))
            with open(dst, 'wb') as f:
                # TODO: apply reuqests_kwargs
                try:
                    f.write(requests.get(src,
                                        **conf['requests_kwargs']).content)
                except requests.ConnectionError:
                    logger.info("Cannot download `{}`".format(src))
        else:
            logger.info('{} -> {} (already in cache)'
                      .format(src, dst))


def update_config(app, config):
    '''Ensure all config values are defined'''

    merged = copy.deepcopy(DEFAULT_CONFIG)
    merged.update(config.images_config)
    config.images_config = merged

def configure_backend(app):
    config = app.config.images_config
    ensuredir(os.path.join(app.env.srcdir, config['cache_path']))

    # html builder
    # self.relfn2path(imguri, docname)

    backend_name_or_callable = config['backend']
    if isinstance(backend_name_or_callable, str):
        try:
            backend = list(pkg_resources.iter_entry_points(
                                group='sphinxcontrib.images.backend',
                                name=backend_name_or_callable))[0]
            backend = backend.load()
        except IndexError:
            raise IndexError("Cannot find sphinxcontrib-images backend "
                                "with name `{}`.".format(backend_name_or_callable))
    elif callable(backend_name_or_callable):
        pass
    else:
        raise TypeError("sphinxcontrib-images backend is configured "
                        "improperly. It has to be a string (name of "
                        "installed backend) or callable which returns "
                        "backend instance but is `{}` (type:`{}`). Please read "
                        "sphinxcontrib-images documentation for "
                        "more informations."
                        .format(backend_name_or_callable,
                                type(backend_name_or_callable)))

    try:
        backend = backend(app)
    except TypeError as error:
        logger.info('Cannot instantiate sphinxcontrib-images backend `{}`. '
                 'Please, select correct backend. Available backends: {}.'
                 .format(config['backend'],
                ', '.join(ep.name for ep in pkg_resources.iter_entry_points(group='sphinxcontrib.images.backend'))
                 ))
        raise SystemExit(1)

    # remember the chosen backend for processing. Env and config cannot be used
    # because sphinx try to make a pickle from it.
    app.sphinxcontrib_images_backend = backend

    logger.info('Initiated sphinxcontrib-images backend: ', nonl=True)
    logger.info('`{}`'.format(str(backend.__class__.__module__ +
                           ':' + backend.__class__.__name__)))

    def backend_methods(node, output_type):
        def backend_method(f):
            @functools.wraps(f)
            def inner_wrapper(writer, node):
                return f(writer, node)
            return inner_wrapper
        signature = '_{}_{}'.format(node.__name__, output_type)
        return (backend_method(getattr(backend, 'visit' + signature,
                               getattr(backend, 'visit_' + node.__name__ + '_fallback'))),
                backend_method(getattr(backend, 'depart' + signature,
                               getattr(backend, 'depart_' + node.__name__ + '_fallback'))))


    # add new node to the stack
    # connect backend processing methods to this node
    app.add_node(image_node,
                 **{output_type: backend_methods(image_node, output_type)
                    for output_type in ('html', 'latex', 'man', 'texinfo',
                                        'text', 'epub')})

    app.add_directive('thumbnail', ImageDirective)
    if config['override_image_directive']:
        app.add_directive('image', ImageDirective)
    app.env.remote_images = {}

def setup(app):
    app.require_sphinx('1.0')
    app.add_config_value('images_config', {}, 'env')
    app.connect('config-inited', update_config)
    app.connect('builder-inited', configure_backend)
    app.connect('env-updated', download_images)
    app.connect('env-updated', install_backend_static_files)

    global logger

    if logger is None:
        logger = app

    return {'version': sphinx.__version__, 'parallel_read_safe': True}


def main(args=sys.argv[1:]):
    ap = argparse.ArgumentParser()
    ap.add_argument("command",
                    choices=['show-backends'])
    args = ap.parse_args(args)
    if args.command == 'show-backends':
        backends = pkg_resources.iter_entry_points(group='sphinxcontrib.images.backend')
        if backends:
            for backend in backends:
                print ('- {0.name} (from `{0.dist}` package)'.format(backend))
        else:
            print ('No backends installed')