import supabase, { supabaseUrl } from "./supabase";
export async function getImages(filters) {
  let query = supabase.from("images").select("*");
  if (filters.categories) {
    query = query.in("category", filters.categories.split(","));
  }
  if (filters.availabilities) {
    for (const availability of filters.availabilities.split(",")) {
      if (availability === "Soldout") {
        query = query.eq("soldOut", true);
      }
      if (availability === "inStore") {
        query = query.eq("soldOut", false);
      }
    }
  }

  if (filters.maxPrice) query = query.lte("price", Number(filters.maxPrice));
  if (filters.sizes) {
    if (filters.sizes.includes(",")) {
      const splittedSizes = filters.sizes.split(",");
      query = query.in("dimenitions", splittedSizes);
    } else {
      const [width, height] = filters.sizes.split("*");
      query = query.eq("width", Number(width)).eq("height", Number(height));
    }
  }
  const { data: images, error } = await query;
  if (error) {
    console.error(error.message);
    throw new Error("Can not Read Images data");
  }
  return images;
}

export async function getImage(id) {
  let query = supabase.from("images").select("*").eq("id", id);

  const { data, error } = await query.single();
  if (error) {
    console.error(error.message);
    throw new Error("Can not Read Images data");
  }

  return data;
}
export async function getAllImages() {
  let query = supabase.from("images").select("*");

  const { data: allImages, error } = await query;
  if (error) {
    console.error(error.message);
    throw new Error("Can not Read Images data");
  }

  return allImages;
}

export async function editImage(newImage, id) {
  const hasImagePath = newImage.src?.startsWith?.(supabaseUrl);

  const imageName =
    typeof newImage.src === "string"
      ? newImage.src
      : `${Math.random()}-${newImage.title
          .replaceAll("/", "")
          .replaceAll(" ", "")}`;
  const imagePath = hasImagePath
    ? newImage.src
    : `${supabaseUrl}/storage/v1/object/public/originals/${imageName}`;
  console.log(imagePath);
  let query = supabase.from("images");
  if (!id) query = query.insert([{ ...newImage, src: imagePath }]);
  if (id) query = query.update({ ...newImage, src: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Could not Edit Image  ");
  }
  // console.log(data);
  if (hasImagePath) return data;
  // const { error: storageError } = await supabase.storage
  //   .from("originals")
  //   .upload(imageName, newImage.src);
  // if (storageError) {
  //   await supabase.from("images").delete().eq("id", data.id);
  //   throw new Error("Could not Upload file");
  // }
  // return data;
  return null;
}
export async function deleteImage(id) {
  const { error } = await supabase.from("images").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Error Deleting Picture");
  }
  return null;
}
