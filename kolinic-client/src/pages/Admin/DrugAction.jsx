import React, { useCallback, useEffect, useState } from 'react'
import Heading from '../../ui/Heading/Heading'
import { Form, Input, Select, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import MyButton from '../../ui/Button/Button';
import { PlusOutlined } from '@ant-design/icons'
import { createDrugAction, getDrugAction, getDrugCategoriesAction, updateDrugAction } from '../../redux/drug.slice';

function DrugAction() {
    const [imgUrl, setImgUrl] = useState();
    const [drugInfo, setDrugInfo] = useState({
        name: "",
        description: "",
        price: 0,
        packSize: 1,
        remaining: 0,
        categoryId: null,
        img: null
    });
    const [form] = Form.useForm();
    let { id } = useParams();
    const { isCreating, isUpdating, drug, drugCategories } = useSelector(state => state.drug);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDrugCategoriesAction({}));
    }, [dispatch])
    useEffect(function () {
        if (drugCategories && drugCategories.length > 0) setDrugInfo(drugInfo => ({ ...drugInfo, categoryId: drugCategories[0].id }))
    }, [drugCategories])

    useEffect(function () {
        if (id) dispatch(getDrugAction(id));
        else {
            form.setFieldsValue({
                name: "",
                description: "",
                price: 0,
                packSize: 1,
                remaining: 0,
                img: null
            });
            setDrugInfo({
                name: "",
                description: "",
                price: 0,
                packSize: 1,
                remaining: 0,
                categoryId: null,
                img: null
            });
            setImgUrl(null);
        }
    }, [dispatch, id])
    useEffect(function () {
        if (drug && id) {
            form.setFieldsValue({
                name: drug.name,
                description: drug.description,
                price: drug.price,
                packSize: drug.packSize,
                remaining: drug.remaining,
            });
            setDrugInfo(drugInfo => ({
                ...drugInfo,
                categoryId: drug.category.id
            }));
            setImgUrl(drug.img);
        }
    }, [drug, id])

    const getBase64 = useCallback((img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }, []);

    function handleUploadLogo(info) {
        getBase64(info.file, (url) => {
            setImgUrl(url);
            setDrugInfo({ ...drugInfo, img: info.file });
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fieldErrors = form.getFieldsError();
        const fieldValues = form.getFieldsValue();
        if (!id && fieldErrors.every(fieldError => fieldError.errors.length === 0) && Object.keys(fieldValues).every(key => !!fieldValues[key])) {
            dispatch(createDrugAction({
                body: {
                    name: fieldValues.name,
                    description: fieldValues.description,
                    price: fieldValues.price,
                    packSize: fieldValues.packSize,
                    remaining: fieldValues.remaining,
                    categoryId: drugInfo.categoryId,
                },
                img: drugInfo.img
            }));
            form.setFieldsValue({
                name: "",
                description: "",
                price: 0,
                packSize: 1,
                remaining: 0,
                img: null
            });
            setDrugInfo({ ...drugInfo, categoryId: drugCategories[0].id, img: null });
            setImgUrl(null);
        } else if (id && fieldErrors.every(fieldError => fieldError.errors.length === 0)) {
            dispatch(updateDrugAction({
                id,
                body: {
                    name: fieldValues.name,
                    description: fieldValues.description,
                    price: fieldValues.price,
                    packSize: fieldValues.packSize,
                    remaining: fieldValues.remaining,
                    categoryId: drugInfo.categoryId,
                },
                img: drugInfo.img
            }));
            form.setFieldsValue({
                name: "",
                description: "",
                price: 0,
                packSize: 1,
                remaining: 0,
                img: null
            });
            setDrugInfo({ ...drugInfo, categoryId: drugCategories[0].id, img: null });
            setImgUrl(null);
        }
    }

    return (
        <div>
            <Heading title={id ? `DRUG #${id}` : "CREATE DRUG"} textAlign='left' size='small' />
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
                initialValues={drugInfo}
                onSubmitCapture={handleSubmit}
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Drug's name required"
                        }
                    ]}
                    label="Drug's name"
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
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Price required"
                        }
                    ]}
                    label="Price"
                    wrapperCol={{ span: 24 }}
                >
                    <Input type='number' step={0.01} min={0} />
                </Form.Item>
                <Form.Item
                    name="packSize"
                    rules={[
                        {
                            required: true,
                            message: "Pack size required"
                        }
                    ]}
                    label="Pack size"
                    wrapperCol={{ span: 24 }}
                >
                    <Input type='number' min={1} />
                </Form.Item>
                <Form.Item
                    name="remaining"
                    rules={[
                        {
                            required: true,
                            message: "Remaining required"
                        }
                    ]}
                    label="Remaining"
                    wrapperCol={{ span: 24 }}
                >
                    <Input type='number' min={0} />
                </Form.Item>
                <Form.Item label="Category">
                    <Select
                        size='large'
                        allowClear={false}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        labelInValue
                        value={drugInfo.categoryId}
                        onChange={(e) => setDrugInfo({ ...drugInfo, categoryId: e.value })}
                    >
                        {
                            drugCategories?.map(category => <Select.Option value={category.id} key={category.id}>
                                {category.title}
                            </Select.Option>)
                        }
                    </Select>
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

export default DrugAction