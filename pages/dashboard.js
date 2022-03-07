import { PrinterOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Divider, message } from "antd";
import FileSaver from "file-saver";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import services from "../services";
import Layout from "../src/components/Layout";

const ResumeTerkirim = () => {
  const [loading, setLoading] = useState(false);

  const handleCetak = async () => {
    setLoading(true);
    try {
      const result = await services.reportSubmit();
      FileSaver.saveAs(result?.data, "kartu-pendaftaran.pdf");
      setLoading(false);
    } catch (error) {
      message.error(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Divider />
      <Alert
        message="Pendaftaran Berhasil"
        description={
          <div>
            Selamat anda berhasil mengirimkan form seleksi JPT Madya Pemerintah
            Provinsi Jawa Timur, Silahkan menunggu pengumuman selanjutnya di{" "}
            <a>bkd.jatimprov.go.id</a>
          </div>
        }
        type="success"
        showIcon
      />
      <Divider />
      <Button
        icon={<PrinterOutlined />}
        loading={loading}
        onClick={handleCetak}
        type="primary"
      >
        Bukti Pendaftaran
      </Button>
    </>
  );
};

const ResumeTakTerkirim = () => {
  const router = useRouter();
  return (
    <>
      <div>Silahkan klik tombol di bawah ini untuk melakukan pendaftaran</div>
      <Button type="primary" onClick={() => router.push("/resume")}>
        Daftar
      </Button>
    </>
  );
};

const Dashboard = () => {
  const { data } = useSession();
  const { data: dataResume, isLoading } = useQuery(["resume"], () =>
    services.getResume()
  );

  return (
    <Layout title="Dashboard">
      <Card loading={isLoading}>
        <div>
          Halo, {data?.user?.name}, Berikut adalah portal untuk melakukan
          pendaftaran seleksi JPT Madya di Pemerintah Provinsi Jawa Timur.
        </div>
        {dataResume && dataResume?.is_submit ? (
          <ResumeTerkirim />
        ) : (
          <ResumeTakTerkirim />
        )}
      </Card>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;
