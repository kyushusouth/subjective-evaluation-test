import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import SubmitButton from "@/app/login/submit-button";
import Box from "@mui/material/Box";

export default function Login({
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
      redirect("/login?message=Could not authenticate user");
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
          <SubmitButton>ログイン</SubmitButton>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </Container>
      </form>
    </Box>
  );
}
