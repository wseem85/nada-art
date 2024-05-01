import supabase from "./supabase";
import supabaseUrl from "./supabase";
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

export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  console.log(fileName);
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.error(storageError);
    throw new Error(`storageError:${storageError}`);
  }

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    console.error(`error2:${error2}`);
    throw new Error(error2.message);
  }
  return updatedUser;
}
