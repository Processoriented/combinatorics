import { Menu, MenuProps } from 'antd';

interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

type MenuClickEventHandler = (info: MenuInfo) => void;
type MenuItem = Required<MenuProps>["items"][number];

type NavProps = {
  menuSelection: string;
  handleMenuSelection: MenuClickEventHandler;
}

const menuItems: MenuItem[] = [
  { key: "0", label: "Home" },
  { key: "1", label: "Basics" },
  { key: "2", label: "Partition" },
  { key: "3", label: "Ideas" },
];

export default function Nav(props: NavProps) {
  const { menuSelection, handleMenuSelection } = props;

  return (
    <Menu
      className="main-menu"
      theme="light"
      mode="horizontal"
      selectedKeys={[menuSelection]}
      onClick={handleMenuSelection}
      items={menuItems}
    />
  );
}
