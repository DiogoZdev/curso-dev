import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";
import { Card } from "components/card";

async function fetchStatus() {
  const res = await fetch("/api/v1/status");
  const jsonReponse = await res.json();
  return jsonReponse;
}

function StatusPage() {
  const { data } = useQuery({
    queryKey: ["status"],
    queryFn: fetchStatus,
    refetchInterval: 5000,
  });

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .page {
          background-color: #f5f5f5;
          padding: 2rem;
        }

        .cards_area {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2rem;
          padding: 2rem 0;
        }
      `}</style>

      <div className="page">

        <h1>System Status</h1>

        <div className="cards_area">
          <Card
            isOk={!!data?.updated_at}
            title="Updated At"
            text={new Date(data?.updated_at).toLocaleString("pt-BR")}
          />

          <Card
            isOk={!!data?.environment}
            title="Environment"
            text={data?.environment}
          />

          <Card
            isOk={!!data?.dependencies?.database?.postgres_version}
            title="Postgres Version"
            text={data?.dependencies?.database?.postgres_version}
          />

          <Card
            isOk={!!data?.dependencies?.database?.used_connections}
            title="Used Connections"
            text={data?.dependencies?.database?.used_connections}
          />

          <Card
            isOk={!!data?.dependencies?.database?.max_connections}
            title="Max Connections"
            text={data?.dependencies?.database?.max_connections}
          />
        </div>
      </div>
    </>
  );
}

export default function Status() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusPage />
    </QueryClientProvider>
  );
}
