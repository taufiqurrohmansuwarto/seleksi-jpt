import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Result,
  Select,
  Skeleton,
} from "antd";
import moment from "moment";
import { useEffect } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import services from "../services";
import Layout from "../src/components/Layout";

const NoData = ({ onSubmit, loading }) => {
  return (
    <Result
      status="warning"
      title="Sepertinya anda belum mengisi resume"
      extra={
        <Button type="primary" onClick={onSubmit} loading={loading}>
          Mulai Isi
        </Button>
      }
    />
  );
};

const FormProfile = ({ initialValues, refetch }) => {
  const [form] = Form.useForm();
  const queryClient = new QueryClient();

  const pendidikans = [
    "SD",
    "SLTP",
    "SLTA",
    "D-I",
    "D-II",
    "D-III",
    "D-IV",
    "S-1",
    "S-2",
    "S-3",
  ];

  useEffect(() => {}, [initialValues]);

  const updateMutation = useMutation((data) => services.updateResume(data), {
    onSuccess: async () => {
      message.success("Berhasil diupdate");
      refetch();
      await queryClient.invalidateQueries("resume");
    },
    onSettled: async () => {},
  });

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };

  const tailLayout = {
    wrapperCol: { offset: 2, span: 8 },
  };

  const handleFinish = async (fieldValue) => {
    const values = {
      ...fieldValue,
      tahun_lulus: parseInt(fieldValue["tahun_lulus"].format("YYYY"), 10),
    };
    await updateMutation.mutateAsync(values);
  };

  return (
    <Form
      labelWrap
      initialValues={initialValues}
      {...layout}
      onFinish={handleFinish}
      form={form}
      name="create-profile"
    >
      <Form.Item
        name="nama_gelar"
        label="Nama dan Gelar"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item rules={[{ required: true }]} name="nip" label="NIP">
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="tempat_lahir"
        label="Tempat Lahir"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="tanggal_lahir"
        label="Tanggal Lahir"
      >
        <DatePicker format={"YYYY-MM-DD"} />
      </Form.Item>
      <Form.Item rules={[{ required: true }]} name="alamat_email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="no_hp"
        label="No. Handphone"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="pendidikan_terakhir"
        label="Pendidikan Terakhir"
      >
        <Select allowClear showSearch>
          {pendidikans.map((d) => (
            <Select.Option key={d} value={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="tahun_lulus"
        label="Tahun Lulus"
      >
        <DatePicker picker="year" format={"YYYY"} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="gol_pangkat"
        label="Gol/Pangkat"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="tmt_pangkat"
        label="TMT Pangkat"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="jabatan_terakhir"
        label="Jabatan Terakhir"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="eselon_terakhir"
        label="Eselon Terakhir"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="tmt_jab_terakhir"
        label="TMT Jabatan Terakhir"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item rules={[{ required: true }]} name="instansi" label="Instansi">
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="tmt_pengangkatan_pertama"
        label="TMT Pengangkatan Pertama"
      >
        <DatePicker />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          htmlType="submit"
          loading={updateMutation.isLoading}
          type="primary"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const Resume = () => {
  const { data, isLoading, refetch } = useQuery(["resume"], () =>
    services.getResume()
  );
  const queryClient = new QueryClient();

  const createMutation = useMutation(() => services.createResume(), {
    onSettled: async () => {
      await queryClient.invalidateQueries("resume");
    },
  });

  const handleSubmit = async () => {
    await createMutation.mutateAsync();
  };

  return (
    <Layout title="Resume">
      <Skeleton active loading={isLoading}>
        {data ? (
          <FormProfile
            refetch={refetch}
            initialValues={{
              ...data,
              tanggal_lahir: data?.tanggal_lahir
                ? moment(data?.tanggal_lahir)
                : "",
              tmt_pangkat: data?.tmt_pangkat ? moment(data?.tmt_pangkat) : "",
              tmt_jab_terakhir: data?.tmt_jab_terakhir
                ? moment(data?.tmt_jab_terakhir)
                : "",
              tmt_pengangkatan_pertama: data?.tmt_pengangkatan_pertama
                ? moment(data?.tmt_pengangkatan_pertama)
                : "",
            }}
            queryClient={queryClient}
          />
        ) : (
          <NoData onSubmit={handleSubmit} loading={createMutation.isLoading} />
        )}
      </Skeleton>
    </Layout>
  );
};

Resume.auth = true;

export default Resume;
