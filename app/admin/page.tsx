import { fetchContent } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Profile editor — SmartWatt",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const [content, supabase] = await Promise.all([
    fetchContent(),
    createClient(),
  ]);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen">
      <AdminShell
        initial={content}
        loggedIn={!!user}
        userEmail={user?.email ?? ""}
      />
    </div>
  );
}
