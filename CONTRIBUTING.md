# Contributing guidelines

Thank you for your interest in contributing to Splunk Observability Cloud documentation!

Read through this document before submitting any pull request.

- [Contributing guidelines](#contributing-guidelines)
  - [Prerequisites](#prerequisites)
  - [Decide the type of edit](#decide-the-type-of-edit)
    - [Quick edits to existing documentation](#quick-edits-to-existing-documentation)
    - [Complex edits to one or multiple files](#complex-edits-to-one-or-multiple-files)
  - [Folder structure of the repository](#folder-structure-of-the-repository)
    - [Find a document in the repository](#find-a-document-in-the-repository)
    - [Create files or directories](#create-files-or-directories)
  - [Edit the documentation](#edit-the-documentation)
    - [Use the reStructuredText markup](#use-the-restructuredtext-markup)
    - [Add images (optional)](#add-images-optional)
    - [Write with the Splunk style guide in mind](#write-with-the-splunk-style-guide-in-mind)
  - [Test the docs](#test-the-docs)

## Prerequisites

1. A GitHub account.
   - If you're a Splunk employee, you can use an existing Splunk GitHub account.
   - Everyone else needs to create their own GitHub account.
2. If you plan to use SSH to synchronize your local computer with your GitHub account, you need to create an SSH key on your local
   computer, add the key to your OpenSSH authentication agent, and add the public key file to your GitHub account. The GitHub docs
   describe how to perform these tasks.

## Decide the type of edit

You can do quick edits, for example to fix typos, or more complex edits involving several files.

In both cases, you'll need to fork this repository before opening a pull request.

### Quick edits to existing documentation

Quick edits can save you time and are a good alternative to filing feedback tickets. Good examples of quick edits include fixing typos, updating tables, changing links, adding code snippets, etc.

To make a quick edit to existing documentation, follow these steps:

1. Select the **Edit this page** link in the page you want to edit.
2. If you’re already logged to GitHub, select **Fork this repository** to create your own copy of the repo.
3. Make your edits to the content. For more information, read the rest of this document.
4. After you’ve added your changes select **Propose changes**. Add a summary and description.
5. Select **Create pull request** to open a pull request from your fork to main of the public repo.
6. Edit the summary and description, then select **Create pull request** to confirm.

Your pull request is now ready for review. The docs team will review it as soon as possible.

All pull requests you create afterwards use your existing fork of the public docs repo.

### Complex edits to one or multiple files

While the GitHub editing interface works well for quick edits, it’s best to use a code editor and a local copy of your fork for more complex edits or edits involving multiple files. Basic knowledge of GitHub, git, and code editing tools is required in order to do this type of edits.

To perform complex edits on one or multiple files, follow these steps:

1. Log in to your GitHub account and open this repository.
2. Select **Fork** in this repository to create a fork or copy of the repo.
3. Open your fork. The copy now exists under your username (`<username>/public-o11y-docs`).
4. Clone the repository to your machine using HTTPS or SSH.
5. Create a branch and edit the documentation using your favorite code editor.
6. Push the changes to the remote fork of the public docs repository (your copy of the repo).
7. Open your fork in GitHub and select the **Pull requests** tab, then select **New pull request**.
8. Select **Create pull request** to open a pull request from your fork to the `main` branch of this repo.
9. Edit the summary and description, then select **Create pull request** to confirm.

Your pull request is now ready for review. The o11y docs team will review it as soon as possible.

## Folder structure of the repository

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

### Create files or directories

When needed, create files or directories that adhere to the following naming rules:

* Use lower case.
* Use dashes for spaces.
* Keep names as short as possible.
* Create directories for groups of files at the same level.

The following is the basic template for all new documents:

```rst
.. _label-for-the-page:

************************************************************
Title of the page
************************************************************

.. meta::
   :description: Description for search engines

Content goes here.
```

## Edit the documentation

Follow these instructions to add or edit content.

### Use the reStructuredText markup

This repository uses reStructuredText (rST), a feature-rich, lightweight markup language similar to Markdown.

The following snippet shows basic formatting rules:

```rst
**********************
Title of the page
**********************

Paragraphs are written as text in separate lines.

- Unordered lists use ``-`` as bullet points
- :strong:`String formatted as bold`.
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

For more information on reStructuredText, see [reStructuredText Primer](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html).

### Add images (optional)

Use the following syntax to add images uploaded to the `_images` folder:

```rst
..  image:: /_images/<subdir>/<filename>
    :width: 99%
    :alt: <alt text>
```

Screenshots must not include personal identifiable information or any other sensitive data. Use blur filters to redact text in the UI.

Add images that enhance existing material, instead of replacing text. Don't include a screenshot of the UI if the user can follow your written instructions without it.

> **NOTE:** Make sure to add alternative text. Writing alt text for an image is a helpful way to confirm that it adds something, for example, "This animation illustrates the pathway to create a dashboard" instead of something like "This is a screenshot of Tag Spotlight". For further guidance, see [Include alt text in images](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Graphicsalttext) in the Splunk Style Guide. 

### Write with the Splunk style guide in mind

The Splunk Style Guide provides guidance on how to write straightforward, user-focused, example-rich content that inspires confidence in the user. See [A word about Splunk docs](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/AwordaboutSplunkdocs) for an orientation to the [Splunk Style Guide](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/AwordaboutSplunkdocs).

You can also use the Splunk Style Guide rules for the vale linter to check automatically your docs against the Splunk style guide. See https://github.com/splunk/vale-splunk-style-guide.

## Test the docs

After you've saved your changes, you can test the docs using the Docker container:

- Run `./start.sh` from the terminal. Make sure to run `chmod +x start.sh` to grant execution permissions.
- Enter `make html` or `make clean html` from within the container to build the documentation.
- You can find the built documentation inside the `/_build/html` directory of the repo.
- If you're using the `make livehtml` option, browse `http://localhost:8888` to see live docs.

> **NOTE:** Don't run git commands from the container. Exit the container first or use a separate terminal window or tab.

When testing the docs:

- Make sure that Sphinx is not sending warnings to the terminal. Solve all build errors and warnings before opening a pull request.
- Check that the documentation shows as intended.
