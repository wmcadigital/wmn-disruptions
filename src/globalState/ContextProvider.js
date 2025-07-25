import React from 'react';
// Import your provider here
import {
  AutoCompleteProvider,
  FetchDisruptionsProvider,
  FavsProvider,
  ModeProvider,
  WhenProvider,
  DisruptionCoordinatesProvider,
  ShowDisruptedServicesProvider,
} from '.';
// Also add your provider with a self-closing tag to the contexts array on line 20
// By doing this, it allows the contexts to provided throughout the whole app without having to wrap components in lots of providers. We just have on central provider around the whole app called contextProvider which nests all the other providers in.

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children,
  );
}

function ContextProvider(props) {
  const { children } = props || {};
  return (
    <ProviderComposer
      contexts={[
        <AutoCompleteProvider />,
        <FavsProvider />,
        <FetchDisruptionsProvider />,
        <ModeProvider />,
        <WhenProvider />,
        <DisruptionCoordinatesProvider />,
        <ShowDisruptedServicesProvider />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
}

export default ContextProvider;
