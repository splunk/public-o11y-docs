.. _rum-rules:


*********************************************************************
Write custom rules for URL grouping in Splunk RUM
*********************************************************************

.. meta::
   :description: Write custom rules to group URLs based on criteria that matches your business specifications, and organize data to match your business needs. Group URLs by both path and domain. 

Splunk RUM automatically groups URLs together based on default rules that capture errors and metrics, such as page load and route change duration, JavaScript errors, back-end errors, and Web vitals. 

What are custom rules in Splunk RUM?
================================================

Write custom rules to group together URLs with common components based on your specifications. Customizing rules allows you to streamline the organization of your data in Splunk RUM in a way that makes the most sense to you and your organization. You can group URLs by both path and domain. 

You also need custom URL grouping rules to generate page-level metrics (``rum.node.*``) in Splunk RUM.

Write a custom rule
=======================

Follow these steps to write a custom rule:

1. Learn about your URLs. Identify the components and tokens.
2. Figure out what kind of results you want to see. 
3. Review the pattern syntax and examples to better understand how to formulate rules that work for your data. 
4. Reference the default rules and see if you need to deactivate any for your rule to work. 


How to identify components of a URL 
===================================

Within the scope of Splunk RUM, there are the following components in a URL: 

*  scheme
*  domain
*  path
*  fragment 

Example
-------------
Consider the following URL: 
``https://example.com/path/page#title``.

Here is how to break down this URL into components:

.. list-table:: 
   :widths: 20 40 
   :header-rows: 1
   
   * - :strong:`Component`
     - :strong:`Example`
   * - Scheme
     - ``https``
   * - Domain
     - ``example.com``
   * - Paths
     - ``/path/page``
   * - Fragment 
     - ``#title``


How to identify tokens
========================

In terms of writing rules in Splunk RUM, a URL consists of two parts: a domain and a path. A token is exactly one word separated by either a "/" for a path or a "." for a domain. The following definitions and examples illustrate how to identify tokens in your URLs so that you can write the best rules for your use case. 

Domain
-------
The domain consists of a top-level domain and any prefixed subdomains. Host tokens are separated by the ``.`` symbol. For example,  ``subdomain.domain.com`` is split into the following tokens: ``subdomain``, ``domain``, ``com``.


Path
-----
Path components are separated by a ``/`` symbol.  For example,  ``https://example.com/documentation/section/topic`` is split into the following tokens:  ``documentation``, ``section``, ``topic``. 


Support for # in URLs
------------------------------
Single-page applications use a ``#`` token at the end of a URL path to append the fragment. The following URL shows how blog posts from a single-page application are listed after the # symbol: ``https://example.com/#/blogpost``. By default, fragments after a # are ignored by Splunk RUM, unless you specify that you would like to include it in a rule. For example, the fragment ``#title`` is excluded from the path in this example: ``https://example.com/path/page.html#title``.

Pattern syntax 
===========================================

The following table shows the pattern, examples of URLs that match this pattern, and examples of URLs that don't match the pattern. 


What is a rule?
------------------------------------
In a rule, you define how you want to group together URLs based on common characteristics. To get started, first add a domain rule, then you can add a path rule. 


What is a pattern?
------------------------------------
The pattern is the most important component of a rule. The pattern defines the common portion in the path or domain that is shared by all URLs that match the rule. Patterns also consist of tokens, like the domain and path in the URL. A wildcard in the pattern matches actual tokens in the URL's path or domain. You can apply a wildcard to a pattern to match one or more tokens.  


<?> Wildcard for single token 
------------------------------------
This example shows how to use a ``<?>`` symbol to apply a single token wildcard to group URLs by path. 


.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1
   
   * - :strong:`Pattern`
     - :strong:`Examples of paths that match`
     - :strong:`Examples of paths that don't match`
   * - ``/app/<?>``
     - 
        * ``/app/v1``
        * ``/app/v2``
        * ``/app/dashboard``
     -  
        * ``/app``
        * ``/app/v1/dashboard``
        * ``/applications/v1``
       

<??> Wildcard for one or more trailing tokens
--------------------------------------------------------

This example shows how to use a ``<??>`` wildcard to group together URLs by one or more tokens. The ``<??>`` wildcard is supported only as the last wild card in a pattern at this time.
 

.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1
   
   * - :strong:`Pattern`
     - :strong:`Examples of paths that match`
     - :strong:`Examples of tokens that don't match`
   * - ``/app/<??>``
     - 
        * ``/app/v1``
        * ``/app/v2``
        * ``/app/dashboard``
        * ``/app/v1/dashboard``
        * ``/app/v2/dashboard/123``
        * ``/app/v2/dashboard/123/edit``
 
     -  
        * ``/app``
        * ``/applications/v1``
       



Combination pattern 
--------------------------------------------------------
 
This example shows how to use a combination of wildcards to group together URLs by a pattern of several tokens. 


.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1
   
   * - :strong:`Pattern`
     - :strong:`Examples of paths that match`
     - :strong:`Examples of paths that don't match`
   * - ``/<?>/v2/<??>``
     - 
        * ``/api/v2/users``
        * ``/api/v2/profiles/edit``
        * ``/app/v2/dashboard/123``
     -  
        * ``/api/v3/users``
        * ``/app/dashboard/v2/charts``
        * ``/app/v2``



Invalid syntax 
=============================================

The following syntax is invalid: 

.. list-table:: 
   :widths: 20 40 
   :header-rows: 1
   
   * - :strong:`Invalid syntax`
     - :strong:`Explanation`
   * - 
        * ``.A.B.C``
        * ``A.B.C.``
     - Starting or ending a pattern  with a "." character.  
   * - ``A.<??>.C`` 
     - The ``<??>`` wildcard must always be last in the pattern.
   * - ``<?>A.B.C``
     - Don't mix the ``<?>`` wildcard with other characters in a pattern. A wildcard replaces the entire domain component between the ``.`` delimiters. 
   * - ``/lor<?>/ipsum``
     - This pattern is invalid because the wildcard needs to be between two ``/`` symbols in the path of the URL. A valid pattern is ``/<?>/ipsum``.
   * - ``lorem.ips<??>``
     - This pattern is invalid because the <??> wildcard is not separated by a "." character. A valid pattern is ``lorem.ipsum.<??>``.
   * - ``A/B/C``
     - A pattern for a path must start with a ``/``.
   * - ``/A/<??>/C``
     - 	The <??> wildcard must be the last token in a pattern. 
   * - ``/A/B<?>/C``
     - The <?> wildcard must be separated by ``/`` delimiters. 


Default rules 
===========================

RUM has several default rules that you can find in the :guilabel:`RUM URL grouping` tab under :guilabel:`Data Management`. If you want to create a rule that conflicts with a default rule, you can deactivate the default rule globally, or by application. 

Example
-----------
This * wildcard matches any path that starts with ``/app/``.

.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1

   * - :strong:`Pattern`
     - :strong:`Examples of paths that match`
     - :strong:`Examples of paths that don't match`
   * - ``/app/<*>``
     -
      * ``/app/v1``
      * ``/app/v2``
      * ``/app/dashboard``
      * ``/app/v1/``
     - 
      * ``/applications/v1``
 
  

Example
-----------


The wildcard ``W*`` applies to any token that doesn't have any numbers in it. This pattern matches any path that starts with ``/app/`` and is followed by tokens without numbers in it. 

.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1

   * - :strong:`Pattern`
     - :strong:`Examples of paths that match`
     - :strong:`Examples of paths that don't match`
   * - ``/app/<w*>``
     -
      * ``/app/chart``
      * ``/app/dashboard``
     - 
      * ``/app/v1``
      * ``/app/v2``













Use cases   
================================
The following examples outline how to apply a rule to group URLs together according to the use case you want to solve. 


Use a <*> wildcard to group URLs by product ID 
-----------------------------------------------
Suppose you are an online retailer and you want to group together URLs by product ID. In this example, the product ID is the letter, number combination after ``/merchandise/`` in the path of the URL. 

.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1
   
   * - :strong:`Example URLs`
     - :strong:`Pattern`
     - :strong:`Result`
   * - 
        * ``example.com/merchandise/i139sd``
        * ``example.com/merchandise/71239``
        * ``example.com/merchandise/8fsd72``
     - ``/merchandise/<?>``
     - The result groups together all URLs with the same product ID:
       ``https://example.com/merchandise/<*>``
       
For this example, you need to first create a domain rule like this: 



..  image:: /_images/rum/rum-domain-example.png
    :width: 50%
    :alt: This shows how to create a rule for a domain with a <??> wildcard. 



Next, you can create the path rule: 

..  image:: /_images/rum/path-example-rum.png
    :width: 50%
    :alt: This shows how to create a rule for a path with a <??> wildcard. 


Use a <?> wildcard to group by subdomain 
----------------------------------------------------

This example shows how to use a ``<?>`` wildcard to group together URLs with the same subdomain.  

.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1
   
   * - :strong:`Example URLs`
     - :strong:`Pattern`
     - :strong:`Result`
   * - 
       * ``sub3nds9.example.com``
       * ``subfd89fs.example.com``
       * ``sub6f8sd.example.com``
     - ``<?>.example.com``
     - The result groups together all URLs with the same subdomain: ``https://<?>.example.com/``.

For example, here is how to create this rule: 

..  image:: /_images/rum/domain-example-rum.png
    :width: 50%
    :alt: This shows how to create a rule for a domain with a <?> wildcard. 

Use a <??> wildcard to group by string 
----------------------------------------

Suppose you want to measure performance across v1 and v2 APIs for any function. This rule uses the ``<??>`` to wildcard the remainder of the path.

.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1
   
   * - :strong:`Example URLs`
     - :strong:`Rule`
     - :strong:`Result`
   * - 
       * ``/api/v1/downloadimage/api/v2/downloadimage/api/?>``
       * ``api/v2/downloadimage``
     - ``/api/<??>``
     - Groups together URLs by API function. 

For example, here is how to create this rule: 

..  image:: /_images/rum/rum-api-path.png
    :width: 50%
    :alt: This shows how to create a rule for a path with a <??> wildcard. 



Manage URL grouping rules 
===================================
Host and path rules are combined to create the URL Name in the UI. Spans are retained for 8 days in Splunk RUM. For more, see :ref:`data-o11y`. Changes to any rules apply only to incoming data. 

.. Note:: You need to create a domain rule first, then you can add a path rule. If you edit, deactive, or delete a rule your changes apply only to future data and not data that was realdy ingested by Splunk RUM. 


Create a new rule 
------------------
Follow these steps to create a new rule:

1. There are four ways to access the Splunk RUM URL rule manager: 
     a. From the left navigation panel, select :guilabel:`RUM`> :guilabel:`RUM Configuration`> :guilabel:`RUM URL Grouping Rules` in the Application Summary dashboard. 
     b. From the left navigation panel, select :guilabel:`Settings`> :guilabel:`RUM URL grouping Rules` under Data Configuration. 
     c. From the RUM Overview dashboard, select :guilabel:`RUM Configuration`> :guilabel:`RUM URL Grouping Rules`.
     d. From the RUM Tag Spotlight view, select the three dot settings button, then :guilabel:`RUM URL Grouping Rules`.

2. Select :guilabel:`New Rule`.

3. Select the URL token for which you want to write a rule. 

4. Select the application(s) you want to monitor. If you don't select an application, then the rule is applied to all. 

5. Write the pattern by which you want to group URLs.

6. Select :guilabel:`Create`. 


Edit an existing rule 
----------------------
Follow these steps to edit an existing rule:

1. Navigate to the RUM URL rule manager.
2. Select the three dot symbol, then :guilabel:`Edit`. 
3. Make your changes, then select :guilabel:`Update`.



Deactivate or reactivate a rule
--------------------------------------------
Follow these steps to deactivate or reactivate an existing rule. When you deactivate a rule, Splunk RUM stops processing incoming data according to this rule. If you choose to deactivate a rule and then activate it again in the future, the rule is not applied to data that was already ingested by Splunk RUM. 


1. Navigate to the RUM URL rule manager.
2. Select the three dot symbol, then :guilabel:`Edit`. 
     a. To activate the rule, click :guilabel:`Activate`.
     b. To deactivate the rule, click :guilabel:`Yes, deactivate this rule`.



Delete 
--------------------------------------------
Follow these steps to delete a rule:

1. Navigate to the RUM URL rule manager.
2. Select the three dot symbol, then :guilabel:`Edit`> :guilabel:`Delete` > :guilabel:`Yes, delete this rule`.



