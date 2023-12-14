<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you already have an Angular app using `@angular/material` and have just set up **Storybook >= 7.0** using the [getting started guide](/docs/get-started/install).
Don't have this? Follow the Angular material [setup instructions](https://material.angular.io/guide/getting-started) then run:


```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

### 1. Bundle fonts and icons for better perf

`@angular/material` depends on two fonts to render as intended, Google’s [`Roboto`](https://fonts.google.com/specimen/Roboto) and [`Material Icons`](https://fonts.google.com/icons?query=Christian+Robertson&icon.style=Outlined&icon.set=Material+Icons). While you can load these fonts directly from the Google Fonts CDN, bundling fonts with Storybook is better for performance.

- 🏎️ **Fonts load faster** because they are coming from the same place as your app
- ✈️ **Font will load offline** so you can continue developing your stories anywhere
- 📸 **No more inconsistent snapshot tests** because fonts load instantly

To get started, install the fonts as dependencies.

```bash
yarn add @fontsource/roboto @fontsource/material-icons
```

Then include the fonts in your `angular.json` file.

```json
// angular.json
{
  // Snipped for brevity
  "storybook": {
    "builder": "@storybook/angular:start-storybook",
    "options": {
      "configDir": ".storybook",
      "browserTarget": "angular-latest:build",
      "compodoc": true,
      "compodocArgs": ["-e", "json", "-d", "."],
      "port": 6006,
      "styles": [
        "@angular/material/prebuilt-themes/indigo-pink.css",
        "@fontsource/roboto/300.css",
        "@fontsource/roboto/400.css",
        "@fontsource/roboto/500.css",
        "@fontsource/roboto/700.css",
        "@fontsource/material-icons",
        "src/styles.scss"
      ]
    }
  },
  "build-storybook": {
    "builder": "@storybook/angular:build-storybook",
    "options": {
      "configDir": ".storybook",
      "browserTarget": "angular-latest:build",
      "compodoc": true,
      "compodocArgs": ["-e", "json", "-d", "."],
      "styles": [
        "@angular/material/prebuilt-themes/indigo-pink.css",
        "@fontsource/roboto/300.css",
        "@fontsource/roboto/400.css",
        "@fontsource/roboto/500.css",
        "@fontsource/roboto/700.css",
        "@fontsource/material-icons",
        "src/styles.scss"
      ],
      "outputDir": "storybook-static"
    }
  }
}
```
## 2. Add Storybook stories
### Standalone component
Now that you have Storybook set up, you can start writing stories for your components. Let's start with a `NavBarComponent`.
For **Standalone components**, any Material components that you import through the `@Component` decorator will be available to your component in Storybook.

```ts
// src/app/nav-bar/nav-bar.component.ts
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span>{{pageTitle}}</span>
    </mat-toolbar>
  `,
  styles: ``,
})
export class NavBarComponent {
  @Input()
  pageTitle?: string;
}
```

This means that you can just supply the `NavBarComponent` to the `component` property of the `Meta` object in your stories file.

```ts
// src/app/nav-bar/nav-bar.component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { NavBarComponent } from './nav-bar.component';

const meta: Meta<NavBarComponent> = {
  title: 'Toolbar',
  component: NavBarComponent,
};

export default meta;
type Story = StoryObj<NavBarComponent>;

export const Default: Story = {
  args: {
    pageTitle: 'Example Title',
  },
};
```

### Module component
For **Module components**, you will need to import the Material components that you want to use in your stories file. You can supply them to Storybook using the **`moduleMetadata`** decorator in the `Meta` object of the stories file.

```ts
// src/app/nav-bar/nav-bar.component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NavBarComponent } from './nav-bar.component';

const meta: Meta<NavBarComponent> = {
  title: 'Toolbar',
  decorators: [
    moduleMetadata({
      declarations: [NavBarComponent],
      imports: [MatToolbarModule, MatButtonModule, MatIconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<NavBarComponent>;

export const Default: Story = {
  args: {
    pageTitle: 'Example Title',
  },
  render: (args) => ({
    props: args,
    template: `
    <app-nav-bar pageTitle={{pageTitle}}>
    </app-nav-bar>
    `,
  }),
};
```
## Live example
<EmbeddedExample
  title="Storybook 7 & Angular Material Example"
  embeddedUrl="https://stackblitz.com/edit/github-rkffss?ctl=1&embed=1&file=src%2Fapp%2Fnav-bar%2Fnav-bar.component.stories.ts&hideNavigation=1&theme=light"
/>