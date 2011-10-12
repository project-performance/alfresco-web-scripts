<#escape x as jsonUtils.encodeJSONString(x)>
 {
 "properties" : [
   <#list properties as property>
	<#if property?exists>
    {"name":"${property.name}","value":"${property.value?string}"}<#if property_has_next>,</#if>
	</#if>
   </#list>
   ],
   
  "permissions" : [
	<#if permissions?exists>
	   <#list permissions as p>
		<#if p?exists>
		{"permission":"${p.permission}","principal":"${p.principal}","role":"${p.role}"}<#if p_has_next>,</#if>
		</#if>
	   </#list>
   </#if>
   ]
 }
</#escape>