# Splunk Observability Cloud documentation

This repository contains the code and documentation for https://docs.splunk.com/Observability

A private mirror exists where Splunk's technical writers edit documentation for new and updated features. The public and the private repositories update each other automatically using [repo-sync](https://github.com/repo-sync/repo-sync).

## Contribute to the documentation

Docs contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## Requirements

The documentation is built from [reStructuredText](https://docutils.sourceforge.io/rst.html) and Markdown files using [Sphinx](https://www.sphinx-doc.org/en/master/).

To contribute to the documentation you only need a GitHub account. See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

To build the documentation on your machine use the Docker container in this repository, which provides a configured Python environment. To run the container you need Docker Desktop or a compatible container runtime.

### Install the docs on your machine

Follow these steps to clone and install the docs to your local machine:

1. Clone this repository using `git clone`.
2. Navigate to the cloned repository in your file system.
3. Change the permissions of `start.sh` by entering `chmod +x start.sh` in the terminal.

### Test the docs locally

After you've saved your changes, you can build the docs following these steps:

- Run `./start.sh` from the terminal.
- Enter `make html` or `make clean html` from within the container to build the documentation.
- Browse `http://localhost:9999` to see the local build of the docs. 

> **NOTE:** Don't run git commands from the container. Exit the container first or use a separate terminal window or tab.

## License

The documentation source, the screenshots and animations, and all other documentation assets are licensed under the Creative Commons 4.0 license. See [LICENSE](LICENSE).

The code of the documentation website is licensed under the Apache 2.0 license. See [LICENSE-CODE](LICENSE-CODE).

For information on third-party components and libraries used by the source code, see [ThirdPartyNotices](ThirdPartyNotices).