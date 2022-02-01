import React from 'react'

const __html = `
<span class="token keyword module">import</span> <span class="token punctuation">{</span> someFunc<span class="token punctuation">,</span> <span class="token keyword">type</span> <span class="token class-name"><span class="token maybe-class-name">BaseType</span></span> <span class="token punctuation">}</span> <span class="token keyword module">from</span> <span class="token string">'./some-module.ts'</span>

<span class="token comment">// BaseType is always guaranteed to be erased</span>
<span class="token comment">// and someFunc will be preserved</span>
<span class="token keyword module">export</span> <span class="token keyword">class</span> <span class="token class-name"><span class="token maybe-class-name">Thing</span></span> <span class="token keyword">implements</span> <span class="token class-name"><span class="token maybe-class-name">BaseType</span></span> <span class="token punctuation">{</span>
  <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">someFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
`.trim()
export const Types: React.FC<unknown> = () => (
  <code className="language-jsx" dangerouslySetInnerHTML={{ __html }} />
)
