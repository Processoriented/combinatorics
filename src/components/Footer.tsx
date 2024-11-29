import { Layout } from "antd";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Layout.Footer>
      <p>&copy; {year} - Vincent Engler</p>
    </Layout.Footer>
  );
}
