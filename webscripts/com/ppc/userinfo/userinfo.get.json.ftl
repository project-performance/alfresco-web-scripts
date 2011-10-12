<#escape x as jsonUtils.encodeJSONString(x)>
 {
<#if name?exists>
 "name":"${name}",
</#if>
 "groups" : [
   <#list groups as gname>
	<#if gname?exists>
    {"name":"${gname}"}<#if gname_has_next>,</#if>
	</#if>
   </#list>
   ]
   <#if errorMessage?exists>
   ,"errorMessage": "${errorMessage}"
   </#if>
 }
</#escape>