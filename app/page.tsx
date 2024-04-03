import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SubmitButton from "@/app/login/submit-button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) {
    redirect("/login");
  }

  const signOut = async () => {
    "use server";

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography variant="h2">実験について</Typography>
        <Typography variant="body1">
          この度はお忙しい中ご協力いただき、誠にありがとうございます。
          <br />
          以下、実験内容の説明になりますので、ご確認の程よろしくお願い致します。
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h3">実施内容</Typography>
            <List>
              <ListItemText primary="性別・年齢の回答" />
              <ListItemText primary="練習試行" />
              <ListItemText primary="本番試行" />
            </List>
          </Box>
          <Box>
            <Typography variant="h4">性別・年齢の回答</Typography>
            <Typography variant="body1">
              性別・年齢の回答をいただき、研究での統計処理に用います。
              <br />
              学会発表や論文執筆等でデータを使用させていただきますが、個人を特定するような処理は一切行いませんので、ご協力の程よろしくお願い致します。
              <br />
              右上のメニューアイコンから、「性別・年齢」をクリックすることで回答ページにアクセス頂けます。
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4">練習試行</Typography>
            <Typography variant="body1">
              練習試行は、本番試行の前に行なっていただく練習のための実験となります。
              <br />
              練習試行は何度行なっていただいても構いませんので、こちらを通して内容の把握をお願い致します。
              <br />
              右上のメニューアイコンから、「練習試行」をクリックすることで回答ページにアクセス頂けます。
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4">本番試行</Typography>
            <Typography variant="body1">
              本番試行は、練習試行の後に行なっていただく本番の実験になります。
              <br />
              本番試行は一回しか行えませんので、ご注意ください。
              <br />
              右上のメニューアイコンから、「本番試行」をクリックすることで回答ページにアクセス頂けます。
              <br />
              ただし、練習試行を一度も行っていない状態ですとアクセスできないようになっていますので、ご注意ください。
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 5,
        }}
      >
        <form action={signOut}>
          <SubmitButton>ログアウト</SubmitButton>
        </form>
      </Box>
    </Container>
  );
}
