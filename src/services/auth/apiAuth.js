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

export async function apiAddUser(formData) {
  const { data, error } = await supabase.from("tblusers").insert(formData);

  if (error) {
    throw new Error("Could not create user");
  }
  return data;
}

export async function apiAllUsers() {
  let { data, error } = await supabase.from("tblusers").select("*");

  if (error) {
    throw new Error(error);
  }

  return data;
}

export async function delUser(id) {
  const { data, error } = await supabase.from("tblusers").delete().eq("id", id);

  if (error) {
    throw new Error("Could not delete user");
  }

  return data;
}

export async function updateAUser(formData) {
  const { data, error } = await supabase
    .from("tblusers")
    .update(formData)
    .eq("id", formData.id);

  if (error) {
    throw new Error(error);
  }

  return data;
}
