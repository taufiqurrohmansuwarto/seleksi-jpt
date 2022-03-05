import { Button, Card } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../src/components/Layout";

const Dashboard = () => {
  const { data } = useSession();
  const router = useRouter();

  return (
    <Layout title="Dashboard">
      <Card>
        <div>
          Halo, {data?.user?.name}, Berikut adalah portal untuk melakukan
          pendaftaran seleksi JPT di Pemprov Jatim.
        </div>
        <div>Silahkan klik tombol di bawah ini untuk melakukan pendaftaran</div>
        <Button type="primary" onClick={() => router.push("/resume")}>
          Daftar
        </Button>
      </Card>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;
