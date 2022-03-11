import { PrinterOutlined } from "@ant-design/icons";
import { Alert, Button, Card, DatePicker, Divider, Form, message } from "antd";
import FileSaver from "file-saver";
import Moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import services from "../services";
import Layout from "../src/components/Layout";

const FormTMTPengangkatanPertama = ({ initialValues }) => {
  const queryClient = useQueryClient();
  const updateMutation = useMutation((data) => services.updateResume(data), {
    onSuccess: () => {
      message.success("Data perbaikan pengangkatan pertama berhasil disimpan");
      queryClient.invalidateQueries("resume");
    },
    onError: () => {
      message.error("Data gagal disimpan");
    },
  });

  const handleSubmit = (data) => {
    const currentValues = {
      tmt_pengangkatan_pertama: data["tmt_pengangkatan_pertama"]
        ? data["tmt_pengangkatan_pertama"]
        : null,
    };

    updateMutation.mutateAsync(currentValues);
  };
  const [form] = Form.useForm();

  return (
    <>
      <Alert
        type="warning"
        message="Perhatian"
        description="Silahkan merubah data untuk TMT Pengangkatan pertama jika tmt pengangkatan pertama pada cetak masih kosong"
      />
      <Form
        name="update-data"
        initialValues={initialValues}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="tmt_pengangkatan_pertama"
          extra="TMT Pengangkatan Pertama dalam JPTP"
          label="TMT Pengangkatan Pertama"
        >
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Rubah</Button>
        </Form.Item>
      </Form>
    </>
  );
};

const ResumeTerkirim = ({ dataResume }) => {
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
      <FormTMTPengangkatanPertama
        initialValues={{
          tmt_pengangkatan_pertama: dataResume?.tmt_pengangkatan_pertama
            ? Moment(dataResume?.tmt_pengangkatan_pertama)
            : "",
        }}
      />

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
          <ResumeTerkirim dataResume={dataResume} />
        ) : (
          <ResumeTakTerkirim />
        )}
      </Card>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;
