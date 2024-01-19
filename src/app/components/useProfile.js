import { useEffect, useState } from "react";

export function useProfile() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setIsAdmin(data.admin);
        setIsLoading(false);
        setData(data);
      });
    });
  }, []);

  return { isLoading, isAdmin, data };
}
