import React, { useCallback, useEffect, useState } from 'react'
import Heading from '../../ui/Heading/Heading'
import { Form, Input, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import MyButton from '../../ui/Button/Button';
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { createDrugCategoryAction, getDrugCategoryAction, updateDrugCategoryAction } from '../../redux/drug.slice';

function DrugCategoryAction() {
    const [imgUrl, setImgUrl] = useState();
    const [categoryInfo, setCategoryInfo] = useState({
        title: "",
        img: null
    });
    const [form] = Form.useForm();
    let { id } = useParams();
    const { isCreating, isUpdating, drugCategory } = useSelector(state => state.drug);
    const dispatch = useDispatch();

    useEffect(function () {
        if (id) dispatch(getDrugCategoryAction(id));
        else {
            form.setFieldsValue({ title: "" });
            setCategoryInfo({
                title: "",
                img: null
            });
            setImgUrl(null);
        }
    }, [dispatch, id])
    useEffect(function () {
        if (drugCategory && id) {
            form.setFieldsValue({ title: drugCategory.title });
            setImgUrl(drugCategory.img);
        }
    }, [drugCategory, id])

    const getBase64 = useCallback((img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }, []);

    function handleUploadLogo(info) {
        getBase64(info.file, (url) => {
            setImgUrl(url);
            setCategoryInfo({ ...categoryInfo, img: info.file });
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fieldErrors = form.getFieldsError();
        const fieldValues = form.getFieldsValue();
        if (!id && fieldErrors.every(fieldError => fieldError.errors.length === 0) && Object.keys(fieldValues).every(key => !!fieldValues[key])) {
            dispatch(createDrugCategoryAction({
                body: { title: fieldValues.title },
                img: categoryInfo.img
            }));
            form.setFieldsValue({
                title: "",
                img: null
            });
            setCategoryInfo({ title: "", img: null });
            setImgUrl(null);
        } else if (id && fieldErrors.every(fieldError => fieldError.errors.length === 0)) {
            dispatch(updateDrugCategoryAction({
                id,
                body: { title: fieldValues.title },
                img: categoryInfo.img
            }));
            form.setFieldsValue({
                title: "",
                img: null
            });
            setCategoryInfo({ title: "", img: null });
            setImgUrl(null);
        }
    }

    return (
        <div>
            <Heading title={id ? `DRUG CATEGORY #${id}` : "CREATE DRUG CATEGORY"} textAlign='left' size='small' />
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
                initialValues={categoryInfo}
                onSubmitCapture={handleSubmit}
            >
                <Form.Item
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Title required"
                        }
                    ]}
                    label="Title"
                    wrapperCol={{ span: 24 }}
                >
                    <Input />
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
                    {imgUrl && <img src={imgUrl} alt='img' />
                    }
                </Form.Item>
                <Form.Item className='text-center'>
                    <MyButton text={id ? "Update" : "Create"} btnType='submit' disabled={isCreating || isUpdating} />
                </Form.Item>
            </Form>
        </div>
    )
}

export default DrugCategoryAction