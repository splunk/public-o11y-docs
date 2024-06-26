.. _syn-troubleshoot:

****************************************
Troubleshoot broken tests  
****************************************

.. meta::
    :description: Troubleshoot broken tests   


   
There are a number of reasons why your tests might fail. For example, 
* test 
* test 
* test 

Follow these guidelines to troubleshoot a broken test. 

#. (Optional) Make a copy of the test so that you can check various solutions before fixing the original test. 
#. Open the test page and see when the test started to fail. Consider the following questions:

    * When did the check fail? Is there a pattern among other failed runs?
    * Does the check fail consistently on the same step, or intermittently?
    * Is this the first time the check has failed on this step? Did you make a recent change to the test?
    * Was the failure tied to a specific location or across all locations? 

#. Open the run results view of a failed test, find the step that is failing and go to the link. 
#. Open inspect element. 
#. Duplicate the step and repeat the steps in your test until you find the broken step. 
#. Verify that there is one instance only of the selector you want to use in your test. If the selector appears more than once your test might break again in the future. Unique selectors provide optimal test performance. 
#. Update your tests with your findings. 


