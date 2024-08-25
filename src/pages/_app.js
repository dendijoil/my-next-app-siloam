import "@styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthenticated(true);
    } else if (router.pathname !== "/") {
      router.push("/");
    }
  }, [router.pathname]);

  if (router.pathname === "/") {
    return <Component {...pageProps} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <Component {...pageProps} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
