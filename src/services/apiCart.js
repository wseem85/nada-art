import supabase from "./supabase";
export async function getUserCart(id) {
  let query = supabase.from("carts").select("*").eq("user_id", id);

  const { data: cart, error } = await query;
  if (error) {
    console.error(error.message);
    throw new Error("Can not Read Images data");
  }

  return cart;
}

export async function addProductToCart(newProduct) {
  let query = supabase.from("carts").insert([newProduct]);

  const { data, error } = await query.select();
  if (error) {
    console.error(error);
    throw new Error("Could not EAdd Product to cart  ");
  }

  return data;
  // return null;
}
export async function deleteProductFromCart(id) {
  console.log("hello");
  const { error } = await supabase.from("carts").delete().eq("image_id", id);
  if (error) {
    console.error(error);
    throw new Error("Error Deleting Product");
  }
  return null;
}
