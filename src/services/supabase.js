import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ipowdbuqcnnksefmhfzd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwb3dkYnVxY25ua3NlZm1oZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1OTAxNzgsImV4cCI6MjAyODE2NjE3OH0.rO4zvszk_v7-QdtRauKIWkWGIgNY4QILxCZCxgf6IU8";
const supabase = createClient(supabaseUrl, supabaseKey);
// const userId = "388dd01d-0709-4d01-8913-0569de94e395";
// async function createAdminUser() {
//   const { user, error } = await supabase.auth.signUp({
//     email: "engwseem4@gmail.com",
//     password: "qwerty9876",
//   });

//   if (error) {
//     console.error("Error creating admin user:", error.message);
//     return;
//   }

//   // Assign admin role to the new user (Note: This is a custom implementation and may vary)
//   await supabase
//     .from("user_roles")
//     .insert([{ user_id: user.id, role: "admin" }]);
// }

// // createAdminUser();
// const newData = {
//   display_name: "Admin",
//   is_superuser: true, // Update the superuser flag as needed
// };

// // Update the user's profile
// const { data, error } = await supabase.auth.updateUser({
//   id: userId,
//   data: newData,
// });

// if (error) {
//   console.error("Error updating user profile:", error.message);
// }

// console.log("User profile updated successfully:", data);
export default supabase;
