import supabase from "../supabase";

export async function apiArchive() {
  let { data, error } = await supabase.from("tblarchive").select("*");

  if (error) {
    throw new Error(error);
  }

  return data;
}

export async function delArchive(id) {
  const { data, error } = await supabase
    .from("tblarchive")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Could not delete archieve");
  }

  return data;
}

export async function addArchive(formData) {
  const { data, error } = await supabase.from("tblarchive").insert(formData);

  if (error) {
    throw new Error("Could not create archive");
  }
  return data;
}
