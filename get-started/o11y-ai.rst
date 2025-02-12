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

When you interact with AI Assistant in Observability Cloud, Splunk collects and might use inputs, outputs, grounding data, feedback, and usage data to provide and maintain the the AI Assistant, comply with applicable law, enforce our policies, and develop and improve the AI Assistant in Observability, including to train AI models.  

If you do not want your data used for these purposes, do not click on the button and do not install, download, access, or otherwise use AI Assistant in Observability. 

The following table explains the categories of data the AI Assistant collects:

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

You can activate and deactivate data sharing by going to :guilabel:`Settings`. On the General Organization Settings page, go to the AI Assistant Management section. Select or deselect :guilabel:`AI Assistant in Observability` to activate or deactivate the AI Assistant for your organization. 

If you do not want to share your data, deselect :guilabel:`Allow my AI service data to be used for research and development purposes`.

.. image:: /_images/get-started/activate-assistant.png
  :width: 70%
  :alt: This screenshot shows how Splunk Observability Cloud products serve the different layers and processes in an organization's environment.

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