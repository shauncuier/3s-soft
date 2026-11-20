/**
 * Inline loader for /assets/site.js. It adds the script only after the page has loaded, so the
 * script never shares a task with the first layout and never delays first paint. Until then the
 * page is fully readable and its forms still post straight to Formspree.
 * The script path comes from the tag's data-src (the build appends a ?v= version to it).
 */
export const SITE_LOADER =
  "(function(t){function go(){setTimeout(function(){var s=document.createElement('script');s.src=t.getAttribute('data-src');document.body.appendChild(s)},0)}" +
  "if(document.readyState==='complete')go();else addEventListener('load',go)})(document.currentScript)"
