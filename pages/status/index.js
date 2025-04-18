import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

async function fetchStatus() {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const jsonReponse = await res.json();
  return jsonReponse;
}

function StatusPage() {
  const { data } = useQuery({
    queryKey: ["status"],
    queryFn: fetchStatus
  });

  return (
    <div>
      <p>Updated At: {data?.updated_at}</p>
      <p>Environment: {data?.environment}</p>
      <p>
        Postgres Version: {data?.dependencies?.database?.postgres_version}
      </p>
      <p>
        Used Connections: {data?.dependencies?.database?.used_connections}
      </p>
      <p>
        Max Connections: {data?.dependencies?.database?.max_connections}
      </p>
    </div>
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
