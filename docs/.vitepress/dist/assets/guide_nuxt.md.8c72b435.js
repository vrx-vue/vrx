import{_ as s,c as a,o as n,Q as l}from"./chunks/framework.3ac4864a.js";const h=JSON.parse('{"title":"Nuxt 集成","description":"","frontmatter":{},"headers":[],"relativePath":"guide/nuxt.md","filePath":"guide/nuxt.md","lastUpdated":1699464813000}'),p={name:"guide/nuxt.md"},e=l(`<h1 id="nuxt-集成" tabindex="-1">Nuxt 集成 <a class="header-anchor" href="#nuxt-集成" aria-label="Permalink to &quot;Nuxt 集成&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">提示</p><p>由于 <code>useAsyncData</code> 与 <strong>nuxt3</strong> 全局方法冲突，在自动导入时将重命名为 <code>$useAsyncData</code> 避免冲突</p></div><h2 id="install" tabindex="-1">安装 <a class="header-anchor" href="#install" aria-label="Permalink to &quot;安装{#install}&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-SVIAQ" id="tab-Y5ajLvv" checked="checked"><label for="tab-Y5ajLvv">npm</label><input type="radio" name="group-SVIAQ" id="tab-uXuehZ7"><label for="tab-uXuehZ7">yarn</label><input type="radio" name="group-SVIAQ" id="tab-QvvGuGd"><label for="tab-QvvGuGd">pnpm</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@vrx/nuxt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@vrx/nuxt</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@vrx/nuxt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@vrx/nuxt</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@vrx/nuxt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@vrx/nuxt</span></span></code></pre></div></div></div><h2 id="nuxt-config-ts" tabindex="-1">nuxt.config.ts <a class="header-anchor" href="#nuxt-config-ts" aria-label="Permalink to &quot;nuxt.config.ts&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineNuxtConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  modules: [</span><span style="color:#9ECBFF;">&#39;@vrx/nuxt&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  vrx: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/** Options */</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineNuxtConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  modules: [</span><span style="color:#032F62;">&#39;@vrx/nuxt&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  vrx: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/** Options */</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>🎉 配置完成后，默认所有方法都可以自动导入了</p><h2 id="配置项" tabindex="-1">配置项 <a class="header-anchor" href="#配置项" aria-label="Permalink to &quot;配置项&quot;">​</a></h2><p>请跳转 <a href="https://gitee.com/vrx/vrx/blob/master/packages/nuxt/src/types.ts" target="_blank" rel="noreferrer">配置项</a> 查看</p>`,9),o=[e];function t(c,r,i,d,y,E){return n(),a("div",null,o)}const v=s(p,[["render",t]]);export{h as __pageData,v as default};
