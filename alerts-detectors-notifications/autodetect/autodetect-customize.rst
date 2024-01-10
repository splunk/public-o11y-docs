.. _autodetect-customize:

Copy and customize an AutoDetect detector
******************************************************

To customize an AutoDetect detector you must copy it first, because AutoDetect detectors are read-only. When you customize an AutoDetect detector, Splunk Observability Cloud creates a copy of the original detector for you to apply the customizations.

- Any changes you make to the customized detector don't apply to the original AutoDetect detector.
- Customized detectors created from AutoDetect detectors count toward the maximum numbers of detectors your organization can have. To learn more about the detectors limit, see :ref:`maximum-number-of-detectors-per-org`.
- The default limit for customized detectors per AutoDetect detector is 15. If you want to increase this limit, contact support for help.

To customize a copy of an AutoDetect detector, do the following:

#. In the navigation menu, select :menuselection:`Alerts & Detectors`. 
#. Select the :strong:`Detectors` tab.
#. In the search field, enter the name of the detector you want to customize.
    
    For example, to search for the "K8s Node Memory Utilization is high" detector, enter "K8s Node." The result lists update automatically.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-search.png
      :width: 80%
      :alt: This screenshot shows what an searching for an AutoDetect looks like on the Alerts page.

#. Select the detector you want to customize to open it.
#. Select :guilabel:`Create a Customized Version`.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-disable-customize.png
      :width: 60%
      :alt: This screenshot shows the position of the Create a Customized Version button.

#. Make your customizations. For the full list of customizable arguments for each AutoDetect detector, see :ref:`autodetect-list`.
#. Rename your customized detector to distinguish it from the original detector and any other copy.
#. Select :guilabel:`Activate`.

Customized detectors created from AutoDetect detectors are marked with a :strong:`Custom` badge.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-custom.png
      :width: 90%
      :alt: This screenshot shows a customized detector indicated by the Custom badge.

