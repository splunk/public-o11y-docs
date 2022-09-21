# Contribute to the Splunk Observability Cloud documentation

This repository contains the official documentation of Splunk Observability Cloud (https://docs.splunk.com/Observability).

Anyone at Splunk can contribute new documentation and edits to existing documentation. Read on to learn how to edit and build the docs, and how to follow the workflow for getting your contributions reviewed and merged.

[[_TOC_]]

## Requirements

Most of the documentation is in reStructuredText format, with a few Markdown files that we imported from other sources, such as the [integrations repository](https://github.com/signalfx/integrations). The docs are built using Sphinx 4.x or higher.

The technical requirements to contribute to the docs are the following:

- Text or code editor, such as Visual Studio Code. See [Using Visual Studio Code](https://signalfuse.atlassian.net/wiki/spaces/DOCS/pages/2629271624/Using+Visual+Studio+Code) for a selection of useful add-ons.
- Python 3.x or higher, required for installing and running Sphinx and its dependencies.
- git or a graphical user interface for git, necessary for pushing documentation changes to GitLab.

The following instructions assume that you're familiar with basic git commands.

## Before you start

Splunk docs are based on the following principles.

### The documentarian mindset

A documentarian is anyone who contributes to the documentation, who wants to help a user accomplish a task or learn a new skill set. As a documentarian, you are a bridge between the software development team and the user, translating complex material into digestible content that inspires confidence in the user. To be a documentarian is to be a compassionate, patient teacher and an eager, humble student.

### What's the learning objective?

Consider a learning objective as a guiding light for the ticket, idea, topic that you are working on. Your learning objective helps you form a set of clear outcomes from an abstract concept. Similar to a thesis statement, the learning objective frames your material for your audience, provide structure for the information architecture, and drives home the outcomes of your docs.

The following is an example of a learning objective:

> As a contributor to the Splunk docs, I want to familiarize myself with the Splunk style guide so that I can craft quality, accessible content that inspires confidence in the user.

## Install the docs on your machine

Follow these steps to clone and install the docs tools to your local machine:

1. Open a terminal and enter `git clone git@cd.splunkdev.com:observability/docs/product-docs.git`.
2. Navigate to the `product-docs` repo and enter `pip3 install -Ur requirements.txt`. This installs Sphinx and the required modules.

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
├── profiling
├── references
└── rum
```

Note the following:

* The navigation structure is defined by the `index.rst` file.
* Each first-level folder contains the files and folders for each major section of our documentation.
* Images are added as PNG or GIF files to the `_images` directory, which is structured according to O11y areas.
* The `_build` folder contains the local build of the docs, produced by `make html`. To erase the contents of `_build`, enter `make clean`.

**NOTE:** Ignore all other files and folders, as they contain configuration settings and template files that you must not edit.

### Find a document in product-docs

If you want to edit a specific document, run a search for text strings contained by the doc using your code editor, grep, or similar tools. The following grep example searches for the `OpenTelemetry` string in all documents of the product-docs repo, and returns the file names and line numbers where grep found the string.

```bash
grep -inro --include \*.rst "OpenTelemetry" .
```

## Edit or add documentation

The main steps for adding or editing documentation are the following:

0. Decide the type of edit
1. Create a branch for your work.
2. Edit the content in your branch.
3. Test the docs locally or in GitLab.
4. Create a merge request.
5. Submit the pull request for review.

### Decide the type of edit

Before editing the docs, ask yourself what do you want to accomplish, or what the learning objective is. The following table contains guidance on which type of edit is best depending on the goal:

| Modify existing docs |  Add new docs    |
| ---                  | ---              |
| Fix a typo or error  | Document a whole new feature |
| Add a note or warning | Split docs into sub-pages |
| Update a screenshot | Add a use case for a feature |
| Add or update a section | Expand reference documentation |
| Update or add links | Create new troubleshooting guides |

Create small merge requests with incremental improvements rather than large merge requests with tons of changes. Keep your merge requests small and focused on the changes you want to apply: That makes both the reviewer's and your job easier.
### Create a branch for your work

The main branch is `observability`. Merging edits to the `observability` branch triggers an update of the documentation site at https://docs.splunk.com/Observability. The branch is protected, which means that any edit must be in the form of a merge request and be approved by at least one member of the o11y-docs team -- we're #o11y-docs in Slack).

Make all your edits in a separate branch created from `observability`. You can give any name to your branch, though following the `<username>-<description>` convention is best. If the branch relates to a Jira ticket, you can add the issue key to the branch's name, so that tracking the related Jira issue is simpler.

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

For Observability-focused style guidelines, see the [Observability Style Sheet](https://splunk.atlassian.net/wiki/spaces/PROD/pages/313927759789/Observability+Style+Sheet). They contain updated indications about product naming conventions, and differences from the main style guide. Your edits will be reviewed both against the Splunk Style Guide and the Observability Style Sheet.

**NOTE:** To learn more about how we perform reviews in the O11y docs team, see [Git checklist and MR review guidance](https://signalfuse.atlassian.net/wiki/spaces/DOCS/pages/2088009816/Git+checklists+and+MR+review+guidance).

#### Add an image and alt text 

Use the following syntax to add images uploaded to the `_images` folder:

```rst
..  image:: /_images/<subdir>/<filename>
    :width: 99%
    :alt: <alt text>
```

Add images that enhance existing material, instead of replacing text. Don't include a screenshot of the UI if the user can follow your written instructions without it. 

**NOTE:** Make sure to add alternative text. [Include alt text in images](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Graphicsalttext) in the Splunk Style Guide. Writing alt text for an image is a helpful way to confirm that it adds something, for example, "This animation illustrates the pathway to create a dashboard" instead of something like "This is a screenshot of Tag Spotlight".

### Test the docs locally

After you've saved your changes, you can test the docs locally in two ways:

- Enter `make livehtml` to open a live preview in your browser at `localhost:8000`. While the preview is running, any change to the product-docs files triggers an update to the docs, so that you can see your edits in the browser in real time.
- If you prefer not to use the live preview, you can build the docs manually by entering `make clean html`. Wait for the command to run, and then navigate to the `_build` folder, and open any HTML file to view it in the browser. 

**NOTE:** The `clean` command removes any previously built file, so that Sphinx can generate the docs from scratch.

When testing the docs:

- Make sure that Sphinx is not emitting warnings in the terminal. All build errors and warnings must be solved before opening a merge request. For tips on how to troubleshoot Sphinx errors, see [Troubleshoot local build errors](https://signalfuse.atlassian.net/wiki/spaces/DOCS/pages/1081016364/Troubleshoot+local+build+warnings+errors).
- Check that the documentation shows as intended. Reach out to #o11y-docs for support if you need guidance on rST syntax or features. Your feedback can help us improve the docs further by adding new features and widgets.

### Test the docs in the remote build

You can also test the docs by pushing your changes to GitLab and checking the remote build for your merge request or branch. See [Make a local or global build](https://signalfuse.atlassian.net/wiki/spaces/DOCS/pages/1071120476/Make+a+local+or+global+build) for more information.

## Create a merge request

To get your edits reviewed, open a merge request with the following features:

- Source branch must be your newly created branch.
- Target branch must be `observability`.
- Add yourself as the **Assignee**
- Add the **Need Peer Review** label
- Add a description for your changes

If your changes aren't ready for review, click the `Mark as Draft` button; that signals that you're still working on it and that it hasn't to be reviewed yet.

**NOTE:** While your changes are being reviewed, rebase your branch frequently by merging in the latest changes in `observability` and resolving any merge conflicts that might arise. That keeps your branch updated against the main branch, so that your changes can be merged without conflict once they are approved.

## Submit the merge request for review

Copy a link to your merge request or MR and paste it in the #o11y-docs channel in Slack. A doc team member will reach out to you to triage the request and review the merge request.

## Note on developer docs

For information on the Observability Cloud developer documentation, see [How to author Splunk Observability Cloud developer documentation](https://signalfuse.atlassian.net/wiki/spaces/DOCS/pages/130876682/How+to+author+for+the+Splunk+Observability+Cloud+developer+documentation).
