# Splunk Observability Cloud documentation

This repository contains the code and documentation for https://docs.splunk.com/Observability

A private mirror exists where Splunk's technical writers edit documentation for new and updated features. The public and the private repositories update each other automatically using [repo-sync](https://github.com/repo-sync/repo-sync).

## License

This Splunk repository is subject to the Splunk Websites Terms and Conditions of Use ("Terms")  
[https://www.splunk.com/en_us/legal/terms/terms-of-use.html](https://www.splunk.com/en_us/legal/terms/terms-of-use.html) 
and the [LICENSE](LICENSE) specific to this repository.

You can contribute new documentation and edits to the existing documentation.

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

### Folder structure

Before you add new documents, or edit existing documents, familiarize yourself with the structure of this repository. 

The following snippet shows the **files and folders that are relevant to the documentation edits**:
```
.
├── _build       << Local build of the docs
├── _images      << Screenshots used in our docs
...
├── index.rst    << Main navigation and homepage
...
├── admin
├── alerts-detectors-notifications
├── apm
├── data-visualization
├── gdi
├── get-started
├── incident-intelligence
├── infrastructure
├── logs
├── metrics-and-metadata
├── mobile
├── references
├── rum
└── synthetics
```

Note the following:

* The `index.rst` file contains the main navigation structure.
* Each first-level folder contains the files and folders for each major section of the documentation.
* Images are PNG or GIF files in the `_images` directory, with folders for each product area.
* The `_build` folder contains the local build of the docs, produced by `make html`. To erase the contents of `_build`, enter `make clean`.

> **NOTE:** Ignore all other files and folders, as they contain configuration settings and template files that you must not edit.

### Find a document in the repository

If you want to edit a specific document, run a search for text strings contained by the doc using your code editor, grep, or similar tools. The following grep example searches for the `OpenTelemetry` string in all documents of the repository, and returns the file names and line numbers where grep found the string.

```bash
grep -inro --include \*.rst "OpenTelemetry" .
```

## Edit or add documentation

The main steps for adding or editing documentation are the following:

1. Decide the type of edit.
2. Create a branch for your work.
3. Edit the content in your branch.
4. Test the docs locally.
5. Create a pull request.

### Decide the type of edit

Before editing the docs, ask yourself what do you want to accomplish, or what the learning objective is. 

The following table contains guidance on which type of edit is best depending on the goal:

| Modify existing docs    | Add new docs                      |
|:------------------------|-----------------------------------|
| Fix a typo or error     | Document a whole new feature      |
| Add a note or warning   | Split docs into sub-pages         |
| Update a screenshot     | Add a use case for a feature      |
| Add or update a section | Expand reference documentation    |
| Update or add links     | Create new troubleshooting guides |

Create small merge requests with incremental improvements rather than large merge requests with tons of changes. 

> Keep your merge requests small and focused on the changes you want to apply: That makes both the reviewer's and your job easier.

### Create a branch for your work

The main branch is `main`. Merging edits to the `main` branch triggers an update of the documentation site at https://docs.splunk.com/Observability. 

The `main` branch is protected, which means that any edit must be in the form of a pull request and approved by at least one member of the Splunk docs team.

### Edit content 

Follow these instructions to add or edit content:

#### Create directories and files

Create directories and files that adhere to the following naming rules:

* Use lower case.
* Use dashes for spaces.
* Keep names as short as possible.
* Create directories for groups of files at the same level.

The following is the basic template for all new documents in product-docs:

```rst
.. _label-for-the-page:

************************************************************
Title of the page
************************************************************

.. meta::
   :description: Description for search engines

Content goes here.
```

#### Edit the content

This repository uses reStructuredText (rST), a feature-rich, lightweight markup language similar to Markdown.

The following snippet shows basic formatting rules:

```rst
**********************
Title of the page
**********************

Paragraphs are written as text in separate lines.

- Unordered lists use - as bullet points
- :strong:`String formatted as bold`
- ``In-line code snippets are wrapped in double-ticks``

Heading 1
============================

Separate text from headings.

1. First item of an ordered list
2. Second item of an ordered list

Heading 2
----------------------------

Internal links are added by referencing labels:

- :ref:`label-name`
- :ref:`Descriptive text for the link <label-name>

Below is an invisible label:

.. _label-you-can-use-as-an-anchor-link:

Adding a code snippet
------------------------------

The following snippet shows a code snippet

.. code-block:: java

   Here is the code. Notice that space indentation matters.

The following snippet shows an image, with a path relative to the _images folder:

.. image:: /_images/apm/dashboards/dashboard-gif-2.gif
   :alt: This image shows an example APM service dashboard.
```

#### Write with the Splunk style guide in mind

The Splunk Style Guide provides guidance on how to write straightforward, user-focused, example-rich content that inspires confidence in the user. See [A word about Splunk docs](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/AwordaboutSplunkdocs) for an orientation to the [Splunk Style Guide](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/AwordaboutSplunkdocs).

You can also use the Splunk Style Guide rules for the vale linter to check automatically your docs against the Splunk style guide. See https://github.com/splunk/vale-splunk-style-guide.

#### Add an image and alt text 

Use the following syntax to add images uploaded to the `_images` folder:

```rst
..  image:: /_images/<subdir>/<filename>
    :width: 99%
    :alt: <alt text>
```

Add images that enhance existing material, instead of replacing text. Don't include a screenshot of the UI if the user can follow your written instructions without it. 

> **NOTE:** Make sure to add alternative text. Writing alt text for an image is a helpful way to confirm that it adds something, for example, "This animation illustrates the pathway to create a dashboard" instead of something like "This is a screenshot of Tag Spotlight". For further guidance, see [Include alt text in images](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Graphicsalttext) in the Splunk Style Guide. 

### Test the docs locally

After you've saved your changes, you can build the docs following these steps:

- Run `./start.sh` from the terminal.
- Enter `make html` or `make clean html` from within the container to build the documentation.
- Browse `http://localhost:9999` to see the local build of the docs. 

> **NOTE:** Don't run git commands from the container. Exit the container first or use a separate terminal window or tab.