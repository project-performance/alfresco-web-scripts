<#escape x as jsonUtils.encodeJSONString(x)>
 {
<#if name?exists>
 "name":"${name}",
</#if>
 "properties" : [
   <#list properties as property>
	<#if property?exists>
    {"name":"${property.name}","value":"${property.value?string}"}<#if property_has_next>,</#if>
	</#if>
   </#list>
   ]
   <#if errorMessage?exists>
   ,"errorMessage": "${errorMessage}"
   </#if>
 }
</#escape>