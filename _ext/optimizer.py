from docutils.nodes import literal_block
from pygments.lexers import ClassNotFound, find_lexer_class_by_name
from sphinx.locale import __
from sphinx.transforms.post_transforms import SphinxPostTransform

class LexerValidation(SphinxPostTransform):
    default_priority = 500
    builders = ('dummy',)

    def __init__(self, *args, **kwargs):
        from sphinx.highlighting import lexers, lexer_classes, logger

        super().__init__(*args, **kwargs)
        self.lexer_names = lexers.keys() | lexer_classes.keys()
        self.logger = logger

    def run(self, **kwargs):
        for node in self.document.findall(literal_block):
            lang = node.get('language', 'default')
            self.validate_lexer(lang, node)

    def validate_lexer(self, lang, location):
        if lang in {'py', 'py3', 'python3', 'default', 'pycon3'}:
            lang = 'python'

        if lang in self.lexer_names:
            return

        try:
            lexer = find_lexer_class_by_name(lang)
        except ClassNotFound:
            self.logger.warning(__('Pygments lexer name %r is not known'), lang,
                                location=location)

def setup(app):
    app.add_post_transform(LexerValidation)