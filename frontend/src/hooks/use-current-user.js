import { useQuery } from "react-query";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/user";

const fetchUser = async () => {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("session")}`,
    },
  });

  const response = await res.json();
  return response.user;
};

export const useCurrentUser = () => {
  const session = Cookies.get("session");
  const res = useQuery({
    queryFn: fetchUser,
    queryKey: ["currentUser", session],
    enabled: !!session,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return res;
};
