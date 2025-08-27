import { ThemeSwitcher } from "@/components/theme-switcher";
import { FormLayoutSwitcher } from "@/modules/form/ui/components/form-layout-switcher";

interface FormLayoutProps {
  children: React.ReactNode;
}

export const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-12 flex flex-none items-center">
        <div className="container mx-auto flex items-center justify-end px-4">
          <div className="flex items-center space-x-2">
            <FormLayoutSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <main className="flex w-full flex-grow overflow-hidden p-2.5 pt-0">
        {children}
      </main>
    </div>
  );
};
