import { useRouter } from "next/router";

import { useEffect } from "react";

import axios from "axios";

function Signout() {
  const router = useRouter();
  useEffect(async () => {
    await axios.post("/api/users/signout");
    router.push("/");
  }, []);

  return <div>Signing you out</div>;
}

export default Signout;
