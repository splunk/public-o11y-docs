# Splunk Observability Cloud documentation

This repository contains the code and documentation for https://docs.splunk.com/Observability

## Contribute to the documentation

We welcome docs contributions. See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Requirements

The documentation in this repository is built from [reStructuredText](https://docutils.sourceforge.io/rst.html) and Markdown files using [Sphinx](https://www.sphinx-doc.org/en/master/).

To build the documentation on your machine use the Docker container provided in this repository, which contains a configured Python environment.

### Install the docs on your machine

Follow these steps to clone and install the docs to your local machine:

1. Clone this repository using `git clone`.
2. Navigate to the cloned repository in your file system.
3. Change the permissions of `start.sh` by entering `chmod +x start.sh` in the terminal.

### Test the docs locally

After you've saved your changes, you can test the docs using the Docker container:

- Run `./start.sh` from the terminal.
- Enter `make html` or `make clean html` from within the container to build the documentation.
- Browse `http://localhost:9999` to see the local build of the docs. 
- If you're using the `make livehtml` option, browse `http://localhost:8888`.

> **NOTE:** Don't run git commands from the container. Exit the container first or use a separate terminal window or tab.

## License

The documentation source in rST and Markdown formats, the screenshots and animations, as well as all documentation assets are licensed under the Creative Commons 4.0 license. See [DOCS-LICENSE.md](DOCS-LICENSE).

The code of the documentation website is licensed under the Apache 2.0 license. See [LICENSE.md](LICENSE).

For information on third-party components and libraries used by the source code, see [THIRD_PARTY.md](THIRD_PARTY).