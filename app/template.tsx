import AppBarMenu from "@/app/AppBarMenu";
import { createClient } from "@/utils/supabase/server";

export default async function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = user !== null;

  return (
    <div>
      <AppBarMenu isLoggedIn={isLoggedIn} />
      <div>{children}</div>
    </div>
  );
}
