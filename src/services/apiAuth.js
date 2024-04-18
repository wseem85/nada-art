import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  //check if a user ic currently logged in from localstorage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  // if there is a user logged in get it from supabase
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  // console.log(user);
  return data?.user;
}

export async function logout() {
  const { isLoading, error } = await supabase.auth.signOut();
  if (error) throw new Error("there was a problem logging out ");
  return { isLoading };
}
