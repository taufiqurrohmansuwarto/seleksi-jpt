import { Button, Form, Input, message, Result, Skeleton } from "antd";
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

  const handleFinish = async (value) => {
    if (value) {
      await updateMutation.mutateAsync(value);
    }
  };

  return (
    <Form
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
      {/* <Form.Item
        rules={[{ required: true }]}
        name="tanggal_lahir"
        label="Tanggal Lahir"
      >
        <Input />
      </Form.Item> */}
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
            initialValues={data}
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
