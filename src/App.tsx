import { useCallback, useState } from "react";

import { Layout } from "antd";

import Nav from './components/Nav';
import Basics from "./pages/Basics";
import Home from "./pages/Home";
import Ideas from "./pages/Ideas";
import Partition from "./pages/Partition";
import Footer from "./components/Footer";

import { getFromLocalStorage, saveToLocalStorage } from "./services/localStorage";

import "./App.css";

interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

type MenuClickEventHandler = (info: MenuInfo) => void;

const STORAGE_KEY = "menuSelection";

function App() {
  const [menuSelection, setMenuSelection] = useState(getFromLocalStorage(STORAGE_KEY) ?? "0");

  const handleMenuSelection: MenuClickEventHandler = useCallback(({ key }) => {
    setMenuSelection(key);
    saveToLocalStorage(STORAGE_KEY, key);
  }, []);

  return (
    <Layout>
      <Layout.Header>
        <Nav menuSelection={menuSelection} handleMenuSelection={handleMenuSelection} />
      </Layout.Header>
      <Layout.Content className="main-content">
        {menuSelection === "0" && <Home />}
        {menuSelection === "1" && <Basics />}
        {menuSelection === "2" && <Partition />}
        {menuSelection === "3" && <Ideas />}
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default App;
