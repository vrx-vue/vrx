import{_ as s,c as a,o as n,a as l}from"./app.0dbef2a1.js";const B=JSON.parse('{"title":"resetRef","description":"","frontmatter":{"category":"utils"},"headers":[{"level":2,"title":"Usage","slug":"usage","link":"#usage","children":[]},{"level":2,"title":"Type Declarations","slug":"type-declarations","link":"#type-declarations","children":[]}],"relativePath":"functions/resetRef.md","lastUpdated":1664219198000}'),p={name:"functions/resetRef.md"},o=l(`<h1 id="resetref" tabindex="-1">resetRef <a class="header-anchor" href="#resetref" aria-hidden="true">#</a></h1><p>可重置的 ref</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#BD976A;">resetRef</span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7D99;">&#39;</span><span style="color:#C98A7D;">@vrx/core</span><span style="color:#C98A7D99;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">/**</span></span>
<span class="line"><span style="color:#758575DD;"> * list 数据</span></span>
<span class="line"><span style="color:#758575DD;"> * resetList 重置数据的方法</span></span>
<span class="line"><span style="color:#758575DD;"> */</span></span>
<span class="line"><span style="color:#CB7676;">const </span><span style="color:#666666;">[</span><span style="color:#BD976A;">list</span><span style="color:#666666;">,</span><span style="color:#CB7676;"> </span><span style="color:#BD976A;">resetList</span><span style="color:#666666;">]</span><span style="color:#CB7676;"> = </span><span style="color:#80A665;">resetRef</span><span style="color:#666666;">({</span></span>
<span class="line"><span style="color:#666666;">    </span><span style="color:#758575DD;">// 初始化数据，也是重置数据调用的方法</span></span>
<span class="line"><span style="color:#666666;">    </span><span style="color:#80A665;">initValue</span><span style="color:#666666;">: () =&gt; [],</span></span>
<span class="line"><span style="color:#666666;">    </span><span style="color:#758575DD;">// 是否使用shallowRef 包装</span></span>
<span class="line"><span style="color:#666666;">    </span><span style="color:#B8A965;">shallow</span><span style="color:#666666;">: </span><span style="color:#4D9375;">true</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#666666;">});</span></span>
<span class="line"></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#B07D48;">resetRef</span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">@vrx/core</span><span style="color:#B5695999;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">/**</span></span>
<span class="line"><span style="color:#A0ADA0;"> * list 数据</span></span>
<span class="line"><span style="color:#A0ADA0;"> * resetList 重置数据的方法</span></span>
<span class="line"><span style="color:#A0ADA0;"> */</span></span>
<span class="line"><span style="color:#AB5959;">const </span><span style="color:#999999;">[</span><span style="color:#B07D48;">list</span><span style="color:#999999;">,</span><span style="color:#AB5959;"> </span><span style="color:#B07D48;">resetList</span><span style="color:#999999;">]</span><span style="color:#AB5959;"> = </span><span style="color:#59873A;">resetRef</span><span style="color:#999999;">({</span></span>
<span class="line"><span style="color:#999999;">    </span><span style="color:#A0ADA0;">// 初始化数据，也是重置数据调用的方法</span></span>
<span class="line"><span style="color:#999999;">    </span><span style="color:#59873A;">initValue</span><span style="color:#999999;">: () =&gt; [],</span></span>
<span class="line"><span style="color:#999999;">    </span><span style="color:#A0ADA0;">// 是否使用shallowRef 包装</span></span>
<span class="line"><span style="color:#999999;">    </span><span style="color:#998418;">shallow</span><span style="color:#999999;">: </span><span style="color:#1E754F;">true</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#999999;">});</span></span>
<span class="line"></span></code></pre></div><h2 id="type-declarations" tabindex="-1">Type Declarations <a class="header-anchor" href="#type-declarations" aria-hidden="true">#</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">type</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">MaybeShallowRef</span><span style="color:#666666;">&lt;</span><span style="color:#5DA9A7;">T</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">any</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">Shallow</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">extends</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">boolean</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">boolean</span><span style="color:#666666;">&gt;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">Shallow</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">extends</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">true</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">?</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">ShallowRef</span><span style="color:#666666;">&lt;</span><span style="color:#5DA9A7;">T</span><span style="color:#666666;">&gt;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">Ref</span><span style="color:#666666;">&lt;</span><span style="color:#5DA9A7;">T</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">type</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">ResetRef</span><span style="color:#666666;">&lt;</span><span style="color:#5DA9A7;">T</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">any</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">Shallow</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">extends</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">boolean</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">boolean</span><span style="color:#666666;">&gt;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">[</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#5DA9A7;">MaybeShallowRef</span><span style="color:#666666;">&lt;</span><span style="color:#5DA9A7;">T</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">Shallow</span><span style="color:#666666;">&gt;,</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#666666;">()</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=&gt;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">void</span></span>
<span class="line"><span style="color:#666666;">];</span></span>
<span class="line"><span style="color:#CB7676;">declare</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">function</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">resetRef</span><span style="color:#666666;">&lt;</span><span style="color:#5DA9A7;">T</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">any</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">Shallow</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">extends</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">boolean</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">boolean</span><span style="color:#666666;">&gt;({</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">initValue</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">shallow</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}: {</span></span>
<span class="line"><span style="color:#666666;">    </span><span style="color:#80A665;">initValue</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: () =&gt; </span><span style="color:#5DA9A7;">T</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">    </span><span style="color:#BD976A;">shallow</span><span style="color:#CB7676;">?</span><span style="color:#666666;">: </span><span style="color:#5DA9A7;">Shallow</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#666666;">}):</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">ResetRef</span><span style="color:#666666;">&lt;</span><span style="color:#5DA9A7;">T</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#5DA9A7;">Shallow</span><span style="color:#666666;">&gt;;</span></span>
<span class="line"></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">type</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">MaybeShallowRef</span><span style="color:#999999;">&lt;</span><span style="color:#2E808F;">T</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">=</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">any</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">Shallow</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">extends</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">boolean</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">=</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">boolean</span><span style="color:#999999;">&gt;</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">=</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">Shallow</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">extends</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">true</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">?</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">ShallowRef</span><span style="color:#999999;">&lt;</span><span style="color:#2E808F;">T</span><span style="color:#999999;">&gt;</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">:</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">Ref</span><span style="color:#999999;">&lt;</span><span style="color:#2E808F;">T</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">type</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">ResetRef</span><span style="color:#999999;">&lt;</span><span style="color:#2E808F;">T</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">=</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">any</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">Shallow</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">extends</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">boolean</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">=</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">boolean</span><span style="color:#999999;">&gt;</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">=</span><span style="color:#393A34;"> </span><span style="color:#999999;">[</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#2E808F;">MaybeShallowRef</span><span style="color:#999999;">&lt;</span><span style="color:#2E808F;">T</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">Shallow</span><span style="color:#999999;">&gt;,</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#999999;">()</span><span style="color:#393A34;"> </span><span style="color:#999999;">=&gt;</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">void</span></span>
<span class="line"><span style="color:#999999;">];</span></span>
<span class="line"><span style="color:#AB5959;">declare</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">function</span><span style="color:#393A34;"> </span><span style="color:#59873A;">resetRef</span><span style="color:#999999;">&lt;</span><span style="color:#2E808F;">T</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">=</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">any</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">Shallow</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">extends</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">boolean</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">=</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">boolean</span><span style="color:#999999;">&gt;({</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">initValue</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">shallow</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#999999;">}: {</span></span>
<span class="line"><span style="color:#999999;">    </span><span style="color:#59873A;">initValue</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: () =&gt; </span><span style="color:#2E808F;">T</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">    </span><span style="color:#B07D48;">shallow</span><span style="color:#AB5959;">?</span><span style="color:#999999;">: </span><span style="color:#2E808F;">Shallow</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#999999;">}):</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">ResetRef</span><span style="color:#999999;">&lt;</span><span style="color:#2E808F;">T</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#2E808F;">Shallow</span><span style="color:#999999;">&gt;;</span></span>
<span class="line"></span></code></pre></div>`,6),e=[o];function t(c,r,y,A,D,E){return n(),a("div",null,e)}const C=s(p,[["render",t]]);export{B as __pageData,C as default};