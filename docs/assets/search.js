---
layout: none
---
window.TEXT_SEARCH_DATA = {
  docs: [
    {%- assign first_doc = true -%}
    {%- for page in site.pages -%}
      {%- if page.title and page.search != false and page.layout != "404" -%}
        {%- unless first_doc -%},{%- endunless -%}
        {
          title: {{ page.title | jsonify }},
          url: {{ page.url | relative_url | jsonify }},
          content: {{ page.content | markdownify | strip_html | strip_newlines | jsonify }}
        }
        {%- assign first_doc = false -%}
      {%- endif -%}
    {%- endfor -%}
  ],
  posts: []
};
