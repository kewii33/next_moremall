import { clientSupabase } from "@/utils/supabase/client";

export const fetchUserData = async () => {
  const {
    data: { user },
  } = await clientSupabase.auth.getUser();
  if (user) {
    const { data: userData } = await clientSupabase
      .from("users")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (userData) return userData;
  }
  return null;
};
