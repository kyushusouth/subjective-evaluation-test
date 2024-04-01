import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const userId = user.id;
  const userEmail = user.email;

  return (
    <div>
      <div>{userId}</div>
      <div>{userEmail}</div>
      <AuthButton />
    </div>
  );
}
