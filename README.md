
# Contribute to the Observability feature branch

This page describes how to contribute to the `observability` branch.

Link to the content map: https://mm.tt/1726218547?t=7TZikeNcwV

## Propose changes to the observability branch

We are using the `observability` branch to write docs for Splunk Observability Cloud. Because the `observability` branch is not the default branch for the repository, how you propose changes is slightly different than usual. 

When you create a feature branch to propose changes in the `observability` branch, name it according to the corresponding DOCS ticket number and include a brief description. A good feature branch name looks like this: `DOCS-1234-brief-description`.

Follow these steps to propose changes to the `observability` branch. These steps create an example branch named `DOCS-9999-update-PR-steps` and merge proposed changes in that branch into the `observability` branch. When you propose changes for actual projects you are working on, name a branch according to the change you are proposing instead of the example name in the following steps.

1. In your terminal application from the product-docs repo, check out the `observability` branch:
   ```
   $ git checkout observability
   ```
2. Create and check out a new branch named `DOCS-9999-update-PR-steps` based on the `observability` branch:
   ```
   $ git checkout -b DOCS-9999-update-PR-steps
   ```
3. Make some changes to the project. Create new files, modify existing files, or even delete files. The branch is your oyster.
4. Stage files you changed and want to include in a single commit:
   ```
   $ git add changedFile
   ```
   You can also add entire directories by referencing the directory name rather than a file name. 

   Alternatively, add every file you changed like this:
   ```
   $ git add .
   ```
5. Commit the changes:
   ```
   $ git commit -m "brief message about the commit"
   ```
   Always include the `-m` flag with a message in double quotes. It helps your doc family understand why you made a change.
6. Push `DOCS-9999-update-PR-steps` to the repository on GitHub:
   ```
   $ git push --set-upstream origin DOCS-9999-update-PR-steps
   ```
   You have to set an upstream only the first time you push changes for a branch. After that, you just need to use `git push`.
7. Go to the [product-docs](https://github.com/signalfx/product-docs) repository on GitHub.
8. Find the banner to open a pull request for `DOCS-9999-update-PR-steps`.
9. Click **Compare & pull request**.
10. Change the **base** branch from `master` to `observability`. The **compare** branch should be `DOCS-9999-update-PR-steps`.
11. Provide a description for the pull request that summarizes your proposed changes. This helps reviewers understand what your proposed changes do and why.
12. Submit the pull request.
13. Bribe a doc team member to review your pull request.
14. Before merging your proposed changes, pull in the most recent version of `observability`:
    ```
    $ git pull origin observability
    ```
    This ensures `DOCS-9999-update-PR-steps` is the same as `observability`, except for the changes you are proposing.
15. In GitHub, **Squash and merge** your changes into `observability`.

## Create directories and files

This section specifies conventions for naming and structuring directories and files. This also applies to image files.

### Name directories and files

Create directories and files that adhere to these naming rules:

* Use lower case.
* Use dashes for spaces.
* Keep names as short as possible.

This is how we want to create file names or directories:
```
pet-photos
```

This is not how we want to create file names or directories:
```
Photos_of_Our_Pets
```

### Create a consistent directory structure

Create directories for groups of files at the same level. Every file group contains a single primary file. A primary file contains a `toctree` directive that includes other files in the group. Name primary files the same thing as the directory for the set of topics. Here is an example of what this looks like in a fake file explorer:

```
guide
|-- section-x
|   |-- section-x.rst
|   |-- file-1.rst
|   |-- file-2.rst
|-- section-y
|   |-- section-y.rst
|   |-- file-3.rst
|   |-- file-4.rst
|-- file-5.rst
|-- file-6.rst
```

The example `guide` looks like this in the HTML output:

![This image displays the TOC of the example guide on the doc site.](/_images/README/example-guide.png)

### Add metadata to RST files

Insert metadata about a page with the `meta` directive.

Include only a `description`. 

### Include labels to enable cross-references

Use special labels to implement cross-references.

Cross-reference labels take this form:

``.. _rootDirectory-fileName``

## Create tables

There are a few ways to create tables. Grid tables resemble tables in Markdown, which we are eventually migrating to. However, like simple tables, they are harder to create. Use the list table directive to create tables quickly.

```
Grid table:

+------------+------------+-----------+
| Header 1   | Header 2   | Header 3  |
+============+============+===========+
| body row 1 | column 2   | column 3  |
+------------+------------+-----------+
| body row 2 | Cells may span columns.|
+------------+------------+-----------+
| body row 3 | Cells may  | - Cells   |
+------------+ span rows. | - contain |
| body row 4 |            | - blocks. |
+------------+------------+-----------+

Simple table:

=====  =====  ======
   Inputs     Output
------------  ------
  A      B    A or B
=====  =====  ======
False  False  False
True   False  True
False  True   True
True   True   True
=====  =====  ======

List table directive:

.. list-table::
   :header-rows: 1

   * - :strong:`Header 1`
     - :strong:`Header 2`
     - :strong:`Header 3`
    
   * - body row 1
     - column 2
     - column 3
    
   * - body row 2
     - column 2
     - column 3

```

## Create headings

Create headings that adhere to these naming rules:

* Add symbols under the section name.
* Include a blank line above the section name and below the symbols.
* Extend symbols to the end of the name of section header.
* Do not go lower than an H4.

```
*********
Sample H1
*********

Introduction content.

Sample H2
=========

Sample content.

Sample H3
^^^^^^^^^

Yet more sample content.

Sample H4
#########

No more sample content.
```

## Add a code snippet

Write a code snippet with a line of text that introduces it, then a double colon on the immediate next line. Code goes in, indented, after a blank line below the `::`

```
Line of text introducing code:
::

   <code snippet>
```

## Add a downloadable file

Example: 
```Credits available as a compressed CSV file for download: :download:`Splunk RUM third-party credits<Splunk_RUM_Third_Party_Credits.zip>`.```

## Add an image

If the image stands alone, then you can use the Sphinx image directive: 
```
..  image:: /_images/<subdir>/<filename>
    :width: 99%
    :alt: <alt text>
```

## Migrate .md content to observability

The Sphinx build system uses the myst_parser extension to interpret Markdown files as if
they were ReStructured Text files. This feature helps you migrate content formatted in
Markdown to the product-docs/ repo without having to re-format it in RST. For example,
you can migrate the data monitor documentation in GitHub directly into product-docs/.

## Migrate data monitor content

### Create the .md file

If you're migrating data monitor content, a directory in product-docs/gdi for the content
you're migrating should already exist. In this directory, create a .md file for the content
you're migrating, or copy a .md file to the directory. If the filename is README.md,
rename it to something more descriptive.

### Update the .md file

After you create the .md file for the content, insert the following
information at the beginning of the file:

       (<file_label>)=
       # <topic_title>
       <meta name="description" content="<topic_description>">

**file_label**: Text that uniquely identifies this topic. Equivalent to `.. <file_label>:` in RST.
**topic_title**: H1 title for the topic
**topic_description**: Information about the topic. Equivalent to the description text in the `.. meta::` description.

### Update the product-docs/ index

Also, edit index.rst.

Find the block of lines that starts

    .. toctree::
       :caption: GET DATA IN
       :maxdepth:   3
   
       gdi/gdi

After the block, add a reference to the `.md` file you added. Keep the block that follows
`gdi/gdi` in alphabetical order.
For example, I added some sample topics in a branch, so in my branch this part of `index.rst` is
the following:

    gdi/gdi
    gdi/collectd-cpu/collectd-cpu-monitor
    gdi/collectd-disk/collectd-disk-monitor
    gdi/generic-monitor-configuration/generic-monitor-configuration
    gdi/other-ingestion-methods/ingest-rest-api
    gdi/other-ingestion-methods/ingest-wrapper
