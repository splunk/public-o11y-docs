# Splunk Observability Cloud Documentation

This repository contains the official documentation of Splunk Observability Cloud (https://docs.splunk.com/Observability).

You can contribute new documentation and edits to the existing documentation.

Read on to learn how to edit and build the docs, and how to follow the workflow for getting your contributions reviewed and merged.

## Requirements

- Text or code editor, such as Visual Studio Code.
- Docker Desktop (https://www.docker.com/products/docker-desktop/)
- git or a graphical user interface for git, necessary for pushing documentation changes to GitHub.

The following instructions assume that you're familiar with basic git commands.

## Install the docs on your machine

Follow these steps to clone and install the docs tools to your local machine:

1. Clone this repository using `git clone`.
2. Navigate to the cloned repository in your file system.
3. Change the permissions of `start.sh` by entering `chmod u+x start.sh` in the terminal.

### Folder structure

Before you add new documents or edit existing documents, familiarize yourself with the structure of this repository. 

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
├── infrastructure
├── logs
├── metrics-and-metadata
├── mobile
├── references
└── rum
```

Note the following:

* The navigation structure is defined by the `index.rst` file.
* Each first-level folder contains the files and folders for each major section of the documentation.
* Images are PNG or GIF files in the `_images` directory, which is structured according to O11y areas.
* The `_build` folder contains the local build of the docs, produced by `make html`. To erase the contents of `_build`, enter `make clean`.

> **NOTE:** Ignore all other files and folders, as they contain configuration settings and template files that you must not edit.

### Find a document in product-docs

If you want to edit a specific document, run a search for text strings contained by the doc using your code editor, grep, or similar tools. The following grep example searches for the `OpenTelemetry` string in all documents of the product-docs repo, and returns the file names and line numbers where grep found the string.

```bash
grep -inro --include \*.rst "OpenTelemetry" .
```

## Edit or add documentation

The main steps for adding or editing documentation are the following:

0. Decide the type of edit.
1. Create a branch for your work.
2. Edit the content in your branch.
3. Test the docs locally.
4. Create a pull request.

### Decide the type of edit

Before editing the docs, ask yourself what do you want to accomplish, or what the learning objective is. 

The following table contains guidance on which type of edit is best depending on the goal:

| Modify existing docs |  Add new docs    |
| ---                  | ---              |
| Fix a typo or error  | Document a whole new feature |
| Add a note or warning | Split docs into sub-pages |
| Update a screenshot | Add a use case for a feature |
| Add or update a section | Expand reference documentation |
| Update or add links | Create new troubleshooting guides |

Create small merge requests with incremental improvements rather than large merge requests with tons of changes. 

> Keep your merge requests small and focused on the changes you want to apply: That makes both the reviewer's and your job easier.

### Create a branch for your work

The main branch is `main`. Merging edits to the `main` branch triggers an update of the documentation site at https://docs.splunk.com/Observability. 

The branch is protected, which means that any edit must be in the form of a pull request and approved by at least one member of the Splunk docs team.

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

The Observability docs are written as reStructuredText (rST), a feature-rich, lightweight markup language similar to Markdown.

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

For a complete rST primer, see [reStructuredText format guide](https://signalfuse.atlassian.net/wiki/spaces/DOCS/pages/1087767451/rST+reStructured+Text+format+guide).

#### Write with the Splunk style guide in mind

The Splunk Style Guide provides guidance on how to write straightforward, user-focused, example-rich content that inspires confidence in the user. See [A word about Splunk docs](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/AwordaboutSplunkdocs) for an orientation to the [Splunk Style Guide](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/AwordaboutSplunkdocs).

You can also use the Splunk Style Guide rules for the vale linter to check automatically your docs against our style guide. See https://github.com/splunk/vale-splunk-style-guide.

#### Add an image and alt text 

Use the following syntax to add images uploaded to the `_images` folder:

```rst
..  image:: /_images/<subdir>/<filename>
    :width: 99%
    :alt: <alt text>
```

Add images that enhance existing material, instead of replacing text. Don't include a screenshot of the UI if the user can follow your written instructions without it. 

**NOTE:** Make sure to add alternative text. Writing alt text for an image is a helpful way to confirm that it adds something, for example, "This animation illustrates the pathway to create a dashboard" instead of something like "This is a screenshot of Tag Spotlight". For further guidance, see [Include alt text in images](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Graphicsalttext) in the Splunk Style Guide. 

### Test the docs locally

After you've saved your changes, you can test the docs using the Docker container:

- Run `./start.sh` from the terminal. Make sure to run `chmod u+x start.sh` to grant execution permissions.
- Enter `make html` or `make clean html` from within the container to build the documentation.
- Browse `http://localhost:9000` to see the local build of the docs. If you're using the `make livehtml` option, access `http://localhost:8888`.

> **NOTE:** Don't run git commands from the container. Exit the container first or use a separate terminal window or tab.

When testing the docs:

- Make sure that Sphinx is not sending warnings to the terminal. You must solve all build errors and warnings before opening a merge request.
- Check that the documentation shows as intended.

## Create a merge request

To get your edits reviewed, open a merge request with the following features:

- Source branch must be your newly created branch.
- Target branch must be `main`.
- Add relevant labels.
- Add a description for your changes.

If your changes aren't ready for review, set the pull request as draft. To do so, click "Convert to draft" at the bottom of the "Reviewers" section.