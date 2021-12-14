import { createContext } from "react";

interface IGlobalContext {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  navigation: boolean;
  setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<IGlobalContext>({
  title: "Home",
  setTitle: () => {},
  navigation: true,
  setShowNavigation: () => {},
});

export { IGlobalContext, GlobalContext };
