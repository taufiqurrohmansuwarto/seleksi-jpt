import { useSession } from "next-auth/react";
import Layout from "../src/components/Layout";

const Dashboard = () => {
  const { data } = useSession();
  return (
    <Layout title="Dashboard">
      <div>{JSON.stringify(data)}</div>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;
