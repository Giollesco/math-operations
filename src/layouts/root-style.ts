import { Scheme } from "@mui-treasury/layout"

const scheme: Scheme = {
    header: {
      config: {
        xs: {
          position: "sticky",
          height: 56,
        },
      },
    },
    leftEdgeSidebar: {
      config: {
        xs: {
          variant: "persistent",
          persistentBehavior: "flexible",
          width: '0',

          collapsible: false,
          headerMagnetEnabled: false,
        },
        md: {
          variant: "persistent",
          persistentBehavior: "fit",
          width: 292,
          collapsible: true,
          collapsedWidth: 72,
          headerMagnetEnabled: false,
        },
      },
    },
}

const initialState = {
    leftEdgeSidebar: {
      open: true,
      collapsed: false,
    }
}

export { scheme, initialState }