---
layout: default
nav_title: Home
show_in_navbar: true
order: 1
custom_css: home
---

<div class="homegrid">
{% for link in site.data.home_links %}
  <div class="homelink">
    <a href="{{ link.link }}" rel="{{ link.rel }}">
      <img src="/assets/icons/{{ link.icon }}.svg" />
      <p>{{ link.name }}</p>
    </a>
  </div>
{% endfor %}
</div>
