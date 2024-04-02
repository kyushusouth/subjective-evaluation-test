import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createClient } from "@/utils/supabase/server";
import { fetchSexItemList } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";

export default async function Info() {
  const supabase = createClient();
  const sexItemList = await fetchSexItemList();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) {
    redirect("/login");
  }

  async function createInfo(formData: FormData) {
    "use server";

    const rawFormData = {
      age: Number(formData.get("age")),
      sex: String(formData.get("sex")),
    };

    try {
      await prisma.respondents.update({
        where: {
          auth_id: user?.id,
        },
        data: {
          age: rawFormData.age,
          sex: rawFormData.sex,
        },
      });
    } catch (error) {
      throw new Error("Failed to submit.");
    }
    redirect("/");
  }

  return (
    <Box
      sx={{
        my: 10,
      }}
    >
      <form action={createInfo}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField label="age" variant="outlined" size="medium" name="age" />
          <FormControl fullWidth>
            <InputLabel id="sex-label">Age</InputLabel>
            <Select labelId="sex-label" label="sex" name="sex">
              {sexItemList.map((sexItem) => (
                <MenuItem key={sexItem.id} value={sexItem.item}>
                  {sexItem.item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" size="medium" type="submit">
            提出する
          </Button>
        </Container>
      </form>
    </Box>
  );
}
