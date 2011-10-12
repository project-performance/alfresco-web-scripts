<#escape x as jsonUtils.encodeJSONString(x)>
 {
 "items" : [
   <#list items as item>
	<#if item?exists>
    {"id":"${item.id}",
	<#if item.properties?exists>
	"properties" : [
	   <#list item.properties as property>
		<#if property?exists>
		{"name":"${property.name}","value":"${property.value?string}"}<#if property_has_next>,</#if>
		</#if>
	   </#list>
   ],
   </#if>
   
   	<#if item.permissions?exists>
	"permissions" : [
	   <#list item.permissions as p>
		<#if p?exists>
		{"permission":"${p.permission}","principal":"${p.principal}","role":"${p.role}"}<#if p_has_next>,</#if>
		</#if>
	   </#list>
   ]
   </#if>
   
	}<#if item_has_next>,</#if>
	</#if>
   </#list>
   ]
   <#if errorMessage?exists>
   ,"errorMessage": "${errorMessage}"
   </#if>
 }
</#escape>