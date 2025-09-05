import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import {type Options} from './quartz/components/Explorer';

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/alaycock/quartz",
    },
  }),
}

const explorerOptions: Partial<Options> = {
  folderClickBehavior: 'collapse',
  sortFn: (a, b) => {
    if (a.isFolder && b.isFolder) {
      var ordering: Record<string, number> = { Posts: 0, Trips: 1, Lists: 2, Years: 3 };
      return (ordering[a.displayName] ?? 999) - (ordering[b.displayName] ?? 999);
    }

    if ((!a.isFolder && !b.isFolder)) {
      if (a.data?.date && b.data?.date) {
        const aDate = new Date(a.data.date);
        const bDate = new Date(b.data.date);
        aDate.setHours(0,0,0,0);
        bDate.setHours(0,0,0,0);
        const difference = bDate.getTime() - aDate.getTime();
        if (difference != 0) {
          return b.data?.date.getTime() - a.data?.date.getTime();
        }
      }
      
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }
 
    if (!a.isFolder && b.isFolder) {
      return 1
    } else {
      return -1
    }
  },
  filterFn: (node) => {
    if (node.isFolder) {
      return !['Routes'].includes(node.displayName);
    }
    return true;
  },
  order: ['sort', 'filter', 'map']
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false }),
    // Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        // { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(explorerOptions),
  ],
  right: [
    // Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta({ showReadingTime: false })],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(explorerOptions),
  ],
  right: [],
}
