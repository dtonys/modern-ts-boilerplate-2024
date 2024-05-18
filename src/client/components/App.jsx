import React, { useState, useEffect } from 'react';

import { CssBaseline } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  /*
  palette: {
    mode: 'light'
    primary: {
      main: '#FFF'
    },
    secondary: {
      main: '#000'
    }
  },
  components: {
    MuiTextField: {
        defaultProps: {
            color: 'secondary'
        }
    }
  }
*/
});

const pathToComponent = {
  '/': 'LogIn',
  '/login': 'LogIn',
  '/signup': 'SignUp',
};

function App() {
  const [state, setState] = useState({
    currentPath: window.location.pathname,
    PageComponent: null,
  });

  useEffect(() => {
    // After history navigation forward or back, write new path to state to force re-render
    const onLocationChange = async () => {
      console.log('onLocationChange');
      const componentPath = pathToComponent[window.location.pathname];
      console.log(componentPath);
      const component = await import(`client/pages/${componentPath}.jsx`);
      setState((currentState) => ({
        ...currentState,
        currentPath: window.location.pathname,
        PageComponent: component.default,
      }));
    };
    window.addEventListener('popstate', onLocationChange);
    onLocationChange();
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {state.PageComponent && <state.PageComponent />}
    </ThemeProvider>
  );
}

export default App;
