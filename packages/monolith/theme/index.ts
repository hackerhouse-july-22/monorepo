import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    cardBackground: "#0A0A0A",
    background: "url('/background.svg')",
    primaryFontColor: {
      darkMode: "gray.50",
    },
    secondaryFontColor: {
      darkMode: "gray.50",
    },
  },
  textStyles: {
    heading1: {
      fontWeight: "bold",
      fontSize: "36px",
    },
    heading2: {
      fontWeight: "bold",
      fontSize: "26px",
    },
    subheading2: {
      fontWeight: "normal",
      fontSize: "20px",
    },
    label1: {
      fontSize: "12px",
      color: "gray.500",
    },
  },
  styles: {
    global: {
      body: {
        color: "white",
        background: "background",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
  },
  components: {
    ModalContent: {
      baseStyle: {
        background: "gray.800",
      },
    },
    Container: {
      baseStyle: {
        maxWidth: 1200,
        px: 4,
        mx: "auto",
      },
    },
    Headings: {
      baseStyle: {
        color: "white",
      },
    },
    Link: {
      baseStyle: {
        textDecoration: "underline",
      },
    },
    Button: {
      baseStyle: {
        height: "32px",
      },
      variants: {
        outline: {
          _hover: {
            bgColor: "whiteAlpha.200",
          },
          _focused: {
            bgColor: "whiteAlpha.200",
          },
          _selected: {
            bgColor: "whiteAlpha.200",
          },
          _active: {
            bgColor: "whiteAlpha.200",
          },
        },
        primary: {
          background: "blue.200",
          color: "blue.800",
        },
        secondary: {
          background: "transparent",
          borderWidth: "1px",
          borderColor: "gray.700",
          _hover: {
            background: "gray.700",
          },
          color: "white",
        },
        text: {
          background: "transparent",
          color: "white",
        },
      },
    },
  },
});

export default theme;
