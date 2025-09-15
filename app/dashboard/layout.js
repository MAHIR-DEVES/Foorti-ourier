import DashboardLayout from "../components/DashboardLayout";

export default function DashboardPageLayout({ children }) {
  return (
    <DashboardLayout cz-shortcut-listen="true">{children}</DashboardLayout>
  );
}
