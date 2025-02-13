.. _o11y-ai-promptlibrary:

**********************************************************************************
Prompt guide and library for AI Assistant in Observability Cloud
**********************************************************************************

.. meta::
   :description: Learn to use the AI Assistant in Observability Cloud.

The purpose of this document is to provide you with clear instructions on how to prompt the AI Assistant in Observability Cloud to give you the best results. This document gives general guidance on effective questions and prompts, as well as some examples of effective and ineffective prompts. This document defines poor, good, and excellent prompts.

.. raw:: html
  
    <embed>
      <h2>How the AI Assistant in Observability Cloud works<a name="how-the-ai-assistant-in-observability-cloud-works" class="headerlink" href="#how-the-ai-assistant-in-observability-cloud-works" title="Permalink to this headline">¶</a></h2>
    </embed>

Splunk Observability Cloud collects and correlates logs, metrics, and traces, allowing you to observe your stack from end to end. The AI Assistant in Observability Cloud has access to the following data:

* Metric time series data, including infrastructure navigators, metrics and metadata, dashboards, and SignalFlow

* APM data, including service metrics and dependencies, tags, exemplar traces, and trace details

* Logs through Log Observer Connect

The Assistant searches the data in the previous list and makes use of data correlations to find the answers to your questions. In the next section, you will learn how to efficiently prompt the Assistant.

.. raw:: html
  
    <embed>
      <h2>General guidelines for prompting the Assistant<a name="general-guidelines-for-prompting-the-assistant" class="headerlink" href="#general-guidelines-for-prompting-the-assistant" title="Permalink to this headline">¶</a></h2>
    </embed>

General guidance for making the most of any AI assistant includes providing questions or instructions that are as clear and specific as possible. The more you can narrow the possible results, the better. Providing trusted information as reference text also helps an AI assistant to better understand which specific information you need. 

Due to the kinds of data it accesses, the AI Assistant in Observability Cloud has specific guidelines to improve your results. Follow these guidelines to receive the best results from the Assistant:

* Guide the Assistant to use specific tools or data

* Provide entity names and types

* Provide context and filters

* Provide the time range

.. raw:: html
  
    <embed>
      <h3>Guide the Assistant to use specific tools or data<a name="guide-the-assistant-to-use-specific-tools-or-data" class="headerlink" href="#guide-the-assistant-to-use-specific-tools-or-data" title="Permalink to this headline">¶</a></h3>
    </embed>

You can steer the Assistant to use particular data or tools by appending certain keywords or phrases to your prompt. The following are examples:

* "Use SignalFlow to find...""

* "Look in APM data."

* "Check the logs for..."

When you add information to your prompt or question that specifies the tools or data it should use, the Assistant uses such hints to drill down to what you care about faster. Such hints are not required, but they do narrow your results to make your prompt efficient and your answer faster and less overwhelming.

.. raw:: html
  
    <embed>
      <h3>Provide entity names and types<a name="provide-entity-names-and-types" class="headerlink" href="#provide-entity-names-and-types" title="Permalink to this headline">¶</a></h3>
    </embed>

Providing entity names and types will generally lead to more focused, better, and faster Assistant responses. The following table shows examples of prompts and their quality:

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Prompt quality`
     - :strong:`Prompt example`

   * - Poor
     - What's wrong with the api-gateway?

   * - Poor
     - How's i-09182882 doing?
   
   * - Good
     - What's wrong with the api-gateway service?

   * - Good
     - How's instance i-09182882?

   * - Excellent
     - What's wrong with the api-gateway service in prod environment?

   * - Excellent
     - How's EC2 instance i-09182882?

.. raw:: html
  
    <embed>
      <h4>What makes a prompt poor quality?<a name="what-makes-a-prompt-poor-quality" class="headerlink" href="#what-makes-a-prompt-poor-quality" title="Permalink to this headline">¶</a></h4>
    </embed>

Not providing entity names and types in your prompt makes the prompt unhelpful. The prompt “What's wrong with the api-gateway?” does not provide entity names or types. The level of specificity is low and returns an overwhelming set of responses that might or might not be useful in your troubleshooting.

.. raw:: html
  
    <embed>
      <h4>What makes a prompt good quality?<a name="what-makes-a-prompt-good-quality" class="headerlink" href="#what-makes-a-prompt-good-quality" title="Permalink to this headline">¶</a></h4>
    </embed>

The more information you include about your environment and the entities in it, the better your Assistant results are.

An example of a decent prompt is “What's wrong with the api-gateway service?” It specifies that the Assistant should examine the API gateway service and returns results that are more specific and more helpful. If you suspect a problem with a particular service, you should name the actual service in your prompt to the Assistant.


.. raw:: html
  
    <embed>
      <h4>What makes a prompt excellent quality?<a name="what-makes-a-prompt-excellent-quality" class="headerlink" href="#what-makes-a-prompt-excellent-quality" title="Permalink to this headline">¶</a></h4>
    </embed>

The more specific your prompt, the better the results. Naming both a service and the environment helps the Assistant to narrow its results to only what you care about. An example of an excellent prompt is "What's wrong with the api-gateway service in prod environment?" Because this example tells the Assistant which service and which environment, your results will be specific enough to allow you to identify the specific problems you are experiencing and take action.

.. raw:: html
  
    <embed>
      <h3>Provide context and filters<a name="provide-context-and-filters" class="headerlink" href="#provide-context-and-filters" title="Permalink to this headline">¶</a></h3>
    </embed>

Another way you can give the Assistant the information it needs to respond with relevant and accurate information is by providing context and filters. The following table shows examples of prompts with and without context and filters, along with the quality of the prompts.

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Prompt quality`
     - :strong:`Prompt example`

   * - Poor
     - I got paged, what's wrong?

   * - Good
     - I got paged for api-gateway latency in prod2, what's wrong?

   * - Excellent
     - I got paged for incident <incident_id> what's wrong?

.. raw:: html
  
    <embed>
      <h4>Poor prompts<a name="poor-prompts" class="headerlink" href="#poor-prompts" title="Permalink to this headline">¶</a></h4>
    </embed>

The prompt, “I got paged, what's wrong?” does not help the Assistant to help you. With this prompt, the Assistant doesn't know which alert you're responding to, so it can't provide you with more information about your page.

.. raw:: html
  
    <embed>
      <h4>Good prompts<a name="good-prompts" class="headerlink" href="#good-prompts" title="Permalink to this headline">¶</a></h4>
    </embed>

The prompt, “I got paged for api-gateway latency in prod2, what's wrong?” is a good prompt because the Assistant is able to identify the relevant alert or alerts and collect the related information. The Assistant can then provide an evaluation of the information contained in or related to the alert, which tells you what you might want to do next to resolve the problem.

.. raw:: html
  
    <embed>
      <h4>Excellent prompts<a name="excellent-prompts" class="headerlink" href="#excellent-prompts" title="Permalink to this headline">¶</a></h4>
    </embed>

The prompt, “I got paged for incident <incident_id> what's wrong?” is excellent because there is no ambiguity. The Assistant knows exactly which alert and incident you want information about. With that information, the Assistant can suggest probable solutions.

.. raw:: html
  
    <embed>
      <h3>Provide the time range<a name="provide-the-time-range" class="headerlink" href="#provide-the-time-range" title="Permalink to this headline">¶</a></h3>
    </embed>

To focus your investigation, you can provide a time range in your prompt. While it narrows down the relevant information and lets the Assistant suggest more specific problems and solutions, a time range is not required. If you do not give a time range, the default time range for most tools is the last 15 minutes, which the Assistant analyzes. 

The most reliable way to construct time ranges in natural language is by relative times, such as by saying “in the past hour,” “from 8 hours ago until 2 hours ago,” etc. You can use standard shorthand, such as, [-1h, now] or  [-8h, -2h]. You can also use datetime strings, such as “Did any alert fire after 2024-11-06T19:15:00+00:00 ?”

.. raw:: html
  
    <embed>
      <h2>Scenarios for using the AI Assistant in Observability Cloud<a name="scenarios-for-using-the-ai-assistant-in-observability-cloud" class="headerlink" href="#scenarios-for-using-the-ai-assistant-in-observability-cloud" title="Permalink to this headline">¶</a></h2>
    </embed>

This section shows examples of situations in which you can use the Assistant to resolve situations faster.

.. raw:: html
  
    <embed>
      <h3>You receive an alert<a name="you-receive-an-alert" class="headerlink" href="#you-receive-an-alert" title="Permalink to this headline">¶</a></h3>
    </embed>

When you receive an alert, possible prompts you might use in the Assistant to help resolve the incident include the following:

* I received an alert related to the paymentservice. What's happening?

* I received an alert with incident ID Ggn_D1TA4BU. What's going on?

* Can you look at my APM data and logs to understand the root cause of this issue?

.. raw:: html
  
    <embed>
      <h4>Example prompt: Poor<a name="example-prompt-1-poor" class="headerlink" href="#example-prompt-1-poor" title="Permalink to this headline">¶</a></h4>
    </embed>

:guilabel:`I received an alert related to the paymentservice. What's happening?`

This example is poor because it does not give the Assistant enough specific information to prompt a useful or actionable response. While this prompt mentions paymentservice, it does not provide an incident ID or environment. The Assistant is likely to return a summary of everything related to paymentservice, which will be overwhelming and potentially irrelevant. For example, the Assistant might give a summary of paymentservice in a development environment when you wanted information about a production environment. To make this prompt better, add an incident ID or an environment. 

.. raw:: html
  
    <embed>
      <h4>Example prompt: Good<a name="example-prompt-2-good" class="headerlink" href="#example-prompt-2-good" title="Permalink to this headline">¶</a></h4>
    </embed>

:guilabel:`I received an alert with incident ID Ggn_D1TA4BU. What's going on?`

This example is good because it is focused. It states that you received an alert and gives the incident ID. The Assistant is likely to give a summary of the incident. You can then ask a follow up question based on the summary to get more information.

.. raw:: html
  
    <embed>
      <h4>Example prompt: Excellent<a name="example-prompt-3-excellent" class="headerlink" href="#example-prompt-3-excellent" title="Permalink to this headline">¶</a></h4>
    </embed>

:guilabel:`Can you look at my APM data and logs to understand the root cause of this issue?`

If you are looking at an alert in the UI, this prompt is excellent because the Assistant knows exactly what you mean by “this issue” and can reference all of the information in the alert. Using the page context, the Assistant pulls in all information from the alert and can help you narrow down the probable root cause quickly.

.. raw:: html
  
    <embed>
      <h3>A service is having issues<a name="a-service-is-having-issues" class="headerlink" href="#a-service-is-having-issues" title="Permalink to this headline">¶</a></h3>
    </embed>

When a service is experiencing problems, possible prompts you might use to help resolve the incident include the following:

* Show me the last 3 traces for apm-classic errors.

* Paymentservice in online boutique env is having issues in past 15 mins. What's going on?

* Paymentservice in online boutique env is having issues in past 15 mins. Look for any relevant error exemplar traces. Once you've identified the exemplar traces, analyze each full trace by its trace ID

.. raw:: html
  
    <embed>
      <h4>Example prompt: Poor<a name="id1" class="headerlink" href="#id1" title="Permalink to this headline">¶</a></h4>
    </embed>

:guilabel:`Show me the last 3 traces for apm-classic errors.`

This prompt is poor because you do not give the Assistant a time range or environment. To improve this prompt, tell the Assistant which environment you are interested in. Then you can even ask the Assistant to analyze the traces and suggest potential root causes of the errors.

.. raw:: html
  
    <embed>
      <h4>Example prompt: Good<a name="id2" class="headerlink" href="#id2" title="Permalink to this headline">¶</a></h4>
    </embed>

:guilabel:`Paymentservice in online boutique env is having issues in past 15 mins. What's going on?`

This prompt is good because it gives the service and the time range. Telling the Assistant which environment prevents the Assistant from giving you seemingly confident answers about the wrong environment. The default time range is the past 15 minutes, so mentioning it doesn't help or hurt the prompt. 

.. raw:: html
  
    <embed>
      <h4>Example prompt: Excellent<a name="id3" class="headerlink" href="#id3" title="Permalink to this headline">¶</a></h4>
    </embed>

:guilabel:`Paymentservice in online boutique env is having issues in past 15 mins. Look for any relevant error exemplar traces. After identifying the exemplar traces, analyze each full trace by its trace ID`

The third example prompt expands on the second example prompt. The second example prompt was good, but the third is excellent. One way to improve a prompt when you don’t know more specific information is to instruct the Assistant to extract certain details, then you can further prompt the Assistant using the extracted details. In this excellent example prompt, the Assistant extracts traces. Then it examines the traces and provides you with its analysis. From there, you can ask more and more specific questions based on information in the Assistant's analysis. You might want to tell the Assistant how many exemplar traces to analyze so that the Assistant does not overwhelm you with a very large response and exceed context limitations of the conversation.

.. raw:: html
  
    <embed>
      <h3>A Kubernetes cluster is having issues<a name="a-kubernetes-cluster-is-having-issues" class="headerlink" href="#a-kubernetes-cluster-is-having-issues" title="Permalink to this headline">¶</a></h3>
    </embed>

When a Kubernetes cluster is having problems, a possible prompt you might use in the Assistant to help resolve the situation is the following:

:guilabel:`It looks like k8s pod prod50 has a high CPU utilization. When did it start?`

The preceding prompt is good because you give the Assistant the environment, prod50. This is an example of a situation in which you might not have much information to begin your troubleshooting journey. In this case, give the Assistant any specific information you can to prompt a response that gives you more information. You can identify important information in the Assistant's response to ask more specific questions until you narrow your exploration down to a potential root cause.

.. raw:: html
  
    <embed>
      <h3>Creating a chart<a name="creating-a-chart" class="headerlink" href="#creating-a-chart" title="Permalink to this headline">¶</a></h3>
    </embed>

When you want to create a chart in Splunk Observability Cloud, you might prompt the Assistant with the following:

:guilabel:`Can you share SignalFlow to monitor the top 5 K8s nodes with the highest CPU utilization?`

The preceding prompt is excellent because it gives the Assistant a fair amount of detail on what you want to know. The Assistant can make a functional chart based on the information you provide. You can follow up to adjust your chart after you see it. For example, you can then tell the Assistant to adjust the chart to a particular 30-minute window.

.. raw:: html
  
    <embed>
      <h2>Other resources<a name="other-resources" class="headerlink" href="#other-resources" title="Permalink to this headline">¶</a></h2>
    </embed>

For specific instructions on how access and use the AI Assistant, see :ref:`o11y-ai`.

To learn about Splunk's commitment to responsible AI, see :new-page:`Responsible AI for AI Assistant in Observability Cloud <http://splunk.com/en_us/about-splunk/splunk-data-security-and-privacy/responsible-ai-for-ai-assistant-in-observability-cloud.html>`.
