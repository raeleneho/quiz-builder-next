import { createContext, useContext, useState } from 'react';

interface ResponseContextData {
  response?: Record<string, any> | null;
  setResponse: (formData: Record<string, any>) => void;
}

const ResponseContext = createContext<ResponseContextData | null>(null);

export const useResponseContext = () => {
  const responseContext = useContext(ResponseContext);
  return responseContext;
};

export const LocalResponseProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [response, setResponse] = useState({});

  return (
    <ResponseContext.Provider
      value={{
        response,
        setResponse,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export const ServerResponseProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [response, setResponse] = useState({});

  return (
    <ResponseContext.Provider
      value={{
        response,
        setResponse,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};
