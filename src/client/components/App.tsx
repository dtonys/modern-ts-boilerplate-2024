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

interface StringMap {
  [key: string]: string;
}
const pathToComponent: StringMap = {
  '/': 'LogIn',
  '/login': 'LogIn',
  '/signup': 'SignUp',
};

interface DynamicImport {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: React.ComponentType<any>;
}

function App() {
  const [state, setState] = useState<{
    currentPath: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PageComponent: React.ComponentType<any> | null;
  }>({
    currentPath: window.location.pathname,
    PageComponent: null,
  });

  useEffect(() => {
    // After history navigation forward or back, write new path to state to force re-render
    const onLocationChange = async (): Promise<undefined> => {
      const componentPath = pathToComponent[window.location.pathname];
      console.log('onLocationChange');
      console.log(componentPath);
      const component = (await import(`client/pages/${componentPath}.jsx`)) as DynamicImport;
      setState((currentState) => ({
        ...currentState,
        currentPath: window.location.pathname,
        PageComponent: component?.default,
      }));
    };
    window.addEventListener('popstate', () => void onLocationChange());
    void onLocationChange();
    return () => window.removeEventListener('popstate', () => void onLocationChange());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {state.PageComponent && <state.PageComponent />}
    </ThemeProvider>
  );
}

export default App;
