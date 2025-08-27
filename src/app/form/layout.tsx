import { FormLayout } from "@/modules/form/ui/layouts/form-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <FormLayout>{children}</FormLayout>;
};

export default Layout;
