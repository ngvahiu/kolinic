import { Button, Form, Input, Tag, Upload } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Heading from '../../ui/Heading/Heading';
import MyButton from '../../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createServiceAction, getServiceAction, updateServiceAction } from '../../redux/service.slice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;

function ServiceAction() {
  const [logoUrl, setLogoUrl] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [serviceInfo, setServiceInfo] = useState({
    name: "",
    description: "",
    benefits: "",
    functions: [],
    logo: null,
    img: null
  });
  const [func, setFunc] = useState('');
  const [form] = Form.useForm();
  let { id } = useParams();
  const { isCreating, isUpdating, service } = useSelector(state => state.service);
  const dispatch = useDispatch();

  useEffect(function () {
    if (id) dispatch(getServiceAction(id));
    else {
      form.setFieldsValue({
        name: "",
        description: "",
        benefits: "",
        logo: null,
        img: null
      });
      setServiceInfo({
        name: "",
        description: "",
        benefits: "",
        functions: [],
        logo: null,
        img: null
      });
      setLogoUrl(null);
      setImageUrl(null);
    }
  }, [dispatch, id])

  useEffect(function () {
    if (service && id) {
      form.setFieldsValue({
        name: service.name,
        description: service.description,
        benefits: service.benefits,
      });
      setServiceInfo(serviceInfo => ({ ...serviceInfo, functions: service.functions.split('/') }))
      setLogoUrl(service.logo);
      setImageUrl(service.img);
    }
  }, [service, id])


  const getBase64 = useCallback((img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }, []);

  function handleUploadLogo(info) {
    getBase64(info.file, (url) => {
      setLogoUrl(url);
      setServiceInfo({ ...serviceInfo, logo: info.file });
    });
  }

  function handleUploadImage(info) {
    getBase64(info.file, (url) => {
      setImageUrl(url);
      setServiceInfo({ ...serviceInfo, img: info.file });
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const fieldErrors = form.getFieldsError();
    const fieldValues = form.getFieldsValue();
    if (serviceInfo.functions.length === 0) {
      toast.error("Functions must not be empty", {
        position: 'top-right'
      });
      return;
    }
    if (!id && fieldErrors.every(fieldError => fieldError.errors.length === 0) && Object.keys(fieldValues).every(key => !!fieldValues[key])) {
      dispatch(createServiceAction({
        body: {
          name: fieldValues.name,
          description: fieldValues.description,
          benefits: fieldValues.benefits,
          functions: serviceInfo.functions.join('/')
        },
        logo: serviceInfo.logo,
        img: serviceInfo.img
      }));
      form.setFieldsValue({
        name: "",
        description: "",
        benefits: "",
        logo: null,
        img: null
      });
      setServiceInfo({ ...serviceInfo, functions: [], logo: null, img: null });
      setLogoUrl(null);
      setImageUrl(null);
    } else if (id && fieldErrors.every(fieldError => fieldError.errors.length === 0)) {
      dispatch(updateServiceAction({
        id,
        body: {
          name: fieldValues.name,
          description: fieldValues.description,
          benefits: fieldValues.benefits,
          functions: serviceInfo.functions.join('/')
        },
        logo: serviceInfo.logo,
        img: serviceInfo.img
      }))
      form.setFieldsValue({
        name: "",
        description: "",
        benefits: "",
        logo: null,
        img: null
      });
      setServiceInfo({ ...serviceInfo, functions: [], logo: null, service: null });
      setLogoUrl(null);
      setImageUrl(null);
    }
  }

  return (
    <div>
      <Heading title={id ? `SERVICE #${id}` : "CREATE SERVICE"} textAlign='left' size='small' />
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        form={form}
        initialValues={serviceInfo}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Service's name required"
            }
          ]}
          label="Service's name"
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Description required"
            }
          ]}
          label="Description"
          wrapperCol={{ span: 24 }}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="benefits"
          rules={[
            {
              required: true,
              message: "Benefits required"
            }
          ]}
          label="Benefits"
          wrapperCol={{ span: 24 }}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Functions required"
            }
          ]}
          label="Functions"
          wrapperCol={{ span: 24 }}
        >
          <div className='flex gap-[1rem]'>
            <Input value={func} onChange={(e) => setFunc(e.target.value)} />
            <Button
              onClick={() => {
                if (func !== '') {
                  setServiceInfo({ ...serviceInfo, functions: [...serviceInfo.functions, func] });
                  setFunc('');
                }
              }}
              htmlType='button'
            >
              Add
            </Button>
          </div>
          <div className='mt-[1rem]'>
            {
              serviceInfo.functions.map((func, index) => <Tag
                color='geekblue'
                key={index}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  const newFunctions = [...serviceInfo.functions];
                  newFunctions.splice(index, 1);
                  setServiceInfo({ ...serviceInfo, functions: newFunctions });
                }}
              >
                {func}
              </Tag>)
            }
          </div>
        </Form.Item>
        <Form.Item
          name="logo"
          label="Logo"
          rules={[
            {
              required: id ? false : true,
              message: "Logo required"
            }
          ]}
        >
          <Upload listType='picture-card' maxCount={1} showUploadList={false} customRequest={handleUploadLogo}>
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
            </button>
          </Upload>
          {logoUrl && <div className='w-[90px] h-[90px] flex items-center justify-center bg-[--color-grey-900] mt-[10px]'>
            <img src={logoUrl} alt='logo' className='w-[80px] h-[80px]' />
          </div>
          }
        </Form.Item>
        <Form.Item
          name="img"
          label="Image"
          rules={[
            {
              required: id ? false : true,
              message: "Image required"
            }
          ]}
        >
          <Upload listType='picture-card' maxCount={1} showUploadList={false} customRequest={handleUploadImage}>
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
            </button>
          </Upload>
          {imageUrl && <img src={imageUrl} alt='img' className='w-[300px] h-[300px] mt-[10px]' />}
        </Form.Item>
        <Form.Item className='text-center'>
          <MyButton text={id ? "Update" : "Create"} btnType='submit' disabled={isCreating || isUpdating} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default ServiceAction