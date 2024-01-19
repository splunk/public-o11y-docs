Please note: This is not an officially supported integration. Thanks to
`Scott Ames <https://gist.github.com/ScottAmes>`__ for putting it
together.

VictorOps Alerting from Microsoft System Center Operations Manager
(SCOM) through PowerShell. Call this script from SCOM's command
notification channel.

Change $RoutingKey to the routing key you would like to pass in or
remove it altogether to send it to the default key

*Note: If your alerts are coming into VictorOps but going to the wrong
team, you may have to hard code the Routing Key into the URL on lines 57
and 67 of the script instead of using the $RoutingKey variable.*

Change api-key to the organization api key or default it in parameter #2

EXAMPLE FULL PATH OF THE COMMAND FILE:
C:\\windows\\system32\\WindowsPowerShell\\v1.0\\powershell.exe

STARTUP FOLDER FOR THE COMMAND LINE:
C:\\windows\\system32\\WindowsPowerShell\\v1.0\\

<#.SYNOPSIS VictorOps Alerting from Microsoft System Center Operations
Manager (SCOM) through PowerShell Call this script from SCOM's command
notification channel - be sure to update the API key (parameter #2). See
Example for usage. .DESCRIPTION Post alerts to VictorOps from Microsoft
System Center Operations Manager (SCOM) through PowerShell .EXAMPLE FULL
PATH OF THE COMMAND FILE:
C:\\windows\\system32\\WindowsPowerShell\\v1.0\\powershell.exe COMMAND
LINE PARAMETERS: “C:\\scripts\\VO_Send-Alert_Test.ps1”
‘“:math:`Data\[Default='Not Present'\]/Context/DataItem/AlertId`”'
‘“$RoutingKey”' ‘“api-key”' # !Change
:math:`RoutingKey to the routing key you would like to pass in or remove it alltogether to default to 'everyone' # !Change api-key to the organization api key or default it in parameter #2 STARTUP FOLDER FOR THE COMMAND LINE: C:\\windows\\system32\\WindowsPowerShell\\v1.0\\ .EXAMPLE # Easier to look at: "C:\\scripts\\VO\_Send-Alerts.ps1" ^ '"`\ Data[Default=‘Not
Present']/Context/DataItem/AlertId\ :math:`"' ^ '"`\ RoutingKey”'' ^
‘“api-key”' # Change
:math:`RoutingKey to the routing key you would like to pass in, or remove it alltogether to default to 'everyone' #> Param (  \[Parameter(Mandatory=`\ true
,Position=0,HelpMessage=“Unique AlertID must be
provided.”)][GUID]\ :math:`AlertID,  \[Parameter(Mandatory=`\ false,Position=1,HelpMessage=“Team
routing key, optional.”)]
[String]\ :math:`RoutingKey = "everyone",  \[Parameter(Mandatory=`\ false,Position=2,HelpMessage=“Organization
API key (see REST API Integrations settings in VictorOps),
optional.”)][String]\ :math:`API = "",  \[Parameter(Mandatory=`\ false,Position=3,HelpMessage=“Monitoring
tool, optional.”)] [String]$MonitoringTool = “Microsoft System Center
Operations Manager” )

Required: OperationsManager Module
==================================

Import-Module OperationsManager

Find the alert
--------------

:math:`Alert = Get-SCOMAlert | where {`\ \_.id -eq $AlertID.ToString()}

Determine the status of the alert
=================================

switch (:math:`Alert.ResolutionState){  0 {`\ Status=“CRITICAL”} 255
{:math:`Status="RECOVERY"}  default {`\ Status=“CRITICAL”} }

workaround for unix/linux hosts - hostnames do not come through clearly in SCOM
===============================================================================

if($Alert.NetbiosComputerName -ne $null){ $hstname =
:math:`alert.NetbiosComputerName } elseif(`\ Alert.MonitoringObjectPath
-ne $null){ $hstname = $alert.MonitoringObjectFullName } else { $hstname
= $alert.MonitoringObjectName }

Setup our Subject & StateMessage to be passed
---------------------------------------------

[String]$Subject = $Status + “:” + $Alert.Name + ” [” +
:math:`hstname + "\]" \[String\]`\ StateMessage = “Description:” +
$Alert.Description + “\`n” \` + “Hostname:” + $hstname + “\`n” \` +
“Timestamp:” + $Alert.TimeRaised.ToLocalTime() + ” PST \`n” \` + “Team:”
+ $RoutingKey.ToUpper() + “\`n” \` + “Last modified by:” +
$Alert.LastModifiedBy + “\`n” \` + “Last modified time:” +
$Alert.LastModified + “\`n” \`

Convert to json
---------------

$props = @{ message_type = $Status; #[String] One of the following
values: INFO, WARNING, ACKNOWLEDGMENT, CRITICAL, RECOVERY timestamp =
$Alert.TimeRaised.ToLocalTime(); #[Number] Timestamp of the alert in
seconds since epoch. Defaults to the time the alert is received at
VictorOps. entity_id = $Alert.id.ToString(); #[String] The name of
alerting entity. If not provided, a random name will be assigned.
entity_display_name = $Subject; #[String] Used within VictorOps to
display a human-readable name for the entity. hostname = $hstname;
#[String] System hostname (set above via logic) monitoring_tool =
$MonitoringTool; #[String] The name of the monitoring system software
(eg. nagios, icinga, sensu, etc.) state_message = $StateMessage;
#[String] Any additional status information from the alert item. Subject
= $Subject; } $json = ConvertTo-Json -InputObject $props

Log alert
---------

Event-log
=========

:math:`CheckEventLog = (Get-EventLog -List | ? Log -EQ "OM Alerts") if(`\ CheckEventLog
-eq $null){ try{New-EventLog -LogName “OM Alerts” -Source “VictorOps
Alerts”} catch{Write-Error “Please rerun the script from a Windows
PowerShell console with admin rights (‘Run As Administrator'). Cannot
continue.”;Break} } $event_message =
:math:`StateMessage + "\`n Command: " + "Invoke-RestMethod -Method Post -ContentType \`"application/json\`" -Body \`n`\ json`n
-Uri
\`“https://alert.victorops.com/integrations/generic/20131114/alert/:math:`API/`\ RoutingKey\`””

Write-EventLog -LogName “OM Alerts” -Source “VictorOps Alerts” -Message
$event_message -EventId 2 -EntryType Information

<# Text file $Logstring = $StateMessage.replace(“\`n”,” “) $Logfile
=”C:\\scripts\\VO_Send-Alerts.log” $DateTime = Get-Date -Uformat
“%y-%m-%d %H:%M:%S” $Logstring = $DateTime + ” ” + $Logstring
Add-content $Logfile -value $Logstring
:math:`json | Out-File -FilePath "C:\\scripts\\VO\_Send-Alerts.`\ RoutingKey.json”
#>

Post the alert
==============

Invoke-RestMethod -Method Post \` -ContentType “application/json” \`
-Body
:math:`json \`  -Uri "https://alert.victorops.com/integrations/generic/20131114/alert/`\ API/$RoutingKey”
