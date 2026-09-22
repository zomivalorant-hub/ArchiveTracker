import supabase from "../supabase";

export async function apiTravel() {
  let { data, error } = await supabase.from("tbltravel").select("*");

  if (error) {
    throw new Error(error);
  }

  return data;
}

export async function delTravel(id) {
  const { data, error } = await supabase
    .from("tbltravel")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Could not delete travel order");
  }

  return data;
}

export async function addATravel(formData) {
  const { data, error } = await supabase.from("tbltravel").insert(formData);

  if (error) {
    throw new Error("Could not create travel");
  }
  return data;
}
