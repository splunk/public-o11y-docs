# Makefile for Sphinx documentation

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
BUILDDIR      = _build

# User-friendly check for sphinx-build
ifeq ($(shell which $(SPHINXBUILD) >/dev/null 2>&1; echo $$?), 1)
	$(error The '$(SPHINXBUILD)' command was not found. Make sure you have Sphinx installed, then set the SPHINXBUILD environment variable to point to the full path of the '$(SPHINXBUILD)' executable. Alternatively you can add the directory with the executable to your PATH. If you don\'t have Sphinx installed, grab it from http://sphinx-doc.org/)
endif

ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) .

.PHONY: help
help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  clean      to remove previous builds (cleans cache)"
	@echo "  html       to make standalone HTML files"
	@echo "  livehtml   to load the docs in a local server"

.PHONY: clean
clean:
	@echo
	@echo "Cleaning up files..."
	@rm -f $(BUILDDIR)/.DS_Store
	@rm -f $(BUILDDIR)/html/.DS_Store
	@rm -rf $(BUILDDIR)/*
	@echo "Old files removed..."

.PHONY: html
html:
	@echo "Building the MINIFY Files..."
	@echo 
	python3 _ext/assetminify.py
	@echo
	@echo "*****************************************************"
	@echo "        Building Splunk Observability Docs"
	@echo "*****************************************************"
	@echo
	@echo "Building the HTML files from source..."
	@echo
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

.PHONY: livehtml
livehtml:
	@echo
	@echo "*****************************************************"
	@echo "  Running live server for Splunk Observability Docs"
	@echo "*****************************************************"
	@echo
	@echo "Starting the live server..."
	@echo
	@sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O) --host 0.0.0.0 --port 8888
