import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('o11y'.upper(), 'O11Y')

    def test_isupper(self):
        self.assertTrue('O11Y'.isupper())
        self.assertFalse('o11y'.isupper())

    def test_split(self):
        s = 'o11y docs'
        self.assertEqual(s.split(), ['o11y', 'docs'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

if __name__ == '__main__':
    unittest.main()
