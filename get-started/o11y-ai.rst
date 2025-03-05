.. _o11y-ai:

**********************************************************************************
AI Assistant in Observability Cloud
**********************************************************************************

.. meta::
   :description: Learn to use the AI Assistant in Observability Cloud.

The AI Assistant in Observability Cloud provides fast, deep insights that leverage observability data (metrics, traces, logs, and alerts). Users can access these insights in an intuitive chat interface within their existing workflow in Splunk Observability Cloud.

You can use the AI Assistant to do the following:

* Get quick insights into your metrics, charts, traces, incident alerts, dashboards, services, and errors

* Troubleshoot faster in Splunk APM and Splunk Infrastructure Monitoring

* Search metrics, charts, and alerts

* Generate SignalFlow based on your question in natural language

The AI Assistant provides an intelligent chatbot experience to empower users to craft complex SignalFlow by simply writing plain English prompts.

The AI Assistant has access only to data from Splunk APM and Splunk Infrastructure Monitoring. While you can access the AI Assistant throughout Splunk Observability Cloud, responses are geared toward use cases for APM, Infrastructure Monitoring, and Log Observer Connect.

.. raw:: html
  
    <embed>
      <h2>What is supported<a name="what-is-supported" class="headerlink" href="#what-is-supported" title="Permalink to this headline">¶</a></h2>
    </embed>

The AI Assistant understands and supports natural language. The AI Assistant responds in natural language with a summary of insights synthesized from multiple sources. Currently, the AI Assistant supports only English. 

The AI Assistant is available in AWS US East Virginia (us-east-1), AWS US West Oregon (us-west-2), AWS EU Dublin (eu-west-1), and AWS AP Sydney (ap-southeast-2).

.. raw:: html
  
    <embed>
      <h2>How to access the AI Assistant in Observability Cloud<a name="how-to-access-the-ai-assistant-in-observability-cloud" class="headerlink" href="#how-to-access-the-ai-assistant-in-observability-cloud" title="Permalink to this headline">¶</a></h2>
    </embed>

To access the AI Assistant in Observability Cloud, select the AI Assistant icon from the toolbar on the right side.

..  image:: /_images/ai/ai1.png
    :width: 100%
    :alt: This image shows the location of the AI Assistant in Observability Cloud.


Enter your prompt in plain English in the text box. Ask about anything in your environment.

Alternatively, you can select from the suggested prompts:

* What can you help with?
* List active incidents
* List error traces from the past 15 minutes

..  image:: /_images/ai/ai2.png
    :width: 40%
    :alt: This image shows the suggested prompts for the AI Assistant.

.. note:: When you ask questions or submit instructions that require the AI Assistant to query logs, there is an impact on your SVC quota.

.. raw:: html
  
    <embed>
      <h3>Feedback<a name="feedback" class="headerlink" href="#feedback" title="Permalink to this headline">¶</a></h3>
    </embed>

You can give feedback to the AI Assistant in development team by selecting the thumbs up or thumbs down icon that appears after each AI Assistant response.

.. raw:: html
  
    <embed>
      <h2>Context limitations<a name="context-limitations" class="headerlink" href="#context-limitations" title="Permalink to this headline">¶</a></h2>
    </embed>

Context length is the amount of text that the AI Assistant can process in a single conversation due to LLM limitations. Think of it as the short-term memory of the AI Assistant. Each interaction with the AI Assistant is limited to the context set from the beginning of that conversation. The AI Assistant tells you when you exceed the chat limit and prompts you to copy the information that you want to save and start a new chat to continue. Select the :guilabel:`New chat` button in the upper right corner of the AI Assistant to create a new chat with a new context.

.. raw:: html
  
    <embed>
      <h3>Chat history<a name="chat-history" class="headerlink" href="#chat-history" title="Permalink to this headline">¶</a></h3>
    </embed>

You can only access the most recent chat interaction within the last 30 days.

.. raw:: html
  
    <embed>
      <h3>ChatId<a name="chatid" class="headerlink" href="#chatid" title="Permalink to this headline">¶</a></h3>
    </embed>

Chatid is the unique identifier for each conversation in AI Assistant in Observability Cloud. Use ChatId when you want to report something about a particular conversation. Find it near the top of the chat below :guilabel:`AI Assistant`.

..  image:: /_images/ai/ai3.png
    :width: 40%
    :alt: This image shows the location of the chatId.

.. raw:: html
  
    <embed>
      <h2>Data sharing and use<a name="data-sharing-and-use" class="headerlink" href="#data-sharing-and-use" title="Permalink to this headline">¶</a></h2>
    </embed>

The following table explains the categories of data that the AI Assistant uses, collects, or generates:

.. list-table::
   :header-rows: 1
   :widths: 15, 50

   * - :strong:`Category`
     - :strong:`Description`
   * - User prompts or inputs 
     - Refers to a question or an input by a user to the AI Assistant. Examples are “Show me all K8 nodes with more than 90% memory utilization”, and “What is wrong with my payment service?”
   * - Grounding observability data
     - Refers to observability metrics, traces, and logs data. Not every user prompt may require grounding observability data. For environment-specific questions like “What is wrong with my payment service?”, the AI Assistant leverages payment service-related observability data to answer the question.
   * - Assistant responses
     - Refer to the output generated by the AI Assistant. This might contain observability data in a summarized text chart form. 
   * - Feedback
     - Refers to any user-entered feedback.
   * - Usage data
     - Usage data is more fully described in the Splunk Privacy Statement. Examples include “thumbs up”, “thumbs down”, “chat id”, “copy”, “tokens used”, and “response length”. 

When you use the AI Assistant, Splunk relies on certain essential types of data to provide the service, and to enforce compliance with Splunk policy and applicable law; this includes user inputs, outputs, grounding observability data, and usage data (“essential purposes”). If you use the AI Assistant in Observability Cloud, you are agreeing to the essential purposes.

In addition to the essential purposes, you also have the option of allowing Splunk to use the data collected by the AI Assistant for the additional purpose of conducting research and development on the AI Assistant and generative AI in general. This use of your data is optional, and you can choose to allow or disallow it by updating your settings. To manage your AI Assistant settings, follow these steps:

1. Go to :guilabel:`Settings` in Splunk Observability Cloud. 

2. On the :guilabel:`General Organization Settings` page, go to the :guilabel:`AI Assistant Management` section and select or deselect :guilabel:`AI Assistant in Observability` to activate or deactivate the AI Assistant in Observability Cloud for your organization. Note that any use of the AI Assisstant in Observability Cloud requires Splunk's use of your data for the essential purposes. If you do not wish to allow Splunk to use your data for the essential purposes, do not activate the AI Assistant or otherwise use the AI Assistant in Observability Cloud.

3. If you do not want to allow usage of your data for research and development, deselect :guilabel:`Allow my AI service data to be used for research and development purposes`.

.. image:: /_images/get-started/activate-assistant.png
  :width: 70%
  :alt: This screenshot shows how to activate or deactivate the AI Assistant in Observability Cloud, as well as how to control whether your data is used for training the Assistant.

.. raw:: html
  
    <embed>
      <h2>Service limitations<a name="service-limitations" class="headerlink" href="#service-limitations" title="Permalink to this headline">¶</a></h2>
    </embed>

A Splunk Observability Cloud organization has a limit of 3,000 prompts per month and no more than 10 prompts per minute.

.. raw:: html
  
    <embed>
      <h2>Other resources<a name="other-resources" class="headerlink" href="#other-resources" title="Permalink to this headline">¶</a></h2>
    </embed>

Learn how to prompt the AI Assistant effectively by reading :ref:`o11y-ai-promptlibrary`. You can find general guidance on how to prompt the Assistant to achieve the best results, as well as see sample prompts and learn what makes a prompt excellent, good, or poor.

To learn about Splunk's commitment to responsible AI, see :new-page:`Responsible AI for AI Assistant in Observability Cloud <http://splunk.com/en_us/about-splunk/splunk-data-security-and-privacy/responsible-ai-for-ai-assistant-in-observability-cloud.html>`.