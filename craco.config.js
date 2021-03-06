const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#10BC83",
              "@link-color": "#10BC83",
              "@border-radius-base": "2px",
              "@form-vertical-label-padding": "0 0 1px",
              "@input-bg": "#E7E8E9",
              "@input-icon-color": "white",
              "@input-color": "black",
              "@input-placeholder-color": "grey",
              // "@select-dropdown-bg":"#E7E8E9",
              "@select-item-active-bg": "#10BC83",
              "@select-background": "#E7E8E9",
              "@table-bg": "#282C34",
              "@table-row-hover-bg": "#3fcaac30",
              "select-item-selected-color": "#10BC83",
              "@select-clear-background": "#E7E8E9",
              "@error-color": "#ff3939"
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
