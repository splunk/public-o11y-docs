[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: Growth, Standard, Enterprise**

[/ht_toggle]

Scout is Application Monitoring built for modern development teams. It's
built to provide the fastest path to a slow line-of-code.

**In On-Call**
--------------

Navigate to **Integrations>>Third Party Integrations>>Scout APM** and
click the **Enable Integration** button.

Copy the **Service API Key** for use in the Scout APM configuration.

**In Scout APM**
----------------

**Create Notification Channel:**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Navigate to the notification channels page via the following
`URL <https://scoutapm.com/notification_channels>`__, or by heading to
the **Alerts & Notification** dropdown tab and clicking **Notification
Channels** on the left-hand sidebar:

.. image:: images/scoutapm1.png

To add a Splunk On-Call notification channel, click the **Splunk On-Call
Alert** button:

.. image:: images/scoutapm2.png

Add a name for the Channel, set the alerting level, then add the
**Service API Key** which you copied from the On-Call Integration page.
Next, enter a valid **Routing Key** from the **On-Call Settings** page
and click the **Create Integration** button.

.. image:: images/scoutapm5.png

Edit Notification Groups:
~~~~~~~~~~~~~~~~~~~~~~~~~

Once you have created the integration/channel, you can now add the
channel to a (or multiple) notification group(s). When you create
alerts, you assign a notification group to alert. That way when an alert
occurs all of the channels in that group get notified. On the
Notification Group page, you can either add it to the default
notification group, or create a new one:

.. image:: images/scoutapm4.png

For additional help with this integration you can reach `On-Call
Support <https://victorops.com/contact/>`__ or email `Scout
Support <mailto:support@scoutapm.com>`__.
