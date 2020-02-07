// Export * from  any context files in the globalState folder

// By adding them below, we don't have to import directly to the file like...
// import {WhenContext} from 'globalState/WhenContext';
// import {ModeContext} from 'globalState/ModeContext';

// Instead, by exporting them all below, we can now import by linking to this index.js file like...
// import {WhenContext, ModeContext} from 'globalState'
// Much easier! :)

// Don't forget to add the providers for each context to the ./ContextProvider.js file(more info inside there)

export * from './AutoCompleteContext';
export * from './FetchDisruptionsContext';
export * from './ModeContext';
export * from './WhenContext';
