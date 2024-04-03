// AppBarMenuのDrawer表示をログインしているか否かで変更するためのtemplate

import AppBarMenu from "@/app/AppBarMenu";
import { createClient } from "@/utils/supabase/server";
import Container from "@mui/material/Container";

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
  const maxWidth = "md";

  return (
    <div>
      <AppBarMenu isLoggedIn={isLoggedIn} toolBarMaxWidth={maxWidth} />
      <Container maxWidth={maxWidth}>
        <div>{children}</div>
      </Container>
    </div>
  );
}
