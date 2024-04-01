import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SubmitButton from "@/app/login/submit-button";
import Container from "@mui/material/Container";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const signOut = async () => {
    "use server";

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>
        <div>ようこそ {user.id}</div>

        <form action={signOut}>
          <SubmitButton>ログアウト</SubmitButton>
        </form>
      </Container>
    </div>
  );
}
