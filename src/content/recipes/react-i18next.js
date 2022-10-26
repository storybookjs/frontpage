module.exports = {
  icon: '',
  displayName: 'React i18next',
  name: 'react-i18next',
  description: 'Internationalization support for Storybook with toolbar locale toggle',
  authors: [
    {
      id: '0',
      name: 'Shaun Lloyd',
      avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
    },
  ],
  addons: [
    {
      id: '0',
      displayName: 'Storybook i18next Addon',
      icon: 'https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png',
      name: 'storybook-i18next',
      description: 'Add i18next support to Storybook',
      weeklyDownloads: 2200,
      authors: [
        {
          id: '0',
          name: 'stevensacks',
          avatarUrl: '//www.gravatar.com/avatar/197db09f30ae36cc201006eb1deeb4b5',
        },
      ],
    },
    {
      id: '1',
      displayName: 'Storybook react-i18next addon',
      icon: 'https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png',
      name: 'storybook-react-i18next',
      description: 'Add react-i18next support to Storybook',
      weeklyDownloads: 70700,
      authors: [
        {
          id: '0',
          name: 'stevensacks',
          avatarUrl: '//www.gravatar.com/avatar/197db09f30ae36cc201006eb1deeb4b5',
        },
      ],
    },
  ],
  readme: `<h2 id="recipe-section">How to use React i18next with Storybook</h2><p>Most developers use <a href="https://www.i18next.com/"><code>i18next</code></a>, a popular JavaScript library that lets apps define separate files for each supported locale. It detects a user’s language preferences and region, and only loads the detected locale.</p><p>Instead of being passed to components as inputs, the locale is shared globally through context. Let’s use i18next to extend Storybook with a locale switcher in the toolbar to choose which locale is shared with your components.</p><p>Follow along using the <a href="https://github.com/i18next/react-i18next/tree/master/example/storybook">code examples</a> in the i18next-react GitHub repository.</p><figure class="kg-card kg-image-card"><img src="https://storybookblog.ghost.io/content/images/2022/09/finished-switcher.gif" class="kg-image" alt="Switching locale between English, German, and Arabic in Storybook" loading="lazy" width="2000" height="1803" srcset="https://storybookblog.ghost.io/content/images/size/w600/2022/09/finished-switcher.gif 600w, https://storybookblog.ghost.io/content/images/size/w1000/2022/09/finished-switcher.gif 1000w, https://storybookblog.ghost.io/content/images/size/w1600/2022/09/finished-switcher.gif 1600w, https://storybookblog.ghost.io/content/images/2022/09/finished-switcher.gif 2068w" sizes="(min-width: 720px) 720px"></figure><h3 id="prerequisites">Prerequisites</h3><p>Before we begin, ensure that you have a working React app using <code><a href="https://github.com/i18next/react-i18next">i18next-react</a></code> which is set up with Storybook 6.0 or newer. If you need resources to set these up, I’ve included some recommendations below:</p><ul><li><a href="https://react.i18next.com/getting-started">Setting up i18next-react</a></li><li><a href="https://react.i18next.com/latest/using-with-hooks">Configure i18next language detector</a></li><li><a href="https://storybook.js.org/tutorials/intro-to-storybook/">Getting started with Storybook</a></li></ul><p>Or if you'd prefer a video, check out <strong>Chantastic's</strong> awesome video on adding i18next to your React app.</p><figure class="kg-card kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/sr0Pahym3VM?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Localize React with i18next in Storybook"></iframe></figure><h3 id="1-expose-i18next-to-storybook"> 1. Expose i18next to Storybook</h3><p>To make your translations available in your stories, you’ll first need to expose your i18next instance to Storybook. Here’s an example of an i18next instance from the <code>./src/i18n.js</code> file being used in my React app.</p><pre><code class="language-js">// src/i18n.js

import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
 
i18n
 .use(Backend) // lazy loads translations from /public/locales
 .use(LanguageDetector) // detect user language
 .init({
   fallbackLng: 'en',
   debug: true,
   interpolation: {
     escapeValue: false,
   },
 });
 
export default i18n;</code></pre><p>To expose this instance to Storybook, we can import it into the <code>./.storybook/preview.js</code> file where Storybook holds its shared story configurations.</p><pre><code class="language-js">// .storybook/preview.js
import i18n from '../src/i18n';</code></pre><h3 id="2-wrap-your-stories-with-the-i18next-provider">2. Wrap your stories with the i18next provider</h3><p>Now that Storybook has access to i18next, we need to share that with our stories. To do that we’re going to make a decorator to wrap our stories in.</p><pre><code class="language-jsx">// .storybook/preview.js
import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from '../src/i18n';
 
// Wrap your stories in the I18nextProvider component
const withI18next = (Story) =&gt; {
 return (
   // This catches the suspense from components not yet ready (still loading translations)
   // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
   &lt;Suspense fallback={&lt;div&gt;loading translations...&lt;/div&gt;}&gt;
     &lt;I18nextProvider i18n={i18n}&gt;
       &lt;Story /&gt;
     &lt;/I18nextProvider&gt;
   &lt;/Suspense&gt;
 );
};
 
// export decorators for storybook to wrap your stories in
export const decorators = [withI18next];</code></pre><p>Sweet! Our stories officially have access to our translations. If we change the <code>lng</code> defined in <code>./src/i18n.js</code> you’ll see your stories reload in the new language.</p><figure class="kg-card kg-image-card"><img src="https://storybookblog.ghost.io/content/images/2022/09/manual-change.gif" class="kg-image" alt="Manually changing the locale from English to French" loading="lazy" width="2000" height="1803" srcset="https://storybookblog.ghost.io/content/images/size/w600/2022/09/manual-change.gif 600w, https://storybookblog.ghost.io/content/images/size/w1000/2022/09/manual-change.gif 1000w, https://storybookblog.ghost.io/content/images/size/w1600/2022/09/manual-change.gif 1600w, https://storybookblog.ghost.io/content/images/2022/09/manual-change.gif 2068w" sizes="(min-width: 720px) 720px"></figure><h3 id="3-add-a-locale-switcher">3. Add a locale switcher</h3><p>Hardcoding your locale is annoying and won’t be helpful to anyone viewing your deployed Storybook, so let’s add a locale switcher to the Storybook toolbar. If you want to learn more about switchers, check out <strong>Yann Braga’s</strong> article on <a href="https://storybook.js.org/blog/how-to-add-a-theme-switcher-to-storybook/">adding a theme switcher</a>.</p><p>To do this, we can declare a global variable named <code>locale</code> in <code>.storybook/preview.js</code> and assign it to a list of supported languages to choose from.</p><pre><code class="language-js">// .storybook/preview.js

/* Snipped for brevity */
 
// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes = {
 locale: {
   name: 'Locale',
   description: 'Internationalization locale',
   toolbar: {
     icon: 'globe',
     items: [
       { value: 'en', title: 'English' },
       { value: 'de', title: 'Deutsch' },
     ],
     showName: true,
   },
 },
};
</code></pre><p>Looking back at Storybook, we can now see that we have a “Locale” switcher added to the toolbar with the options we just set.</p><figure class="kg-card kg-image-card"><img src="https://storybookblog.ghost.io/content/images/2022/09/Screen-Shot-2022-09-08-at-3.01.14-PM.png" class="kg-image" alt="The locale switcher in the Storybook toolbar" loading="lazy" width="834" height="356" srcset="https://storybookblog.ghost.io/content/images/size/w600/2022/09/Screen-Shot-2022-09-08-at-3.01.14-PM.png 600w, https://storybookblog.ghost.io/content/images/2022/09/Screen-Shot-2022-09-08-at-3.01.14-PM.png 834w" sizes="(min-width: 720px) 720px"></figure><p></p><p>Now let’s update our decorator to change our locale when we select a new language.</p><pre><code class="language-jsx">// .storybook/preview.js

/* Snipped for brevity */

const withI18next = (Story, context) =&gt; {
 const { locale } = context.globals;
 
 // When the locale global changes
 // Set the new locale in i18n
 useEffect(() =&gt; {
   i18n.changeLanguage(locale);
 }, [locale]);
 
 return (
   &lt;Suspense fallback={&lt;div&gt;loading translations...&lt;/div&gt;}&gt;
     &lt;I18nextProvider i18n={i18n}&gt;
       &lt;Story /&gt;
     &lt;/I18nextProvider&gt;
   &lt;/Suspense&gt;
 );
};
</code></pre><p>Voila— a fully functioning locale switcher for your stories powered by i18next-react!</p><figure class="kg-card kg-image-card"><img src="https://storybookblog.ghost.io/content/images/2022/09/en-to-de.gif" class="kg-image" alt="Switching between English and German using the locale switcher" loading="lazy" width="2000" height="1803" srcset="https://storybookblog.ghost.io/content/images/size/w600/2022/09/en-to-de.gif 600w, https://storybookblog.ghost.io/content/images/size/w1000/2022/09/en-to-de.gif 1000w, https://storybookblog.ghost.io/content/images/size/w1600/2022/09/en-to-de.gif 1600w, https://storybookblog.ghost.io/content/images/2022/09/en-to-de.gif 2068w" sizes="(min-width: 720px) 720px"></figure><p></p><h3 id="4-set-document-direction">4. Set document direction</h3><p>Some languages are not read from left to right like English is. Arabic, for example, is read from right to left. HTML has built-in support for this with the <code>dir</code> attribute.</p><p>First of all, let's add Arabic as an option in our locale switcher by adding an object into the items array of our globalTypes.</p><pre><code class="language-js">// .storybook/preview.js

/* Snipped for brevity */
 
// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes = {
 locale: {
   name: 'Locale',
   description: 'Internationalization locale',
   toolbar: {
     icon: 'globe',
     items: [
       { value: 'en', title: 'English' },
       { value: 'de', title: 'Deutsch' },
       { value: 'ar', title: 'عربي' },
     ],
     showName: true,
   },
 },
};</code></pre><p>Using i18next’s <code>dir(lng)</code> function and <code>languageChanged</code> event, we can set the document direction for the selected locale.</p><pre><code class="language-js">// .storybook/preview.js
 
/* Snipped for brevity */
 
// When The language changes, set the document direction
i18n.on('languageChanged', (locale) =&gt; {
 const direction = i18n.dir(locale);
 document.dir = direction;
});
</code></pre><p>Now when we set our storybook to Arabic, the document direction gets set to <code>”rtl”</code> 🎉</p><figure class="kg-card kg-image-card"><img src="https://storybookblog.ghost.io/content/images/2022/09/finished-switcher-1.gif" class="kg-image" alt="Switching between English, German, and Arabic with the locale switcher" loading="lazy" width="2000" height="1803" srcset="https://storybookblog.ghost.io/content/images/size/w600/2022/09/finished-switcher-1.gif 600w, https://storybookblog.ghost.io/content/images/size/w1000/2022/09/finished-switcher-1.gif 1000w, https://storybookblog.ghost.io/content/images/size/w1600/2022/09/finished-switcher-1.gif 1600w, https://storybookblog.ghost.io/content/images/2022/09/finished-switcher-1.gif 2068w" sizes="(min-width: 720px) 720px"></figure>`,
};
