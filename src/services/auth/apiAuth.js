import supabase from "../supabase";

export async function apiLogin(user) {
  let { data, error } = await supabase
    .from("tblusers")
    .select("*")
    .eq("username", user.username)
    .eq("upassword", user.password)
    .maybeSingle();

  if (error) {
    throw new Error(error);
  }

  return data;
}
