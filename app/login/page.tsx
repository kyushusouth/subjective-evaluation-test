import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import SubmitButton from "@/app/login/submit-button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      redirect("/login?message=Failed to authenticate.");
    }
    redirect("/");
  };

  return (
    <Box
      sx={{
        my: 10,
      }}
    >
      <form className="" action={signIn}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <TextField
            name="email"
            label="email"
            variant="outlined"
            size="medium"
            required
          />
          <TextField
            name="password"
            label="password"
            variant="outlined"
            size="medium"
            required
          />
          {searchParams?.message && (
            <Alert severity="warning" icon={false} sx={{ textAlign: "center" }}>
              認証に失敗しました。
              <br />
              正しいメールアドレスとパスワードの入力をお願い致します。
            </Alert>
          )}
          <SubmitButton>ログイン</SubmitButton>
        </Container>
      </form>
    </Box>
  );
}
